import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { useIsMobile } from '../hooks/useIsMobile';

export interface GlobeNode {
  id: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lon: number;
  status: 'active' | 'syncing' | 'standby';
  latency: string;
  load: string;
  throughput: string;
  peers: number;
}

interface EarthGlobeCanvasProps {
  className?: string;
  selectedNodeId?: string;
  onSelectNode?: (node: GlobeNode) => void;
  interactive?: boolean;
  size?: 'normal' | 'hero';
}

// Mesh Network Terrestrial Nodes (Static constant outside component)
const NODES: GlobeNode[] = [
  {
    id: 'node_in',
    name: 'AETHER_NODE_IN01',
    city: 'Aurangabad / Mumbai',
    region: 'IND-WEST',
    lat: 19.87,
    lon: 75.34,
    status: 'active',
    latency: '2.4ms',
    load: '42%',
    throughput: '8.4 Gbps',
    peers: 14,
  },
  {
    id: 'node_tokyo',
    name: 'AETHER_NODE_AP01',
    city: 'Tokyo',
    region: 'ASIA-PACIFIC',
    lat: 35.68,
    lon: 139.69,
    status: 'active',
    latency: '14.2ms',
    load: '68%',
    throughput: '12.8 Gbps',
    peers: 22,
  },
  {
    id: 'node_sg',
    name: 'AETHER_NODE_SEA01',
    city: 'Singapore',
    region: 'SE-ASIA',
    lat: 1.35,
    lon: 103.82,
    status: 'active',
    latency: '8.7ms',
    load: '54%',
    throughput: '10.2 Gbps',
    peers: 18,
  },
  {
    id: 'node_fra',
    name: 'AETHER_NODE_EU01',
    city: 'Frankfurt',
    region: 'EU-CENTRAL',
    lat: 50.11,
    lon: 8.68,
    status: 'active',
    latency: '22.1ms',
    load: '78%',
    throughput: '15.6 Gbps',
    peers: 28,
  },
  {
    id: 'node_lon',
    name: 'AETHER_NODE_EU02',
    city: 'London',
    region: 'EU-WEST',
    lat: 51.5,
    lon: -0.12,
    status: 'active',
    latency: '24.8ms',
    load: '61%',
    throughput: '11.4 Gbps',
    peers: 19,
  },
  {
    id: 'node_sf',
    name: 'AETHER_NODE_NA01',
    city: 'San Francisco',
    region: 'US-WEST',
    lat: 37.77,
    lon: -122.42,
    status: 'active',
    latency: '36.4ms',
    load: '84%',
    throughput: '18.2 Gbps',
    peers: 32,
  },
  {
    id: 'node_nyc',
    name: 'AETHER_NODE_NA02',
    city: 'New York',
    region: 'US-EAST',
    lat: 40.71,
    lon: -74.0,
    status: 'active',
    latency: '31.2ms',
    load: '72%',
    throughput: '14.0 Gbps',
    peers: 26,
  },
  {
    id: 'node_syd',
    name: 'AETHER_NODE_OC01',
    city: 'Sydney',
    region: 'OCEANIA',
    lat: -33.86,
    lon: 151.2,
    status: 'standby',
    latency: '48.9ms',
    load: '29%',
    throughput: '5.6 Gbps',
    peers: 9,
  },
  {
    id: 'node_sp',
    name: 'AETHER_NODE_SA01',
    city: 'São Paulo',
    region: 'LATAM',
    lat: -23.55,
    lon: -46.63,
    status: 'syncing',
    latency: '52.0ms',
    load: '38%',
    throughput: '6.8 Gbps',
    peers: 11,
  },
];

// Interconnecting mesh links (Static constant)
const LINKS: [string, string][] = [
  ['node_in', 'node_sg'],
  ['node_in', 'node_fra'],
  ['node_in', 'node_tokyo'],
  ['node_sg', 'node_tokyo'],
  ['node_sg', 'node_syd'],
  ['node_fra', 'node_lon'],
  ['node_fra', 'node_nyc'],
  ['node_lon', 'node_nyc'],
  ['node_nyc', 'node_sf'],
  ['node_sf', 'node_tokyo'],
  ['node_nyc', 'node_sp'],
];

