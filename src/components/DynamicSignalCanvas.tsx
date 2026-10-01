import React, { useEffect, useRef } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { useIsMobile } from '../hooks/useIsMobile';

interface DynamicSignalCanvasProps {
  className?: string;
  harmonicMode?: 'fundamental' | 'harmonic' | 'chirp';
  activeSpeed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseY: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

export const DynamicSignalCanvas: React.FC<DynamicSignalCanvasProps> = ({
  className = '',
  harmonicMode = 'fundamental',
  activeSpeed = 1,
}) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [containerRef, isInView] = useInViewAnimation<HTMLDivElement>({ rootMargin: '250px 0px' });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles: 28 on mobile for silky 60fps performance, 75 on desktop
    const particleCount = isMobile ? 28 : 75;
    const particles: Particle[] = [];
    const colors = ['#4ADEDE', '#60F1AD', '#4ADEDE', '#60F1AD', '#FFFFFF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 400),
        vx: 0.8 + Math.random() * 1.4,
        vy: 0,
        baseY: 0.2 * (height || 400) + Math.random() * 0.6 * (height || 400),
        size: 1.5 + Math.random() * 2,
        color: colors[i % colors.length],
        alpha: 0.35 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      if (!isInView) {
        return;
      }

      const isLight = document.documentElement.classList.contains('light');
      const primaryCol = isLight ? '#EA580C' : '#4ADEDE';
      const accentCol = isLight ? '#FDBA74' : '#60F1AD';

      // 1. Dark Void Base (#030712 in dark, #0E1013 in light)
      ctx.fillStyle = isLight ? '#0E1013' : '#030712';
      ctx.fillRect(0, 0, width, height);

      time += 0.024 * activeSpeed;

      // 2. Subtle Coordinate Grid Lines
      ctx.save();
      ctx.strokeStyle = isLight ? 'rgba(234, 88, 12, 0.06)' : 'rgba(74, 222, 222, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Dynamic wave parameters based on harmonic mode
      let freqMultiplier = 1;
      let waveCount = 3;
      if (harmonicMode === 'harmonic') {
        freqMultiplier = 2.4;
        waveCount = 4;
      } else if (harmonicMode === 'chirp') {
        freqMultiplier = 1.8;
        waveCount = 5;
      }

      // 3. Multi-Harmonic Atmospheric Continuous Sine Wave Ribbons
      const centerY = height * 0.5;

      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        const isPrimary = w % 2 === 0;
        const waveColor = isPrimary ? primaryCol : accentCol;
        const waveAlpha = 0.25 - w * 0.04;

        ctx.strokeStyle = waveColor;
        ctx.shadowColor = waveColor;
        ctx.shadowBlur = isPrimary ? 12 : 6;
        ctx.lineWidth = isPrimary ? 2 : 1.2;
        ctx.globalAlpha = Math.max(0.08, waveAlpha);

        ctx.beginPath();
        const step = 6;
        const offset = w * 0.45;

        for (let x = 0; x <= width; x += step) {
          const normX = x / width;

          // Harmonic calculation
          const wave1 = Math.sin(normX * Math.PI * 4 * freqMultiplier + time + offset) * 38;
          const wave2 = Math.cos(normX * Math.PI * 7 * freqMultiplier - time * 0.8) * 18;
          const wave3 = Math.sin(normX * Math.PI * 12 + time * 1.5) * 8;

          // Mouse deflection ripple
          const dx = x - mouseX;
          const dy = centerY - mouseY;
          const dist = Math.hypot(dx, dy);
          let deflection = 0;
          if (dist < 140) {
            deflection = Math.sin((1 - dist / 140) * Math.PI) * 28;
          }

          const y = centerY + wave1 + wave2 + wave3 + deflection;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }

      // 4. Particle Vector Flow Field
      particles.forEach((p) => {
        p.x += p.vx * activeSpeed;
        if (p.x > width + 20) {
          p.x = -10;
          p.baseY = 0.2 * height + Math.random() * 0.6 * height;
        }

        // Particle responds to the wave oscillation
        const normX = p.x / width;
        const waveY =
          Math.sin(normX * Math.PI * 4 * freqMultiplier + time + p.phase) * 30 +
          Math.cos(normX * Math.PI * 7 - time * 0.8) * 12;

        let targetY = p.baseY + waveY;

        // Repel from mouse cursor
        const dx = p.x - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          const force = (1 - dist / 90) * 35;
          targetY += (dy / (dist || 1)) * force;
        }

        p.y += (targetY - p.y) * 0.12;

        ctx.save();
        const pCol = isLight
          ? p.color === '#4ADEDE' ? '#EA580C' : p.color === '#60F1AD' ? '#FDBA74' : '#FFFFFF'
          : p.color;
        ctx.fillStyle = pCol;
        ctx.shadowColor = pCol;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. Mini Lissajous / Phase Scope Vector in Top Right Corner
      const scopeX = width - 55;
      const scopeY = 55;
      const scopeR = 24;

      ctx.save();
      // Scope background circle
      ctx.strokeStyle = isLight ? 'rgba(234, 88, 12, 0.25)' : 'rgba(74, 222, 222, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(scopeX, scopeY, scopeR, 0, Math.PI * 2);
      ctx.stroke();

      // Lissajous curve
      ctx.strokeStyle = accentCol;
      ctx.shadowColor = accentCol;
      ctx.shadowBlur = 5;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const lissaSteps = 40;
      for (let i = 0; i <= lissaSteps; i++) {
        const t = (i / lissaSteps) * Math.PI * 2;
        const lx = scopeX + Math.sin(t * 2 + time * 1.8) * (scopeR * 0.7);
        const ly = scopeY + Math.cos(t * 3 + time * 1.2) * (scopeR * 0.7);
        if (i === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = primaryCol;
      ctx.textAlign = 'center';
      ctx.fillText('PHASE_XY', scopeX, scopeY + scopeR + 12);
      ctx.restore();

      // 6. Tactical Telemetry Legend in Bottom Left
      ctx.save();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#A1A1AA';
      ctx.textAlign = 'left';
      ctx.fillText(`HARMONIC: ${harmonicMode.toUpperCase()} // SYS.50MHZ_STREAM`, 16, height - 16);

      ctx.textAlign = 'right';
      ctx.fillStyle = accentCol;
      ctx.fillText('JITTER: 0.04ps // ORCHESTRATION LOCKED', width - 16, height - 16);
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    if (isInView) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [harmonicMode, activeSpeed, isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
