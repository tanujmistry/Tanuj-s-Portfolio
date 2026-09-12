import React, { useEffect, useRef } from 'react';

interface DitherCanvasProps {
  className?: string;
}

export const DitherCanvas: React.FC<DitherCanvasProps> = ({ className = '' }) => {
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
    let time = 0;
    let mouseX = -1;
    let mouseY = -1;

    // 4x4 Bayer Matrix for ordered dithering simulation
    const bayer4x4 = [
      [ 0,  8,  2, 10],
      [12,  4, 14,  6],
      [ 3, 11,  1,  9],
      [15,  7, 13,  5],
    ];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

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

    const step = 6; // Grid pixel step size for crisp retro-dither aesthetic

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = '#0a0e17';
      ctx.fillRect(0, 0, width, height);

      time += 0.025;

      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * step;
          const y = r * step;

          // Compute continuous wave value from analog signal simulation
          const distToCenter = Math.sqrt(Math.pow((x - width / 2) / width, 2) + Math.pow((y - height / 2) / height, 2));
          
          let wave = Math.sin(distToCenter * 14 - time * 2) * 0.5 + 0.5;
          wave += Math.sin(x * 0.02 + time) * 0.2;

          // Mouse interaction wave ripple
          if (mouseX >= 0 && mouseY >= 0) {
            const distToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
            if (distToMouse < 180) {
              const mouseEffect = (1 - distToMouse / 180) * 0.6;
              wave += Math.sin(distToMouse * 0.06 - time * 4) * mouseEffect;
            }
          }

          // Normalize to [0, 1]
          const intensity = Math.max(0, Math.min(1, wave));

          // Bayer threshold comparison (normalized from 0 to 1)
          const bayerValue = bayer4x4[r % 4][c % 4] / 16;

          if (intensity > bayerValue) {
            // Dither pixel active
            const alpha = 0.25 + (intensity - bayerValue) * 0.75;
            // Interpolate between cyan/teal and light purple
            if (intensity > 0.7) {
              ctx.fillStyle = `rgba(0, 229, 199, ${alpha * 0.9})`;
            } else if (intensity > 0.4) {
              ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.6})`;
            } else {
              ctx.fillStyle = `rgba(223, 184, 242, ${alpha * 0.4})`;
            }

            ctx.fillRect(x, y, step - 1.5, step - 1.5);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
