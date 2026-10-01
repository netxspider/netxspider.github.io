import React from 'react';
import { GridBackground } from './ui/grid-background';
import TargetCursor from './ui/TargetCursor';
import ScrollBlurFade from './ui/ScrollBlurFade';
import { playTechHoverSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

interface Language {
  name: string;
  icon: string;
  color: string;
}

const languages: Language[] = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "#A8B9CC" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "#777BB4" },
  { name: "Solidity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg", color: "#ffffff" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#ffffff" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#ffffff" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", color: "#ffffff" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#4169E1" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "#FFCA28" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "#FCC624" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ED" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", color: "#EE4C2C" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", color: "#FF6F00" },
];

const LanguagesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="stack" data-no-cursor="true" className="relative border-t border-white/10 overflow-hidden bg-black text-white">
      {/* Target Cursor Component for Interactive Exploration */}
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hoverDuration={0.2}
        parallaxOn={true}
        cursorColor="#ffffff"
        cursorColorOnTarget="#ffffff"
        scopeSelector="#stack"
      />

      <GridBackground className="min-h-screen py-24 md:py-32 px-4 md:px-8">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Section Header Heading: Animated Blur Fade-In */}
          <ScrollBlurFade direction="up" distance={30} blur={10}>
            <div className="flex items-center gap-3 sm:gap-4 mb-10 md:mb-12">
              <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-none">
                {t.stack.heading}
              </h2>
              <span className="h-px bg-white/10 flex-1 ml-4" />
            </div>
          </ScrollBlurFade>

          {/* Subheading & Scope metadata */}
          <ScrollBlurFade direction="up" distance={30} delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div className="space-y-3 max-w-2xl">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                  {t.stack.subheading}
                </h3>
                <p className="font-mono-tech text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {t.stack.description}
                </p>
              </div>

              {/* Interactive Cursor Indicator Badge */}
              <div className="cursor-target inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-[11px] font-mono-tech text-neutral-300 tracking-wider backdrop-blur-sm w-fit transition-colors hover:bg-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </span>
                <span className="uppercase">{t.stack.targetHint}</span>
              </div>
            </div>
          </ScrollBlurFade>

          {/* Technology Cards Grid with Staggered Scroll Blur-Fade */}
          <ScrollBlurFade direction="up" distance={35} delay={0.2}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-4 md:gap-5">
              {languages.map((language, index) => (
                <div
                  key={index}
                  onMouseEnter={() => playTechHoverSound()}
                  className="cursor-target group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] select-none cursor-pointer"
                >
                  <div className="w-10 h-10 md:w-11 md:h-11 mb-2.5 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                    <img
                      src={language.icon}
                      alt={language.name}
                      className="w-full h-full object-contain filter drop-shadow-md transition-all duration-300 group-hover:brightness-110"
                      style={{
                        filter: `drop-shadow(0 0 10px ${language.color}40)`,
                      }}
                    />
                  </div>
                  <p className="font-mono-tech text-[11px] sm:text-xs text-neutral-300 font-medium text-center group-hover:text-white transition-colors truncate w-full px-1">
                    {language.name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollBlurFade>

        </div>
      </GridBackground>
    </section>
  );
};

export default LanguagesSection;
