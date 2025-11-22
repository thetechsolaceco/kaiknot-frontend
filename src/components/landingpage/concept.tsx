"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const Concept = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  // watermarkRef removed, will be handled in footer

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Animation starts when top of section hits 75% of viewport
        toggleActions: "play none none reverse",
      }
    });

    // 1. Staggered Title Reveal (Left Side)
    tl.from(".anim_title_line", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    })
    // 2. Black Bar expansion
    .from(".anim_bar", {
      width: 0,
      duration: 0.8,
      ease: "expo.out"
    }, "-=0.8")
    // 3. Small tag fade in
    .from(".anim_tag", {
      opacity: 0,
      x: -20,
      duration: 0.5
    }, "-=0.5");

    // 4. Right Side Content (Triggered separately as it might be taller)
    const contentElements = gsap.utils.toArray('.anim_text_block');
    contentElements.forEach((el) => {
        gsap.from(el as HTMLElement, { 
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
            scrollTrigger: {
              trigger: el as HTMLElement,
              start: "top 85%",
        }
      });
    });

    // 5. Special Animation for the Black "Highlight Box"
    gsap.from(".anim_highlight_box", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "back.out(1.7)", // Gives it a small bounce
      scrollTrigger: {
        trigger: ".anim_highlight_box",
        start: "top 85%"
      }
    });

    // 6. Divider Line Draw
    gsap.from(".anim_divider", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".anim_divider",
        start: "top 90%"
      }
    });

    // 7. Parallax Effects (Scrub based on scroll position)
    gsap.to(".anim_grid_bg", {
      y: 100, // Moves down slightly as you scroll
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Watermark animation removed from concept, will be handled in footer

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section id="concept" className="relative w-full py-24 md:py-32 text-black px-6 md:px-12 overflow-hidden  bg-white">
        
        {/* GRID BACKGROUND ADDITION (With Parallax Class) */}
        <div 
          className="anim_grid_bg absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        ></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start relative z-10">

          {/* Sticky Title Area */}
          <div className="w-full md:w-1/3 md:sticky md:top-32" ref={titleRef}>
             {/* We wrap text in blocks to mask the slide-up animation */}
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-6 overflow-hidden">
               <div className="anim_title_line">GLIMPSE</div>
               <div className="anim_title_line"><span className="text-zinc-400">OF WHAT</span></div>
               <div className="anim_title_line">TO EXPECT</div>
             </h2>
             
             <div className="anim_bar h-2 w-24 bg-black mb-6"></div>
             
             <p className="anim_tag text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
               Drop 01 / Manifesto
             </p>
          </div>

          {/* Content Area */}
          <div className="w-full md:w-2/3 md:pl-12 md:border-l border-zinc-200" ref={contentRef}>
             <div className="anim_text_block text-2xl md:text-4xl leading-tight font-light text-zinc-600">
               <span className="text-black font-black">We don&apos;t chase trends.</span> We create <span className="text-black font-black">rare, real apparel</span> designed around <span className="text-black font-black">quiet confidence</span>, <span className="text-black font-black">deep stories</span>, and the <span className="text-black font-black">beautiful contrast</span> of who you are and who you are becoming.
             </div> 
             
             {/* Divider */}
             <div className="anim_divider my-12 h-px w-full bg-zinc-200"></div>
             
             <div className="anim_text_block text-2xl md:text-4xl leading-tight font-light text-zinc-600">
               Our first drop features 
               {/* Skewed Box Highlight */}
               <span className="anim_highlight_box inline-block bg-black text-white px-3 py-1 mx-2 transform -skew-x-12 shadow-[8px_8px_0px_0px_rgba(200,200,200,0.5)]">
                 <span className="font-bold text-xl md:text-3xl skew-x-12 inline-block">four distinct designs</span>
               </span>
                — prepare for pieces that <span className="text-black font-black border-b-4 border-black">demand attention without needing to shout.</span>
             </div>

             {/* Decorative Tag */}
             <div className="anim_text_block mt-16 flex items-center gap-4">
               <div className="h-px flex-1 bg-zinc-300"></div>
               <span className="font-mono text-sm text-zinc-400 uppercase">[ Aesthetic : Brutalist ]</span>
             </div>
          </div>
        </div>

        {/* Background Decor (Watermark) - Added ref for parallax */}

      </section>
    </div>
  )
}

export default Concept;