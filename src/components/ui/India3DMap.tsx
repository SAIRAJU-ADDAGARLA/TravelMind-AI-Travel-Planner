"use client";

import { useEffect, useRef, useState } from "react";
import { Stopover } from "@/store/useTripStore";
import { MapPin, Sparkles, Navigation } from "lucide-react";

interface India3DMapProps {
  source: string;
  destination: string;
  stopovers: Stopover[];
  activePreference?: string;
}

export default function India3DMap({ source, destination, stopovers, activePreference }: India3DMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Default coordinate path representing Bhimavaram to Hyderabad route on our map grid (x: 20-80%, y: 35-70%)
  const routePoints: { name: string; x: number; y: number; isEdge: boolean; category?: string }[] = [
    { name: source, x: 30, y: 60, isEdge: true },
    ...stopovers.map((s) => ({ name: s.name, x: s.coords.x, y: s.coords.y, isEdge: false, category: s.category })),
    { name: destination, x: 80, y: 48, isEdge: true },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particleOffset = 0;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stylized abstract grid lines
      ctx.strokeStyle = "rgba(37, 99, 235, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw abstract India shape (connecting vector coordinates for clean background representation)
      ctx.fillStyle = "rgba(37, 99, 235, 0.015)";
      ctx.strokeStyle = "rgba(37, 99, 235, 0.08)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      // Rough geometric boundaries of India map
      const w = canvas.width;
      const h = canvas.height;
      ctx.moveTo(w * 0.5, h * 0.1);   // Kashmir
      ctx.lineTo(w * 0.58, h * 0.22); // Northeast border
      ctx.lineTo(w * 0.85, h * 0.28); // Assam
      ctx.lineTo(w * 0.82, h * 0.38); // Bangladesh border
      ctx.lineTo(w * 0.68, h * 0.5);  // East coast curves
      ctx.lineTo(w * 0.56, h * 0.72); // Andhra coast
      ctx.lineTo(w * 0.5, h * 0.9);   // Kanyakumari
      ctx.lineTo(w * 0.44, h * 0.72); // Kerala coast
      ctx.lineTo(w * 0.35, h * 0.55); // Goa / Maharashtra
      ctx.lineTo(w * 0.18, h * 0.42); // Gujarat
      ctx.lineTo(w * 0.25, h * 0.3);  // Rajasthan
      ctx.lineTo(w * 0.38, h * 0.22); // Punjab
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw Main Route Line
      ctx.beginPath();
      ctx.lineWidth = 3;
      
      // Gradient matching primary -> accent colors
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, "#2563EB"); // primary
      grad.addColorStop(0.5, "#8B5CF6"); // secondary
      grad.addColorStop(1, "#06B6D4"); // accent
      ctx.strokeStyle = grad;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      routePoints.forEach((pt, idx) => {
        const px = (pt.x / 100) * canvas.width;
        const py = (pt.y / 100) * canvas.height;
        if (idx === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.stroke();

      // Draw Animated Glowing Trail Particles along the route
      particleOffset += 0.4;
      if (particleOffset >= 100) particleOffset = 0;

      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#06B6D4";
      ctx.fillStyle = "#ffffff";
      
      // Draw glowing pulse particles
      routePoints.forEach((pt, idx) => {
        if (idx < routePoints.length - 1) {
          const nextPt = routePoints[idx + 1];
          const px = (pt.x / 100) * canvas.width;
          const py = (pt.y / 100) * canvas.height;
          const nx = (nextPt.x / 100) * canvas.width;
          const ny = (nextPt.y / 100) * canvas.height;

          // Interpolated particle position
          const travelPct = (particleOffset % 100) / 100;
          const partX = px + (nx - px) * travelPct;
          const partY = py + (ny - py) * travelPct;

          ctx.beginPath();
          ctx.arc(partX, partY, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

      // Draw Pulsing attraction nodes & labels
      routePoints.forEach((pt) => {
        const px = (pt.x / 100) * canvas.width;
        const py = (pt.y / 100) * canvas.height;
        
        const isHovered = hoveredNode === pt.name;
        
        // Highlight preferred category stops
        const isPreferred = pt.category && activePreference && pt.category.toLowerCase() === activePreference.toLowerCase();
        
        ctx.save();
        
        if (pt.isEdge) {
          // Source & Destination nodes
          ctx.shadowBlur = 15;
          ctx.shadowColor = pt.name === source ? "#10B981" : "#2563EB";
          ctx.fillStyle = pt.name === source ? "#10B981" : "#2563EB";
          
          ctx.beginPath();
          ctx.arc(px, py, isHovered ? 8 : 6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Intermediate stopover attraction nodes
          const pulseScale = 1 + 0.15 * Math.sin(Date.now() / 200);
          ctx.shadowBlur = isPreferred ? 15 : 6;
          ctx.shadowColor = isPreferred ? "#F59E0B" : "#8B5CF6";
          ctx.fillStyle = isPreferred ? "#F59E0B" : "#8B5CF6";
          
          ctx.beginPath();
          ctx.arc(px, py, (isHovered ? 7 : 5) * (isPreferred ? pulseScale : 1), 0, Math.PI * 2);
          ctx.fill();

          // Outer glowing ring
          ctx.strokeStyle = isPreferred ? "rgba(245, 158, 11, 0.4)" : "rgba(139, 92, 246, 0.3)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, (isHovered ? 12 : 9) * pulseScale, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw names on hover or for start/ends
        if (isHovered || pt.isEdge || isPreferred) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px sans-serif";
          ctx.textAlign = "center";
          
          // Draw text backdrop block
          const textWidth = ctx.measureText(pt.name.split(" ")[0]).width;
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.fillRect(px - textWidth/2 - 4, py - 18, textWidth + 8, 12);
          
          // Draw text string
          ctx.fillStyle = isPreferred ? "#F59E0B" : "#ffffff";
          ctx.fillText(pt.name.split(" ")[0], px, py - 9);
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [routePoints, source, destination, hoveredNode, activePreference]);

  // Handle canvas mouse move hover triggers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    let found: string | null = null;
    routePoints.forEach((pt) => {
      const distance = Math.sqrt(Math.pow(pt.x - x, 2) + Math.pow(pt.y - y, 2));
      if (distance < 3.5) {
        found = pt.name;
      }
    });

    setHoveredNode(found);
  };

  return (
    <div className="rounded-3xl border border-border/40 bg-card p-5 relative overflow-hidden flex flex-col justify-between h-[360px] group shadow-inner">
      {/* HUD Info */}
      <div className="absolute top-4 left-4 z-10 space-y-1 select-none pointer-events-none">
        <span className="inline-flex items-center space-x-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
          <Navigation className="h-3 w-3 text-accent animate-pulse" />
          <span>India-3D Cinematic HUD Map</span>
        </span>
        <p className="text-[9px] text-muted-foreground ml-1">Route: {source.split(",")[0]} &rarr; {destination.split(",")[0]}</p>
      </div>

      {/* Tilt Container */}
      <div 
        className="w-full flex-1 flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          perspective: "600px",
          transformStyle: "preserve-3d"
        }}
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={280}
          onMouseMove={handleMouseMove}
          className="w-full h-full max-w-[500px] max-h-[280px] bg-transparent cursor-crosshair transition-all duration-300"
          style={{
            transform: "rotateX(22deg) rotateY(-8deg) rotateZ(-2deg)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
        />
      </div>

      {/* Legend status indicators */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/20 pt-3 select-none pointer-events-none font-semibold">
        <div className="flex space-x-3">
          <span className="flex items-center space-x-1"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> <span>Start</span></span>
          <span className="flex items-center space-x-1"><span className="h-2 w-2 rounded-full bg-primary"></span> <span>End</span></span>
          <span className="flex items-center space-x-1"><span className="h-2 w-2 rounded-full bg-purple-500"></span> <span>Discoveries</span></span>
          <span className="flex items-center space-x-1"><span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span> <span>AI Match</span></span>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="h-3 w-3 text-accent" />
          <span>India Edition</span>
        </div>
      </div>
    </div>
  );
}
