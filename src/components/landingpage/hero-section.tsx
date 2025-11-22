"use client"
import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { StarsBackground } from '../ui/stars-background';

const KaiKnotLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Image slides in from the left (Character entrance)
    tl.from(imageRef.current, {
      x: '-100%',
      opacity: 0,
      duration: 1.8,
      ease: "power3.out",
    })
    // 2. Text reveals afterwards
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=1") // Overlap slightly with image animation
    // 3. Nav fades down
    .from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden"
    >
      {/* --- Starry Background --- */}
      <div
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_1px_1px,#ffffff26_1px,transparent_0)]
          bg-[length:40px_40px]
          opacity-40
        "
      />

      {/* --- Navigation --- */}
      <header
        ref={navRef}
        className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12"
      >
        <div className="relative z-50 cursor-pointer">
          {/* Fallback for Image if asset is missing in preview, allows code to be runnable */}
          <div className="w-[110px] h-[40px] relative">
            <Image
              src={"/images/brand/iconwhite-transparent.png"}
              width={110}
              height={110}
              alt="KaiKnot Brand"
              className="object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </div>

        {/* Desktop Nav - Content is now WHITE */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-[0.2em] uppercase text-white">
          <a href="#concept" className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              Concept
            </span>
            <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full text-zinc-400">
              Concept
            </span>
          </a>
          <a href="#social" className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              Social
            </span>
            <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full text-zinc-400">
              Social
            </span>
          </a>
          
          {/* UNIQUE JOIN BUTTON - Streetwear Style */}
          {/* White Background, Black Text, "Fill" Animation */}
          <button className="group relative px-6 py-2 bg-white overflow-hidden border-2 border-white transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            {/* The sliding black background */}
            <div className="absolute inset-0 w-full h-full bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            {/* Text Container */}
            <div className="relative z-10 flex items-center justify-center gap-2 mix-blend-difference">
              <span className="text-white font-black tracking-widest uppercase text-xs group-hover:text-white transition-colors duration-300">
                Join
              </span>
              {/* Arrow visible by default, nudges on hover */}
              <span className="text-white translate-x-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu Button - White to match theme */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white z-50 hover:rotate-90 transition-transform duration-300"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-black tracking-widest uppercase text-white">
          <a
            href="#concept"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-zinc-400 transition-colors"
          >
            Concept
          </a>
          <a
            href="#social"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-zinc-400 transition-colors"
          >
            Social
          </a>
          <a
            href="#join"
            onClick={() => setIsMenuOpen(false)}
            className="px-8 py-2 bg白 text-black"
          >
            Join
          </a>
        </div>
      )}

      {/* --- Hero Section --- */}
      <section className="relative w-full h-[105vh] flex flex-col md:flex-row items-end md:items-center justify-between overflow-hidden pt-20 bg-black text-white">
        {/* LEFT: Character Image Animation */}
        <StarsBackground />
        <div className="absolute left-0 bottom-0 h-[85%] w-full md:w-[55%] z-10 pointer-events-none">
          <div ref={imageRef} className="relative w-full h-full">
            {/* Provided Image Path */}
            <Image
              src="/images/NewHeroImage.png"
              alt="KaiKnot Character"
              fill
              className="object-contain object-bottom md:object-left-bottom drop-shadow-2xl grayscale contrast-125"
              priority
            />
          </div>
        </div>

        {/* RIGHT: Hero Text Content (wider now) */}
        <div
          ref={textRef}
          className="relative z-20 w-full md:w-[60%] ml-auto px-6 md:pr-24 pb-32 md:pb-0 flex flex-col items-center md:items-end text-center md:text-right text-white"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-8 font-(family-name:--font-blowbrush) mix-blend-exclusion">
            THE WORLD
            <br />
            CHANGES
            <br />
            WHEN YOU
            <br />
            <span className="text-zinc-500">STOP TRYING.</span>
          </h1>
          <div className="h-px w-32 bg-white my-6 md:mr-2" />
          <p className="text-xl md:text-2xl italic font-light text-zinc-300 tracking-wide">
            Knotted by Individuality.
          </p>

          {/* Call To Action Button - Bottom */}
          <button className="mt-10 px-8 py-3 border-2 border-white text-white text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            Explore Lookbook
          </button>
        </div>


      </section>
    </div>
  );
};

export default KaiKnotLanding;
