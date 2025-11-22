"use client";

import React from "react";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowRight } from "lucide-react";

// 1. UPDATE INTERFACE
interface MenuItemProps {
  link: string;
  text: string;
  // image is no longer mandatory or primary used in this view
  image?: string; 
  // Add icon prop
  icon?: React.ReactNode;
  description?: string;
  index: number;
}

interface FlowingMenuProps {
  items?: Omit<MenuItemProps, "index">[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-zinc-950 relative text-zinc-100 border-t border-b border-zinc-800">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      <nav className="flex flex-col md:flex-row h-full w-full m-0 p-0 relative z-20">
        {items.map((item, idx) => (
          <MenuItem key={idx} index={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

// Destructure icon from props
const MenuItem: React.FC<MenuItemProps> = ({ link, text, icon, description, index }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const hoverPanelRef = React.useRef<HTMLDivElement>(null);
  const hoverInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo.out" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !hoverPanelRef.current || !hoverInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(hoverPanelRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(hoverInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([hoverPanelRef.current, hoverInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !hoverPanelRef.current || !hoverInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(hoverPanelRef.current, { y: edge === "top" ? "-101%" : "101%" }).to(
      hoverInnerRef.current,
      {
        y: edge === "top" ? "101%" : "-101%",
      }
    );
  };

  const platformName = text.split('(')[0];
  const platformHandle = text.split('(')[1]?.replace(')', '');

  return (
    <div
      className="flex-1 relative group overflow-hidden border-b border-zinc-800 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
      ref={itemRef}
    >
      {/* IDLE STATE (Dark) */}
      <a
        className="flex flex-col justify-between h-full relative cursor-pointer no-underline p-6 md:p-10 z-10"
        href={link}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full flex justify-between items-start text-zinc-500 group-hover:text-zinc-300 transition-colors">
          <span className="font-mono text-sm tracking-widest">0{index + 1}</span>
          <ArrowUpRight className="w-5 h-5 opacity-50" />
        </div>

        <div className="relative">
             <h3 className="font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase text-white">
               {platformName}
             </h3>
             <span className="text-zinc-500 text-sm font-mono block mt-2">
                {platformHandle}
             </span>
        </div>

        <div>
            <span className="text-xs font-mono text-zinc-600 uppercase">
                [ View Profile ]
            </span>
        </div>
      </a>

      {/* 2. HOVER STATE REDESIGN (White Panel) */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-zinc-100 z-20 translate-y-[101%]"
        ref={hoverPanelRef}
      >
        {/* Changed layout from flex-row to single column flex-col */}
        <div className="h-full w-full flex flex-col justify-between p-8 md:p-12 text-zinc-900" ref={hoverInnerRef}>
            
            <div>
                {/* Header Area with Small Icon */}
                <div className="flex items-center gap-4 mb-6 border-b-2 border-zinc-900 pb-4">
                    {/* Display the passed Icon component */}
                    {icon && <div className="text-zinc-900">{icon}</div>}
                    <h4 className="font-black text-2xl md:text-3xl uppercase tracking-tighter">
                        {platformName}
                    </h4>
                </div>

                {/* Description Text */}
                <p className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-zinc-800 max-w-2xl">
                    {description}
                </p>
            </div>
                
            {/* Bottom "Open Link" Bar */}
            <div className="flex items-center gap-4 mt-8">
                <div className="h-px flex-1 bg-zinc-300"></div>
                <div className="flex items-center gap-2 text-sm font-mono uppercase font-bold group-hover:text-zinc-900 transition-colors">
                    <span>Open Link</span>
                    <ArrowRight size={18} />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;