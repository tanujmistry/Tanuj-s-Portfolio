import React, { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

interface OscilloscopeCanvasProps {
  className?: string;
}

type SignalMode = 'ecg' | 'dsp' | 'telemetry';

export const OscilloscopeCanvas: React.FC<OscilloscopeCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [signalMode, setSignalMode] = useState<SignalMode>('ecg');
  const [sampleRate] = useState('50.0 MHz');
  const [bpm, setBpm] = useState(74);

  // Generate an authentic synthetic ECG signal point
  const getEcgSample = (t: number): number => {
    // Normal normalized period between 0 and 1
    const phase = (t % 1);
    
    // Isoelectric baseline
    if (phase < 0.15) return 0;
    
    // P wave (atrial depolarization)
    if (phase >= 0.15 && phase < 0.25) {
      const pPhase = (phase - 0.15) / 0.1;
      return 0.15 * Math.sin(pPhase * Math.PI);
    }
    
    // PR interval
    if (phase >= 0.25 && phase < 0.32) return 0;
    
    // QRS complex (ventricular depolarization)
    if (phase >= 0.32 && phase < 0.34) {
      // Q wave (small dip)
      const qPhase = (phase - 0.32) / 0.02;
      return -0.15 * Math.sin(qPhase * Math.PI);
    }
    if (phase >= 0.34 && phase < 0.39) {
      // R wave (sharp peak)
      const rPhase = (phase - 0.34) / 0.05;
      return 1.1 * Math.sin(rPhase * Math.PI);
    }
    if (phase >= 0.39 && phase < 0.42) {
      // S wave (negative dip)
      const sPhase = (phase - 0.39) / 0.03;
      return -0.35 * Math.sin(sPhase * Math.PI);
    }
    
    // ST segment
    if (phase >= 0.42 && phase < 0.52) return 0.02;
    
    // T wave (ventricular repolarization)
    if (phase >= 0.52 && phase < 0.72) {
      const tPhase = (phase - 0.52) / 0.2;
      return 0.28 * Math.sin(tPhase * Math.PI);
    }
    
    // TP interval baseline with slight analog thermal noise
    return (Math.random() - 0.5) * 0.015;
  };

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

    // Buffer for simulated persistence phosphor
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

    // Minor fluctuating BPM for authentic bio-telemetry realism
    const bpmInterval = setInterval(() => {
      setBpm(73 + Math.floor(Math.sin(Date.now() / 3000) * 3));
    }, 2000);

    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Phosphor persistence decay (subtle CRT fade on deep black)
      ctx.fillStyle = 'rgba(5, 5, 5, 0.24)';
      ctx.fillRect(0, 0, width, height);

      // Draw Oscilloscope Graticule (Grid)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;

      const gridCols = 10;
      const gridRows = 6;
      const colStep = width / gridCols;
      const rowStep = height / gridRows;

      ctx.beginPath();
      for (let i = 1; i < gridCols; i++) {
        const x = i * colStep;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let j = 1; j < gridRows; j++) {
        const y = j * rowStep;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center crosshairs with tick marks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.beginPath();
      const centerY = height / 2;
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      const centerX = width / 2;
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();
      ctx.restore();

      // Signal Waveform Trace (Pure Monochromatic White Beam)
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();

      const sweepSpeed = 0.0018;
      time += sweepSpeed;

      const scanX = (time * 180) % width;

      for (let x = 0; x < width; x += 2) {
        let signalVal = 0;

        if (signalMode === 'ecg') {
          const cycleRate = 1.15;
          const tPos = ((x / width) * 2 - time * cycleRate);
          signalVal = getEcgSample(tPos);
        } else if (signalMode === 'dsp') {
          const freq1 = 0.035;
          const freq2 = 0.09;
          signalVal =
            0.45 * Math.sin(x * freq1 - time * 6) +
            0.25 * Math.cos(x * freq2 + time * 3) +
            0.08 * Math.sin(x * 0.2);
        } else {
          const packetEnvelope = Math.sin(x * 0.008 - time * 2);
          const carrier = Math.sin(x * 0.12 - time * 12);
          signalVal = 0.5 * packetEnvelope * carrier;
        }

        const amplitude = height * 0.34;
        const y = centerY - signalVal * amplitude;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Scanning sweep head dot (stark white phosphor beam)
      const leadY = centerY - getEcgSample((scanX / width) * 2 - time * 1.15) * (height * 0.34);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(scanX, leadY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(bpmInterval);
    };
  }, [signalMode]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-[#050505] border border-[#D4D4D4] p-3 sm:p-4 shadow-card overflow-hidden text-white ${className}`}
    >
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-white font-bold">OSCILLOSCOPE // CH1</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-400">CLK: {sampleRate}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-neutral-300">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-750 text-[10px] text-white">
            <Activity className="w-3 h-3 text-white" />
            <span>{bpm} BPM</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-750 text-[10px] text-neutral-300">
            <span>200mV / DIV</span>
          </div>
        </div>
      </div>

      {/* Canvas Display */}
      <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[320px] rounded-lg overflow-hidden my-3 bg-[#050505] border border-neutral-800">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Oscilloscope Corner Overlay Labels */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-400 pointer-events-none select-none">
          TRIG: AUTO [CH1]
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-white/80 pointer-events-none select-none">
          VPP: 1.22V
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-500 pointer-events-none select-none">
          MODEL: XILINX VIVADO CNN AFE
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-500 pointer-events-none select-none">
          FPGA 50MHz SAMPLING
        </div>
      </div>

      {/* Bottom Mode Switchers & Hardware Signals */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400 text-[10px] mr-1">SIGNAL SOURCE:</span>
          <button
            onClick={() => setSignalMode('ecg')}
            className={`px-2.5 py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
              signalMode === 'ecg'
                ? 'bg-white text-[#050505] font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            ECG Biopotential
          </button>
          <button
            onClick={() => setSignalMode('dsp')}
            className={`px-2.5 py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
              signalMode === 'dsp'
                ? 'bg-white text-[#050505] font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            DSP Filtered
          </button>
          <button
            onClick={() => setSignalMode('telemetry')}
            className={`hidden sm:inline-flex px-2.5 py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
              signalMode === 'telemetry'
                ? 'bg-white text-[#050505] font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800'
            }`}
          >
            CAN Telemetry
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
          <span>REAL-TIME INFERENCE: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
