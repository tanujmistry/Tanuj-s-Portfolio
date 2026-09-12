import React, { useEffect, useRef } from 'react';

interface GridScanCanvasProps {
  className?: string;
  scanColor?: string;
  gridColor?: string;
}

interface DetectedPoint {
  x: number;
  y: number;
  label: string;
  intensity: number;
  color: string;
}

export const GridScanCanvas: React.FC<GridScanCanvasProps> = ({
  className = '',
  scanColor = '#050505',
  gridColor = 'rgba(0, 0, 0, 0.08)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let scanY = 0;
    let scanDirection = 1;
    let mouseX = -1;
    let mouseY = -1;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse for interactive radar ping
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Virtual telemetry target nodes to scan and illuminate in monochrome
    const targetNodes: DetectedPoint[] = [
      { x: 0.18, y: 0.32, label: 'FPGA_VIVADO', intensity: 0, color: scanColor },
      { x: 0.82, y: 0.28, label: 'ECG_AFE_CH1', intensity: 0, color: scanColor },
      { x: 0.25, y: 0.74, label: 'CAN_BUS_12S', intensity: 0, color: scanColor },
      { x: 0.75, y: 0.68, label: 'CNN_QUANT_8B', intensity: 0, color: scanColor },
      { x: 0.5, y: 0.5, label: 'MAIN_CORE_DSP', intensity: 0, color: scanColor },
    ];

    const cellSize = 36;

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background Grid Lines
      ctx.save();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Scanline Position Calculation
      const scanSpeed = 1.4;
      scanY += scanSpeed * scanDirection;
      if (scanY > height) {
        scanY = height;
        scanDirection = -1;
      } else if (scanY < 0) {
        scanY = 0;
        scanDirection = 1;
      }

      // 3. Draw Laser Scanline Beam and Phosphor Trail
      ctx.save();
      const trailHeight = 80;
      const gradient = ctx.createLinearGradient(
        0,
        scanDirection === 1 ? scanY - trailHeight : scanY + trailHeight,
        0,
        scanY
      );

      const isWhiteScan = scanColor === '#FFFFFF' || scanColor === '#fff';

      if (isWhiteScan) {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.25)');
      } else {
        gradient.addColorStop(0, 'rgba(5, 5, 5, 0)');
        gradient.addColorStop(0.7, 'rgba(5, 5, 5, 0.06)');
        gradient.addColorStop(1, 'rgba(5, 5, 5, 0.18)');
      }

      ctx.fillStyle = gradient;
      if (scanDirection === 1) {
        ctx.fillRect(0, scanY - trailHeight, width, trailHeight);
      } else {
        ctx.fillRect(0, scanY, width, trailHeight);
      }

      // Sharp scanline edge
      ctx.strokeStyle = scanColor;
      ctx.shadowColor = scanColor;
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();
      ctx.restore();

      // 4. Draw Illuminated Grid Crossings Near Scanline
      ctx.save();
      for (let x = 0; x <= width; x += cellSize) {
        for (let y = 0; y <= height; y += cellSize) {
          const distToScan = Math.abs(y - scanY);
          if (distToScan < 45) {
            const opacity = (1 - distToScan / 45) * 0.7;
            ctx.fillStyle = isWhiteScan ? `rgba(255, 255, 255, ${opacity})` : `rgba(5, 5, 5, ${opacity})`;
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
          }
        }
      }
      ctx.restore();

      // 5. Draw Target Telemetry Points that Ping when Scanned
      targetNodes.forEach((node) => {
        const px = node.x * width;
        const py = node.y * height;
        const dist = Math.abs(py - scanY);

        if (dist < 30) {
          node.intensity = 1.0;
        } else {
          node.intensity = Math.max(0.2, node.intensity - 0.015);
        }

        ctx.save();
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = node.intensity;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.intensity * 8;

        ctx.beginPath();
        ctx.arc(px, py, 10 + (1 - node.intensity) * 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();

        if (node.intensity > 0.4) {
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = isWhiteScan ? '#FFFFFF' : '#111827';
          ctx.fillText(`// ${node.label}`, px + 14, py + 3);
        }
        ctx.restore();
      });

      // 6. Interactive Mouse Cursor Pulse
      if (mouseX >= 0 && mouseY >= 0) {
        ctx.save();
        ctx.strokeStyle = isWhiteScan ? '#D4D4D4' : '#6B7280';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 28, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = scanColor;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scanColor, gridColor]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
