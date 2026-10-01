import React, { useEffect, useRef } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { useIsMobile } from '../hooks/useIsMobile';

interface DitherCanvasProps {
  className?: string;
  theme?: 'emerald' | 'monochrome';
  inverse?: boolean;
}

export const DitherCanvas: React.FC<DitherCanvasProps> = ({
  className = '',
  theme = 'emerald',
  inverse = false,
}) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [containerRef, isInView] = useInViewAnimation<HTMLDivElement>({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
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
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1;
      mouseY = -1;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Step size: 10px on mobile for silky 60fps performance, 6px on desktop
    const step = isMobile ? 10 : 6;

    const render = () => {
      if (!isInView) {
        return; // Suspend render loop when offscreen
      }

      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Background canvas fill (#030712 in dark mode)
      if (inverse) {
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = '#030712';
      }
      ctx.fillRect(0, 0, width, height);

      time += 0.022;

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
            const alpha = 0.35 + (intensity - bayerValue) * 0.65;

            if (theme === 'emerald') {
              if (intensity > 0.65) {
                // Primary #4ADEDE (Cyber Cyan)
                ctx.fillStyle = `rgba(74, 222, 222, ${alpha * 0.95})`;
              } else if (intensity > 0.38) {
                // Secondary #60F1AD (Electric Mint)
                ctx.fillStyle = `rgba(96, 241, 173, ${alpha * 0.85})`;
              } else {
                ctx.fillStyle = `rgba(161, 161, 170, ${alpha * 0.5})`;
              }
            } else {
              if (inverse) {
                ctx.fillStyle = `rgba(5, 5, 5, ${alpha})`;
              } else {
                ctx.fillStyle = `rgba(74, 222, 222, ${alpha})`;
              }
            }

            ctx.fillRect(x, y, step - 1, step - 1);
          }
        }
      }

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
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [theme, inverse, isInView]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
