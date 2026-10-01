import React, { useState, useEffect } from 'react';
import ScrollBlurFade from './ui/ScrollBlurFade';
import ParallaxMotion from './ui/ParallaxMotion';
import { playHoverSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('light');
  });

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isDark === 'boolean') {
        setIsDarkMode(customEvent.detail.isDark);
      } else {
        setIsDarkMode(!document.documentElement.classList.contains('light'));
      }
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navPages = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.stack, href: '#stack' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.connect, href: '#connect' },
    { name: t.nav.resume, href: '/ArnavRajCV.pdf', download: true },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/netxspider' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/arnav-raj-41a5a9320/' },
    { name: 'Instagram', href: 'https://www.instagram.com/unreal.arnav/' },
  ];

  const expertiseLinks = [
    { name: 'AI & Neural Systems' },
    { name: 'Full-Stack Platforms' },
    { name: 'Computer Vision' },
    { name: 'Autonomous Agents' },
  ];

  const contactLinks = [
    { name: 'netxspider@gmail.com', href: 'mailto:netxspider@gmail.com' },
    { name: t.footer.statusOpen || 'Status: Open to Roles' },
    { name: t.connect.responseVal ? `Response: ${t.connect.responseVal}` : 'Response: 24–48h' },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden pt-12 sm:pt-16">
      {/* Top subtle horizontal divider line spanning across */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="w-full h-px bg-white/10 mb-12 sm:mb-16" />

        {/* Top/Middle Grid: Brand on Left, Navigation/Social Columns on Right */}
        <ScrollBlurFade direction="up" distance={30} blur={10}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Brand Info (Matching [A] DevStudio in image) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-display font-extrabold text-base shadow-[0_0_15px_rgba(255,255,255,0.2)] select-none">
                  A
                </div>
                <span className="font-sans-clean font-bold text-lg tracking-tight text-white">
                  Arnav Raj
                </span>
              </div>

            <p className="mt-4 text-xs sm:text-sm font-sans-clean text-neutral-400">
              © copyright Arnav Raj {currentYear}. {t.footer.rights}
            </p>
          </div>

          {/* Right Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            {/* Column 1: Pages */}
            <div>
              <h4 className="font-sans-clean font-semibold text-sm text-white mb-3.5 tracking-normal">
                {t.footer.navTitle}
              </h4>
              <ul className="space-y-2.5">
                {navPages.map((page) => (
                  <li key={page.name}>
                    {page.download ? (
                      <a
                        href={page.href}
                        download
                        onMouseEnter={() => playHoverSound()}
                        className="cursor-target font-sans-clean text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-150 inline-block"
                      >
                        {page.name}
                      </a>
                    ) : (
                      <a
                        href={page.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(page.href);
                        }}
                        onMouseEnter={() => playHoverSound()}
                        className="cursor-target font-sans-clean text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-150 inline-block"
                      >
                        {page.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Socials */}
            <div>
              <h4 className="font-sans-clean font-semibold text-sm text-white mb-3.5 tracking-normal">
                Socials
              </h4>
              <ul className="space-y-2.5">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playHoverSound()}
                      className="cursor-target font-sans-clean text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-150 inline-block"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Expertise */}
            <div>
              <h4 className="font-sans-clean font-semibold text-sm text-white mb-3.5 tracking-normal">
                {t.footer.expertiseTitle}
              </h4>
              <ul className="space-y-2.5">
                {expertiseLinks.map((item) => (
                  <li key={item.name}>
                    <span className="font-sans-clean text-xs sm:text-sm text-neutral-400 block">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Status / Contact */}
            <div>
              <h4 className="font-sans-clean font-semibold text-sm text-white mb-3.5 tracking-normal">
                {t.footer.networkTitle}
              </h4>
              <ul className="space-y-2.5">
                {contactLinks.map((item) => (
                  <li key={item.name}>
                    {item.href ? (
                      <a
                        href={item.href}
                        onMouseEnter={() => playHoverSound()}
                        className="cursor-target font-sans-clean text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-150 block truncate"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="font-sans-clean text-xs sm:text-sm text-neutral-400 block truncate">
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollBlurFade>
    </div>

      {/* Giant Architectural Watermark at the Bottom: netxspider with Smooth Scroll Parallax */}
      <ParallaxMotion offset={35} className="w-full overflow-hidden select-none pointer-events-none mt-16 sm:mt-24 md:mt-32 -mb-2 sm:-mb-4 md:-mb-8 flex justify-center items-end">
        <h2 className={`text-[17vw] font-sans-clean font-black tracking-tighter ${isDarkMode ? 'text-white/[0.08]' : 'text-black/[0.08]'} leading-[0.8] text-center whitespace-nowrap transition-colors duration-200`}>
          netxspider
        </h2>
      </ParallaxMotion>
    </footer>
  );
};

export default Footer;
