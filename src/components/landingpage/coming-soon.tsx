"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Instagram, X, Loader2 } from 'lucide-react'; // Make sure to install lucide-react

const ComingSoon = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Background Grid Fade In
    tl.to(".bg-grid", { opacity: 0.4, duration: 1.5 });

    // 2. Main Typography Reveal (Staggered)
    tl.from(".hero-char", {
      y: 150,
      opacity: 0,
      rotateX: -90,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    }, "-=1");

    // 3. Subtext and Form Reveal
    tl.from(".fade-up", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    // 4. Marquee Animation (Infinite Loop)
    gsap.to(".marquee-track", {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Animate Success State
      gsap.to(formRef.current, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }, 1500);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* BACKGROUND LAYERS */}
      {/* 1. Grid */}
      <div 
        className="bg-grid absolute inset-0 opacity-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      ></div>
      
      {/* 2. Noise Texture (CSS Trick) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* HEADER / NAV */}
      <header className="relative z-20 w-full px-6 py-8 flex justify-between items-center fade-up">
        <div className="font-bold text-xl tracking-widest">KAIKNOT</div>
        <div className="flex gap-6 text-sm font-mono text-zinc-500">
          <span>[ EST. 2025 ]</span>
          <span className="hidden md:inline text-zinc-300">JAIPUR, IN</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center">
        
        {/* Status Badge */}
        <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-xs font-mono text-zinc-400 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          SYSTEM ONLINE : PREPARING LAUNCH
        </div>

        {/* Giant Typography */}
        <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter mb-8 overflow-hidden">
          <div className="flex justify-center gap-[1vw]">
            {"WE ARE".split('').map((char, i) => (
              <span key={i} className="hero-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </div>
          <div className="flex justify-center gap-[1vw] text-zinc-600">
             {"ARRIVING".split('').map((char, i) => (
              <span key={i + 10} className="hero-char inline-block">{char}</span>
            ))}
          </div>
        </h1>

        {/* Email Capture */}
        <div className="w-full max-w-md fade-up">
          <p className="text-zinc-400 mb-6 text-lg font-light">
            Rare apparel. Quiet confidence. <br className="hidden md:block"/>
            Join the waitlist for Drop 01.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="relative group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'success'}
              className="w-full bg-transparent border-b border-zinc-700 py-4 text-xl outline-none text-white placeholder:text-zinc-600 transition-colors focus:border-white"
            />
            <button 
              type="submit"
              disabled={status === 'success' || status === 'loading'}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : status === 'success' ? (
                <span className="text-sm font-mono text-green-400">JOINED</span>
              ) : (
                <ArrowRight className="w-6 h-6" />
              )}
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER / MARQUEE */}
      <footer className="relative z-20 w-full overflow-hidden py-8 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        {/* Infinite Scrolling Text */}
        <div className="marquee-track whitespace-nowrap flex items-center gap-8 text-zinc-700 font-black text-4xl md:text-6xl uppercase tracking-tighter select-none opacity-50 hover:opacity-100 transition-opacity duration-500">
           <span>Don&apos;t Chase Trends</span>
           <span className="text-zinc-800">•</span>
           <span>Kaiknot</span>
           <span className="text-zinc-800">•</span>
           <span>Drop 01 Coming Soon</span>
           <span className="text-zinc-800">•</span>
           <span>Brutalist Aesthetic</span>
           <span className="text-zinc-800">•</span>
           <span>Don&apos;t Chase Trends</span>
           <span className="text-zinc-800">•</span>
           <span>Kaiknot</span>
           <span className="text-zinc-800">•</span>
           <span>Drop 01 Coming Soon</span>
           <span className="text-zinc-800">•</span>
           <span>Brutalist Aesthetic</span>
           <span className="text-zinc-800">•</span>
        </div>

        {/* Social Links */}
        <div className="fade-up absolute bottom-4 right-6 md:bottom-8 md:right-12 flex gap-4 text-zinc-400 bg-zinc-950 p-2">
          <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><X size={20} /></a>
        </div>
      </footer>
    </div>
  )
}

export default ComingSoon