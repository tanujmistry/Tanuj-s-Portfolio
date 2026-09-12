import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface AeroNode {
  id: string;
  name: string;
  type: 'uav' | 'gateway' | 'satellite' | 'vehicle';
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  altitude?: string;
  velocity?: string;
  rssi: string;
  status: 'active' | 'syncing' | 'routing';
  color: string;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
  size: number;
}

interface AeroNetCanvasProps {
  className?: string;
  selectedNodeId?: string;
  onSelectNode?: (node: AeroNode) => void;
  frequencyBand?: string;
}

export const AeroNetCanvas: React.FC<AeroNetCanvasProps> = ({
  className = '',
  selectedNodeId,
  onSelectNode,
  frequencyBand = '2.4 GHz FHSS',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalSelectedId, setInternalSelectedId] = useState<string>(selectedNodeId || 'uav_01');

  // Node telemetry topology
  const nodes: AeroNode[] = [
    {
      id: 'sat_07',
      name: 'LEO_SAT_07',
      type: 'satellite',
      x: 0.5,
      y: 0.18,
      altitude: '540 km',
      velocity: '7.6 km/s',
      rssi: '-78 dBm',
      status: 'active',
      color: '#4ADEDE', // Primary cyber cyan
    },
    {
      id: 'uav_01',
      name: 'UAV_SWARM_ALPHA',
      type: 'uav',
      x: 0.32,
      y: 0.44,
      altitude: '1,240 m',
      velocity: '84 km/h',
      rssi: '-58 dBm',
      status: 'active',
      color: '#FFFFFF', // Neutral foundation
    },
    {
      id: 'uav_02',
      name: 'UAV_SWARM_BETA',
      type: 'uav',
      x: 0.68,
      y: 0.48,
      altitude: '1,190 m',
      velocity: '82 km/h',
      rssi: '-64 dBm',
      status: 'routing',
      color: '#60F1AD', // Secondary electric mint
    },
    {
      id: 'ground_hq',
      name: 'GROUND_GATEWAY_01',
      type: 'gateway',
      x: 0.28,
      y: 0.82,
      altitude: '48 m MSL',
      velocity: '0 km/h',
      rssi: '-42 dBm',
      status: 'active',
      color: '#4ADEDE',
    },
    {
      id: 'racecar_daq',
      name: 'FORMULA_TELEMETRY',
      type: 'vehicle',
      x: 0.76,
      y: 0.78,
      altitude: '52 m MSL',
      velocity: '118 km/h',
      rssi: '-52 dBm',
      status: 'syncing',
      color: '#60F1AD',
    },
  ];

  const handleNodeClick = useCallback(
    (node: AeroNode) => {
      setInternalSelectedId(node.id);
      if (onSelectNode) {
        onSelectNode(node);
      }
    },
    [onSelectNode]
  );

  useEffect(() => {
    if (selectedNodeId) {
      setInternalSelectedId(selectedNodeId);
    }
  }, [selectedNodeId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = -100;
    let mouseY = -100;
    let hoveredNodeId: string | null = null;

    // Packet links defined by indices in nodes array
    const links = [
      { from: 0, to: 1, color: '#4ADEDE', dash: [4, 4] }, // Sat -> UAV Alpha
      { from: 0, to: 2, color: '#60F1AD', dash: [2, 4] }, // Sat -> UAV Beta
      { from: 1, to: 2, color: '#4ADEDE', dash: [] },     // UAV Alpha <-> Beta mesh
      { from: 1, to: 3, color: '#FFFFFF', dash: [] },     // UAV Alpha -> Ground HQ
      { from: 2, to: 4, color: '#60F1AD', dash: [3, 3] }, // UAV Beta -> Racecar DAQ
      { from: 3, to: 4, color: '#4ADEDE', dash: [6, 4] }, // Ground HQ -> Racecar DAQ
    ];

    // Initialize flowing packets along links
    const packets: Packet[] = links.map((link, idx) => ({
      fromIndex: link.from,
      toIndex: link.to,
      progress: (idx * 0.22) % 1,
      speed: 0.006 + (idx % 3) * 0.002, // 2000ms cadence
      color: link.color,
      size: idx % 2 === 0 ? 3 : 2.5,
    }));

    let radarAngle = 0;
    let waveRadius = 0;
    let animTime = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let found: string | null = null;
      for (const node of nodes) {
        const nx = node.x * width;
        const ny = node.y * height;
        const dist = Math.hypot(mouseX - nx, mouseY - ny);
        if (dist < 28) {
          found = node.id;
          break;
        }
      }
      hoveredNodeId = found;
      container.style.cursor = found ? 'pointer' : 'default';
    };

    const handleMouseLeave = () => {
      mouseX = -100;
      mouseY = -100;
      hoveredNodeId = null;
      container.style.cursor = 'default';
    };

    const handleClick = () => {
      if (hoveredNodeId) {
        const target = nodes.find((n) => n.id === hoveredNodeId);
        if (target) {
          handleNodeClick(target);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Dark Void Canvas Base (#030712 with subtle depth radial)
      const bgGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        20,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.7
      );
      bgGradient.addColorStop(0, '#071322');
      bgGradient.addColorStop(1, '#030712');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Tactical Aeronautical Range Rings (concentric circles)
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const baseRadius = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.strokeStyle = 'rgba(74, 222, 222, 0.08)';
      ctx.lineWidth = 1;

      // Range concentric circles
      [0.25, 0.5, 0.75, 1.0].forEach((fraction) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * fraction, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Axis crosshairs
      ctx.strokeStyle = 'rgba(74, 222, 222, 0.06)';
      ctx.beginPath();
      ctx.moveTo(centerX, 16);
      ctx.lineTo(centerX, height - 16);
      ctx.moveTo(16, centerY);
      ctx.lineTo(width - 16, centerY);
      ctx.stroke();

      // Heading labels in Inter
      ctx.font = '9px "Inter", sans-serif';
      ctx.fillStyle = '#A1A1AA';
      ctx.textAlign = 'center';
      ctx.fillText('000° N', centerX, centerY - baseRadius - 8);
      ctx.fillText('180° S', centerX, centerY + baseRadius + 16);
      ctx.fillText('090° E', centerX + baseRadius + 22, centerY + 3);
      ctx.fillText('270° W', centerX - baseRadius - 22, centerY + 3);
      ctx.restore();

      // 3. 2000ms Sweeping Radar Beam
      radarAngle += 0.018; // ~2000ms rotation cycle
      ctx.save();
      const sweepGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        baseRadius * 1.05
      );
      sweepGradient.addColorStop(0, 'rgba(74, 222, 222, 0.18)'); // Primary #4ADEDE
      sweepGradient.addColorStop(0.7, 'rgba(96, 241, 173, 0.05)'); // Secondary #60F1AD
      sweepGradient.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, baseRadius * 1.05, radarAngle - 0.35, radarAngle);
      ctx.closePath();
      ctx.fill();

      // Leading beam ray
      ctx.strokeStyle = 'rgba(74, 222, 222, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(radarAngle) * baseRadius * 1.05,
        centerY + Math.sin(radarAngle) * baseRadius * 1.05
      );
      ctx.stroke();
      ctx.restore();

      // Dynamic waypoint kinematics simulation
      animTime += 0.015;
      const dynamicNodes = nodes.map((node, i) => {
        let dx = 0;
        let dy = 0;
        if (node.type === 'uav') {
          dx = Math.sin(animTime * 0.7 + i * 2) * 0.022;
          dy = Math.cos(animTime * 0.5 + i * 2) * 0.014;
        } else if (node.type === 'vehicle') {
          dx = Math.sin(animTime * 1.2) * 0.032;
          dy = Math.cos(animTime * 1.2) * 0.008;
        } else if (node.type === 'satellite') {
          dx = Math.sin(animTime * 0.25) * 0.035;
        }
        return { ...node, cx: (node.x + dx) * width, cy: (node.y + dy) * height };
      });

      // 4. Expanding RF Wavefront pulses from ground HQ and Satellite
      waveRadius = (waveRadius + 0.6) % (baseRadius * 0.7);
      const waveAlpha = Math.max(0, 1 - waveRadius / (baseRadius * 0.7));
      const hqNode = dynamicNodes[3];
      const satNode = dynamicNodes[0];

      ctx.save();
      // Ground HQ pulse
      ctx.strokeStyle = `rgba(96, 241, 173, ${waveAlpha * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(hqNode.cx, hqNode.cy, waveRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Satellite downlink pulse
      ctx.strokeStyle = `rgba(74, 222, 222, ${waveAlpha * 0.35})`;
      ctx.beginPath();
      ctx.arc(satNode.cx, satNode.cy, waveRadius * 0.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. Mesh Routing Links (Topological vector lines connecting dynamic nodes)
      links.forEach((link) => {
        const n1 = dynamicNodes[link.from];
        const n2 = dynamicNodes[link.to];

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        if (link.dash.length > 0) {
          ctx.setLineDash(link.dash);
        }
        ctx.beginPath();
        ctx.moveTo(n1.cx, n1.cy);
        ctx.lineTo(n2.cx, n2.cy);
        ctx.stroke();
        ctx.restore();
      });

      // 6. Real-time Animated Data Packets with Photon Trails
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
        }

        const n1 = dynamicNodes[pkt.fromIndex];
        const n2 = dynamicNodes[pkt.toIndex];
        const px = n1.cx + (n2.cx - n1.cx) * pkt.progress;
        const py = n1.cy + (n2.cy - n1.cy) * pkt.progress;

        // Fading comet trail behind packet
        ctx.save();
        for (let t = 1; t <= 4; t++) {
          const trailProgress = Math.max(0, pkt.progress - t * 0.015);
          const tx = n1.cx + (n2.cx - n1.cx) * trailProgress;
          const ty = n1.cy + (n2.cy - n1.cy) * trailProgress;
          ctx.fillStyle = pkt.color;
          ctx.globalAlpha = (0.5 / t);
          ctx.beginPath();
          ctx.arc(tx, ty, pkt.size * (1 - t * 0.18), 0, Math.PI * 2);
          ctx.fill();
        }

        // Main photon head
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 7. Node Markers & Flight Telemetry Labels
      dynamicNodes.forEach((node) => {
        const nx = node.cx;
        const ny = node.cy;
        const isSelected = node.id === internalSelectedId;
        const isHovered = node.id === hoveredNodeId;

        ctx.save();

        // Outer glow on hover or active selection
        if (isSelected || isHovered) {
          ctx.strokeStyle = isSelected ? '#4ADEDE' : '#60F1AD';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(nx, ny, 16, 0, Math.PI * 2);
          ctx.stroke();

          // Reticle corner brackets
          const bSize = 6;
          ctx.setLineDash([]);
          ctx.strokeStyle = isSelected ? '#4ADEDE' : '#60F1AD';
          ctx.lineWidth = 1.5;

          // Top-left bracket
          ctx.beginPath();
          ctx.moveTo(nx - 20, ny - 20 + bSize);
          ctx.lineTo(nx - 20, ny - 20);
          ctx.lineTo(nx - 20 + bSize, ny - 20);
          ctx.stroke();

          // Bottom-right bracket
          ctx.beginPath();
          ctx.moveTo(nx + 20, ny + 20 - bSize);
          ctx.lineTo(nx + 20, ny + 20);
          ctx.lineTo(nx + 20 - bSize, ny + 20);
          ctx.stroke();
        }

        // Inner solid core
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 12 : 5;
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Node ID & metrics badge
        ctx.font = '10px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#E5E7EB';
        ctx.fillText(node.name, nx + 14, ny - 2);

        ctx.font = '9px "Inter", sans-serif';
        ctx.fillStyle = '#9CA3AF';
        ctx.fillText(`${node.altitude || ''} • ${node.rssi}`, nx + 14, ny + 11);

        ctx.restore();
      });

      // 8. Bottom Tactical Telemetry Overlay
      ctx.save();
      ctx.font = '10px "Inter", sans-serif';
      ctx.fillStyle = '#9CA3AF';
      ctx.textAlign = 'left';
      ctx.fillText(`BAND: ${frequencyBand} // SWARM_TOPOLOGY_V2`, 16, height - 16);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#A69DB9';
      ctx.fillText(`LATENCY: < 1.8ms • PACKET_LOSS: 0.02%`, width - 16, height - 16);
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, [handleNodeClick, internalSelectedId, frequencyBand]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