export const EarthGlobeCanvas: React.FC<EarthGlobeCanvasProps> = ({
  className = '',
  selectedNodeId = 'node_in',
  onSelectNode,
  interactive = true,
  size = 'normal',
}) => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [containerRef, isInView] = useInViewAnimation<HTMLDivElement>({ rootMargin: '250px 0px' });
  const [internalSelectedId, setInternalSelectedId] = useState<string>(selectedNodeId);

  // Synchronize external prop
  useEffect(() => {
    if (selectedNodeId) {
      setInternalSelectedId(selectedNodeId);
    }
  }, [selectedNodeId]);

  const nodes = NODES;
  const links = LINKS;

  // Pre-sampled continental landmass coordinates (approximate coastlines/land clusters)
  const continentPointsRef = useRef<[number, number][]>([]);

  // Generate terrestrial landmass dot grid on mount
  useEffect(() => {
    const pts: [number, number][] = [];

    // Helper: generate cluster of points inside lat/lon boundary
    const addCluster = (
      minLat: number,
      maxLat: number,
      minLon: number,
      maxLon: number,
      density: number
    ) => {
      const step = isMobile ? 6 : 4;
      for (let lat = minLat; lat <= maxLat; lat += step) {
        for (let lon = minLon; lon <= maxLon; lon += step) {
          if (Math.random() < density) {
            pts.push([lat + (Math.random() - 0.5) * 1.5, lon + (Math.random() - 0.5) * 1.5]);
          }
        }
      }
    };

    // North America
    addCluster(15, 65, -135, -60, 0.7);
    // South America
    addCluster(-55, 12, -80, -35, 0.65);
    // Europe
    addCluster(36, 68, -10, 40, 0.75);
    // Africa
    addCluster(-35, 36, -18, 50, 0.68);
    // Asia (India, Russia, China, Japan, SE Asia)
    addCluster(8, 70, 40, 145, 0.72);
    // Australia
    addCluster(-42, -12, 114, 153, 0.65);

    continentPointsRef.current = pts;
  }, []);

  // Packets traversing great-circle arcs
  interface Packet {
    fromId: string;
    toId: string;
    progress: number;
    speed: number;
  }
  const packetsRef = useRef<Packet[]>([
    { fromId: 'node_in', toId: 'node_sg', progress: 0.1, speed: 0.008 },
    { fromId: 'node_sg', toId: 'node_tokyo', progress: 0.45, speed: 0.009 },
    { fromId: 'node_in', toId: 'node_fra', progress: 0.7, speed: 0.007 },
    { fromId: 'node_fra', toId: 'node_nyc', progress: 0.3, speed: 0.006 },
    { fromId: 'node_nyc', toId: 'node_sf', progress: 0.85, speed: 0.01 },
    { fromId: 'node_sf', toId: 'node_tokyo', progress: 0.15, speed: 0.007 },
  ]);

  // Rotation state
  const rotYRef = useRef<number>(1.2); // Start showing India / Asia
  const rotXRef = useRef<number>(0.28); // Axial tilt
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredNodeIdRef = useRef<string | null>(null);

  // 3D Spherical to 2D screen projection
  const project = useCallback(
    (lat: number, lon: number, radius: number, cx: number, cy: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180) + rotYRef.current;

      // 3D Cartesian coordinates
      let x = -radius * Math.sin(phi) * Math.cos(theta);
      let z = radius * Math.sin(phi) * Math.sin(theta);
      let y = radius * Math.cos(phi);

      // Apply X-axis tilt
      const cosX = Math.cos(rotXRef.current);
      const sinX = Math.sin(rotXRef.current);
      const yNew = y * cosX - z * sinX;
      const zNew = y * sinX + z * cosX;

      y = yNew;
      z = zNew;

      return {
        x: cx + x,
        y: cy - y,
        z: z, // z > 0 is facing viewer, z < 0 is on back of globe
        visible: z > 0,
      };
    },
    []
  );

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const render = () => {
      if (!isInView) {
        return;
      }

      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : 600;
      const h = parent ? parent.clientHeight : 500;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * (size === 'hero' ? 0.42 : 0.38);

      ctx.clearRect(0, 0, w, h);

      // Auto-rotation when not dragging
      if (!isDraggingRef.current) {
        rotYRef.current += 0.0035;
      }

      // 1. Deep Space Radial Halo Background
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.45);
      haloGrad.addColorStop(0, 'rgba(74, 222, 222, 0.12)');
      haloGrad.addColorStop(0.5, 'rgba(96, 241, 173, 0.05)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe Dark Sphere Base
      const globeGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      globeGrad.addColorStop(0, '#0D1520');
      globeGrad.addColorStop(0.7, '#050A10');
      globeGrad.addColorStop(1, '#000205');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();
      ctx.clip(); // Clip everything inside the globe sphere

      // 3. Grid Lines (Parallels & Meridians)
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = 'rgba(74, 222, 222, 0.14)';

      // Latitudes (-60 to +60 in steps of 30)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 5) {
          const p = project(lat, lon, radius, cx, cy);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Longitudes (-180 to 180 in steps of 30)
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 5) {
          const p = project(lat, lon, radius, cx, cy);
          if (p.visible) {
            if (first) {
              ctx.moveTo(p.x, p.y);
              first = false;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Terrestrial Landmass Dots
      const pts = continentPointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const [lat, lon] = pts[i];
        const p = project(lat, lon, radius, cx, cy);
        if (p.visible) {
          const alpha = Math.max(0.1, (p.z / radius) * 0.85);
          ctx.fillStyle = `rgba(229, 229, 229, ${alpha})`;
          ctx.fillRect(p.x - 0.9, p.y - 0.9, 1.8, 1.8);
        }
      }

      // 5. Great-Circle Mesh Arcs
      const nodePosMap = new Map<string, { x: number; y: number; z: number; visible: boolean }>();
      nodes.forEach((n) => {
        nodePosMap.set(n.id, project(n.lat, n.lon, radius, cx, cy));
      });

      links.forEach(([fromId, toId]) => {
        const p1 = nodePosMap.get(fromId);
        const p2 = nodePosMap.get(toId);
        if (!p1 || !p2) return;

        // Render if at least one endpoint is facing front
        if (p1.visible || p2.visible) {
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          // Elevate arc peak outward from globe center
          const dx = midX - cx;
          const dy = midY - cy;
          const len = Math.hypot(dx, dy) || 1;
          const arcHeight = Math.min(dist * 0.35, 45);
          const cpX = midX + (dx / len) * arcHeight;
          const cpY = midY + (dy / len) * arcHeight;

          const isSelectedLink =
            fromId === internalSelectedId || toId === internalSelectedId;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
          ctx.strokeStyle = isSelectedLink
            ? 'rgba(74, 222, 222, 0.75)'
            : 'rgba(96, 241, 173, 0.35)';
          ctx.lineWidth = isSelectedLink ? 1.8 : 1.0;
          ctx.stroke();
        }
      });

      // 6. Traveling Photon Packets
      packetsRef.current.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) {
          pkt.progress = 0;
        }

        const p1 = nodePosMap.get(pkt.fromId);
        const p2 = nodePosMap.get(pkt.toId);
        if (!p1 || !p2) return;

        if (p1.visible || p2.visible) {
          const t = pkt.progress;
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          const dx = midX - cx;
          const dy = midY - cy;
          const len = Math.hypot(dx, dy) || 1;
          const arcHeight = Math.min(dist * 0.35, 45);
          const cpX = midX + (dx / len) * arcHeight;
          const cpY = midY + (dy / len) * arcHeight;

          // Quadratic Bezier interpolation
          const curX = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cpX + t * t * p2.x;
          const curY = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cpY + t * t * p2.y;

          // Packet particle
          ctx.beginPath();
          ctx.arc(curX, curY, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#4ADEDE';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      ctx.restore(); // Restore clipping

      // 7. Outer Atmospheric Rim & Glowing Corona
      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.94, cx, cy, radius * 1.03);
      rimGrad.addColorStop(0, 'rgba(74, 222, 222, 0)');
      rimGrad.addColorStop(0.7, 'rgba(74, 222, 222, 0.45)');
      rimGrad.addColorStop(0.9, 'rgba(96, 241, 173, 0.6)');
      rimGrad.addColorStop(1, 'rgba(74, 222, 222, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.03, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.strokeStyle = rimGrad;
      ctx.stroke();

      // Outer delicate boundary border
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(74, 222, 222, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 8. Node Beacons & Radar Pulse Rings
      nodes.forEach((n) => {
        const p = nodePosMap.get(n.id);
        if (!p || !p.visible) return;

        const isSelected = n.id === internalSelectedId;
        const isHovered = n.id === hoveredNodeIdRef.current;
        const scale = Math.max(0.6, p.z / radius);

        // Radar Expanding Pulse
        const now = Date.now();
        const pulse = ((now / 1200 + nodes.indexOf(n) * 0.25) % 1) * 16 * scale;
        const pulseAlpha = Math.max(0, 1 - pulse / (16 * scale));

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * scale + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected
          ? `rgba(74, 222, 222, ${pulseAlpha})`
          : `rgba(96, 241, 173, ${pulseAlpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Node Central Pin
        ctx.beginPath();
        ctx.arc(p.x, p.y, (isSelected ? 5.5 : 4) * scale, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#60F1AD';
        ctx.shadowColor = isSelected ? '#4ADEDE' : '#60F1AD';
        ctx.shadowBlur = isSelected ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label on hover or selection
        if (isSelected || isHovered) {
          ctx.font = `600 ${Math.max(10, 11 * scale)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'left';

          const text = `${n.city} [${n.latency}]`;
          const textWidth = ctx.measureText(text).width;

          ctx.fillStyle = 'rgba(3, 7, 18, 0.85)';
          ctx.fillRect(p.x + 8, p.y - 14, textWidth + 10, 20);
          ctx.strokeStyle = '#4ADEDE';
          ctx.lineWidth = 0.8;
          ctx.strokeRect(p.x + 8, p.y - 14, textWidth + 10, 20);

          ctx.fillStyle = '#4ADEDE';
          ctx.fillText(text, p.x + 13, p.y);
        }
      });

      animId = requestAnimationFrame(render);
    };

    if (isInView) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [project, size, internalSelectedId, isInView]);

  // Mouse / Touch Drag Rotation Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      rotYRef.current += deltaX * 0.007;
      rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current - deltaY * 0.005));

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    } else {
      // Check node hover
      const w = canvas.parentElement?.clientWidth || 600;
      const h = canvas.parentElement?.clientHeight || 500;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * (size === 'hero' ? 0.42 : 0.38);

      let foundHover: string | null = null;
      for (const n of nodes) {
        const p = project(n.lat, n.lon, radius, cx, cy);
        if (p.visible) {
          const dist = Math.hypot(mouseX - p.x, mouseY - p.y);
          if (dist < 14) {
            foundHover = n.id;
            break;
          }
        }
      }
      hoveredNodeIdRef.current = foundHover;
      canvas.style.cursor = foundHover ? 'pointer' : isDraggingRef.current ? 'grabbing' : 'grab';
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch Handlers for iPhone, Android, and Tablets
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!interactive || e.touches.length === 0) return;
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePosRef.current.x;
    const deltaY = touch.clientY - lastMousePosRef.current.y;

    rotYRef.current += deltaX * 0.007;
    rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current - deltaY * 0.005));

    lastMousePosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const w = canvas.parentElement?.clientWidth || 600;
    const h = canvas.parentElement?.clientHeight || 500;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * (size === 'hero' ? 0.42 : 0.38);

    for (const n of nodes) {
      const p = project(n.lat, n.lon, radius, cx, cy);
      if (p.visible) {
        const dist = Math.hypot(mouseX - p.x, mouseY - p.y);
        if (dist < 16) {
          setInternalSelectedId(n.id);
          if (onSelectNode) {
            onSelectNode(n);
          }
          break;
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] sm:min-h-[360px] flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={handleClick}
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating HUD telemetry tag */}
      <div className="absolute bottom-3 left-3 pointer-events-none font-mono text-[10px] text-[#A1A1AA] flex items-center gap-2 bg-[#030712]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#27272A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#60F1AD] animate-ping" />
        <span>3D MESH TOPOLOGY // TERRESTRIAL SYNC</span>
      </div>

      <div className="absolute top-3 right-3 pointer-events-none font-mono text-[10px] text-[#4ADEDE] bg-[#030712]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#27272A]">
        <span>DRAG TO ROTATE 🌐</span>
      </div>
    </div>
  );
};
