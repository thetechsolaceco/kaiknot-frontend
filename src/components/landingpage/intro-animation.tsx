"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface IntroAnimationProps {
  onComplete: () => void
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [animationStage, setAnimationStage] = useState<'icon' | 'zoom'>('icon')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && animationStage === 'icon') {
        setAnimationStage('zoom')
        
        setTimeout(() => {
          onComplete()
        }, 1500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [animationStage, onComplete])

  return (
    <>
      {/* Fixed intro screen */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
        <div
          className={`transition-all duration-1000 ease-in ${
            animationStage === 'icon'
              ? 'scale-100 opacity-100'
              : 'scale-[20] opacity-0'
          }`}
        >
          <Image
            src="/images/brand/iconwhite-transparent.png"
            alt="KaiKnot Logo"
            width={200}
            height={200}
            priority
            className="w-48 h-48"
          />
        </div>

        {/* Scroll Indicator */}
        {animationStage === 'icon' && (
          <div className="absolute bottom-10 flex flex-col items-center animate-bounce">
            <p className="text-white text-sm mb-2 tracking-widest uppercase">Scroll Down</p>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        )}
      </div>
      
      {/* Invisible spacer to enable scrolling */}
      <div className="h-[200vh]" />
    </>
  )
}

export default IntroAnimation
