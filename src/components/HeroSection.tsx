import React from 'react';
import TypeWriter from './TypeWriter';
import { PixelatedCanvas } from './ui/pixelated-canvas';
import { DottedGlowBackground } from './ui/dotted-glow-background';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center px-4 md:px-8 pt-20 overflow-hidden">
      {/* Dotted Glow Background */}
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={2}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-400"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl text-white/80">
                Hello, I am
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold">
                <TypeWriter 
                  texts={['Arnav Raj', 'netxspider']} 
                  typingSpeed={75}
                  deletingSpeed={50}
                  delayBetweenTexts={2000}
                />
              </h1>
            </div>
            
            <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              A dedicated Computer Science student and a versatile developer who thrives at the intersection of Artificial Intelligence and Full-Stack Engineering.
              I specialize in building intelligent, end-to-end systems powered by Machine Learning and Generative AI (like the models in my Annadata system) while ensuring they are delivered through robust, scalable web and mobile platforms.
            </p>
            
            <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
              My approach is highly creative: I blend technical rigor with a strong design sense, utilizing skills like graphics editing to deliver not just functional, but visually compelling digital products. My technical scope includes Full-Stack, Mobile Programming, and Blockchain fundamentals.
              I transform complex data and code into impactful, aesthetically pleasing, and functional solutions.
            </p>
            
            <div className="flex gap-4 pt-4">
              <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200">
                View Projects
              </button>
              <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200">
                Contact Me
              </button>
            </div>
          </div>
          
          {/* Right side - Pixelated Canvas */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* 
                IMPORTANT: Google Photos URLs have CORS restrictions that prevent canvas manipulation.
                To fix this, please:
                1. Download your image from Google Photos
                2. Place it in the /public folder (e.g., /public/profile.jpg)
                3. Update the src below to "/profile.jpg"
                
                For now, using a temporary placeholder that works with canvas
              */}
              <PixelatedCanvas
                src="/myImage.png"
                width={400}
                height={500}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                backgroundColor="#000000"
                dropoutStrength={0.4}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={4}
                jitterSpeed={4}
                sampleAverage
                tintColor="#FFFFFF"
                tintStrength={0.2}
                className="rounded-xl border border-white/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
