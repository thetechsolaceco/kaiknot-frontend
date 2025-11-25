"use client"
import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import IntroAnimation from './intro-animation'

const ComingSoon = () => {
  const [showIntro, setShowIntro] = useState(true)
  const { scrollYProgress } = useScroll()

  // Text scales up as you scroll (stays visible)
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.5])
  
  // Particles fade out as you scroll
  const particleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const handleIntroComplete = () => {
    setShowIntro(false)
    window.scrollTo(0, 0)
  }

  // Particle configurations (fixed values to avoid hydration issues)
  const leftParticles = [
    { size: 50, left: 20, top: 15, blur: 2, duration: 4 },
    { size: 35, left: 60, top: 30, blur: 1.5, duration: 3.5 },
    { size: 45, left: 40, top: 50, blur: 2.5, duration: 4.5 },
    { size: 30, left: 70, top: 70, blur: 1.8, duration: 3.8 },
    { size: 55, left: 25, top: 85, blur: 2.2, duration: 4.2 },
    { size: 40, left: 55, top: 10, blur: 1.6, duration: 3.6 },
    { size: 48, left: 15, top: 45, blur: 2.1, duration: 4.1 },
    { size: 38, left: 75, top: 60, blur: 1.9, duration: 3.9 },
  ]

  const rightParticles = [
    { size: 45, right: 25, top: 20, blur: 2.1, duration: 4.2 },
    { size: 55, right: 55, top: 35, blur: 2.3, duration: 3.7 },
    { size: 35, right: 40, top: 55, blur: 1.7, duration: 4.3 },
    { size: 60, right: 70, top: 75, blur: 2.5, duration: 3.5 },
    { size: 42, right: 20, top: 90, blur: 1.8, duration: 4.0 },
    { size: 50, right: 60, top: 5, blur: 2.0, duration: 3.8 },
    { size: 38, right: 35, top: 40, blur: 1.6, duration: 4.4 },
    { size: 52, right: 75, top: 65, blur: 2.2, duration: 3.6 },
  ]

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Content after intro */}
      {!showIntro && (
        <div className="relative bg-black">
          <div className="h-[300vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
              {/* Left Particles */}
              <motion.div 
                className="absolute left-0 top-0 h-full w-1/4 pointer-events-none"
                style={{ opacity: particleOpacity }}
              >
                {leftParticles.map((particle, i) => (
                  <motion.div
                    key={`left-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                      filter: `blur(${particle.blur}px)`,
                      boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)',
                    }}
                    initial={{ opacity: 0, scale: 0, x: -100 }}
                    animate={{
                      opacity: [0, 0.8, 0.6, 0.8],
                      scale: [0, 1, 1.1, 1],
                      x: 0,
                      y: [0, -20, 0, -15, 0],
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Right Particles */}
              <motion.div 
                className="absolute right-0 top-0 h-full w-1/4 pointer-events-none"
                style={{ opacity: particleOpacity }}
              >
                {rightParticles.map((particle, i) => (
                  <motion.div
                    key={`right-${i}`}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      right: `${particle.right}%`,
                      top: `${particle.top}%`,
                      filter: `blur(${particle.blur}px)`,
                      boxShadow: '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)',
                    }}
                    initial={{ opacity: 0, scale: 0, x: 100 }}
                    animate={{
                      opacity: [0, 0.8, 0.6, 0.8],
                      scale: [0, 1, 1.1, 1],
                      x: 0,
                      y: [0, -25, 0, -20, 0],
                    }}
                    transition={{
                      duration: particle.duration,
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              {/* Coming Soon Text */}
              <motion.div
                className="text-center px-4 z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                style={{ 
                  scale: textScale,
                }}
              >
                <motion.h1
                  className="text-7xl md:text-9xl font-bold text-white mb-6 font-[family-name:var(--font-network)] tracking-wide"
                >
                  Coming Soon
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-zinc-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Something extraordinary is on the way
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Next Section */}
          <div className="min-h-screen bg-black flex items-center justify-center">
            <motion.div
              className="text-center px-4 max-w-4xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Stay Tuned
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 mb-12">
                We&apos;re crafting something special just for you. Be the first to know when we launch.
              </p>
              <motion.button
                className="px-8 py-4 bg-white text-black font-semibold rounded-full text-lg hover:bg-zinc-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Notify Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComingSoon
