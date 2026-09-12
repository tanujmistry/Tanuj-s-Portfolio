import React, { useEffect, useRef } from 'react';

interface NeuralPathwayCanvasProps {
  className?: string;
}

interface NeuronNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  energy: number;
  connections: number[];
}

interface ActionPotential {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export const NeuralPathwayCanvas: React.FC<NeuralPathwayCanvasProps> = ({ className = '' }) => {
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
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

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

    // Generate Neurons Network
    const nodeCount = 38;
    const nodes: NeuronNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 2 + Math.random() * 2,
        baseRadius: 2 + Math.random() * 2,
        energy: Math.random() * 0.5,
        connections: [],
      });
    }

    // Connect nodes by proximity
    const maxConnectionDist = 130;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxConnectionDist) {
          nodes[i].connections.push(j);
        }
      }
    }

    // Action potential sparks traveling along axons
    const actionPotentials: ActionPotential[] = [];
    const maxSparks = 24;

    const spawnSpark = () => {
      if (actionPotentials.length >= maxSparks) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const fromNode = nodes[fromIdx];
      if (fromNode.connections.length > 0) {
        const toIdx = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
        actionPotentials.push({
          from: fromIdx,
          to: toIdx,
          progress: 0,
          speed: 0.015 + Math.random() * 0.025,
        });
      }
    };

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Periodically spawn action potentials
      if (Math.random() < 0.35) {
        spawnSpark();
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce from boundaries
        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;

        // Mouse proximity excitation
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 120) {
          const force = (1 - distToMouse / 120) * 0.8;
          node.energy = Math.min(1, node.energy + force * 0.1);
        } else {
          node.energy = Math.max(0.1, node.energy - 0.01);
        }
      });

      const isLight = document.documentElement.classList.contains('light');
      const primaryCol = isLight ? '#EA580C' : '#4ADEDE';
      const accentCol = isLight ? '#FDBA74' : '#60F1AD';

      // 1. Draw Synaptic Axon Connections
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (const j of n1.connections) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            const alpha = (1 - dist / maxConnectionDist) * 0.25;
            const avgEnergy = (n1.energy + n2.energy) / 2;

            if (avgEnergy > 0.4) {
              ctx.strokeStyle = isLight
                ? `rgba(234, 88, 12, ${alpha + avgEnergy * 0.45})`
                : `rgba(74, 222, 222, ${alpha + avgEnergy * 0.35})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = isLight
                ? `rgba(253, 186, 116, ${alpha * 0.65})`
                : `rgba(96, 241, 173, ${alpha * 0.6})`;
              ctx.lineWidth = 0.8;
            }

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 2. Draw Action Potential Pulses Traveling Across Axons
      for (let i = actionPotentials.length - 1; i >= 0; i--) {
        const ap = actionPotentials[i];
        ap.progress += ap.speed;

        const fromNode = nodes[ap.from];
        const toNode = nodes[ap.to];

        if (!fromNode || !toNode || ap.progress >= 1) {
          actionPotentials.splice(i, 1);
          continue;
        }

        const currentX = fromNode.x + (toNode.x - fromNode.x) * ap.progress;
        const currentY = fromNode.y + (toNode.y - fromNode.y) * ap.progress;

        ctx.save();
        ctx.fillStyle = accentCol;
        ctx.shadowColor = accentCol;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw Neuron Soma (Nodes)
      nodes.forEach((node) => {
        ctx.save();
        const currentRadius = node.baseRadius + node.energy * 2.5;

        if (node.energy > 0.3) {
          ctx.fillStyle = primaryCol;
          ctx.shadowColor = primaryCol;
          ctx.shadowBlur = node.energy * 12;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle outer excitation ring
        if (node.energy > 0.4) {
          ctx.strokeStyle = isLight
            ? `rgba(234, 88, 12, ${node.energy * 0.6})`
            : `rgba(74, 222, 222, ${node.energy * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });

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
