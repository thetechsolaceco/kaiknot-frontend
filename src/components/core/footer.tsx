import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Footer = () => {
  const watermarkRef = useRef(null);

  useGSAP(() => {
    gsap.to(watermarkRef.current, {
      x: -150,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: watermarkRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, []);

  return (
    <div className="relative w-full h-32">
      <div 
        ref={watermarkRef}
        className="absolute -bottom-20 -right-20 text-[20vw] font-black text-zinc-100 pointer-events-none leading-none select-none opacity-30 whitespace-nowrap"
      >
        KAIKNOT
      </div>
    </div>
  )
}

export default Footer