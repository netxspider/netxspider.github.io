import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelCard from './ui/PixelCard';
import ScrollBlurFade from './ui/ScrollBlurFade';
import ParallaxMotion from './ui/ParallaxMotion';
import { playFormHoverSound, playHoverSound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

const GetInTouchSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('netxspider@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Project Inquiry / Collaboration',
      message: formData.message,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/netxspider@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      // Fallback: open mail client directly so message is never lost
      setSubmitStatus('error');
      const mailtoUrl = `mailto:netxspider@gmail.com?subject=${encodeURIComponent(
        payload.subject
      )}&body=${encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      handle: 'netxspider',
      url: 'https://github.com/netxspider',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      handle: 'arnav-raj-41a5a9320',
      url: 'https://www.linkedin.com/in/arnav-raj-41a5a9320/',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@unreal.arnav',
      url: 'https://www.instagram.com/unreal.arnav/',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="connect"
      className="relative min-h-screen bg-black text-white py-24 md:py-32 px-4 md:px-8 border-t border-white/10 overflow-hidden"
    >
      <span id="contact" className="sr-only" />

      {/* Subtle architectural background grid & monochrome ambient glow with parallax */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <ParallaxMotion offset={55} className="absolute top-1/4 -right-32 pointer-events-none">
        <div className="w-96 h-96 bg-white/[0.025] rounded-full blur-[140px]" />
      </ParallaxMotion>
      <ParallaxMotion offset={-55} className="absolute bottom-1/4 -left-32 pointer-events-none">
        <div className="w-96 h-96 bg-white/[0.025] rounded-full blur-[140px]" />
      </ParallaxMotion>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Section Header Heading: Animated Blur Fade-In */}
        <ScrollBlurFade direction="up" distance={30} blur={10}>
          <div className="flex items-center gap-3 sm:gap-4 mb-10 md:mb-14">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-none">
              {t.connect.heading}
            </h2>
            <span className="h-px bg-white/10 flex-1 ml-4" />
          </div>
        </ScrollBlurFade>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDE: Narrative, Info Cards, Socials & Resume */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-6">
            <ScrollBlurFade direction="right" distance={35} delay={0.1}>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  {t.connect.subheading}
                </h3>

                {/* Status Pill */}
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mt-4">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                  <span className="text-xs font-mono-tech text-neutral-300 tracking-wider">
                    {t.connect.status}
                  </span>
                </div>
              </div>
            </ScrollBlurFade>

            {/* Direct Email Card with One-Click Copy */}
            <div className="email-dispatch-card relative rounded-2xl border border-white/15 bg-neutral-950/70 backdrop-blur-xl p-4 sm:p-5 shadow-xl overflow-hidden">
              <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500 mb-1.5">
                {t.connect.emailDispatch}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono-tech text-sm sm:text-base text-white tracking-wide select-all">
                  netxspider@gmail.com
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => playHoverSound()}
                    className="cursor-target px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-mono-tech text-neutral-200 transition-all flex items-center gap-1.5 active:scale-95"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t.connect.copiedBtn}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{t.connect.copyBtn}</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:netxspider@gmail.com"
                    onMouseEnter={() => playHoverSound()}
                    className="cursor-target px-3 py-1.5 rounded-lg border border-white/20 bg-white text-black font-semibold hover:bg-neutral-200 text-xs font-mono-tech transition-all flex items-center gap-1 active:scale-95"
                  >
                    <span>{t.connect.mailBtn}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Meta Details: Location & Turnaround */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500">
                  {t.connect.locationTitle}
                </div>
                <div className="text-sm font-mono-tech text-white mt-0.5">
                  {t.connect.locationVal}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500">
                  {t.connect.responseTitle}
                </div>
                <div className="text-sm font-mono-tech text-white mt-0.5">
                  {t.connect.responseVal}
                </div>
              </div>
            </div>

            {/* Social Network Links as Buttons */}
            <div>
              <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500 mb-2.5">
                {'// Social Profiles'}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHoverSound()}
                    className="cursor-target group flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 text-white transition-all duration-200 active:scale-95"
                  >
                    <span className="text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all flex-shrink-0">
                      {link.icon}
                    </span>
                    <span className="font-mono-tech text-xs tracking-wider">
                      {link.name}
                    </span>
                    <svg
                      className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Download CV Link */}
            <div>
              <a
                href="/ArnavRajCV.pdf"
                download
                onMouseEnter={() => playHoverSound()}
                className="cursor-target w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-2.5 px-5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono-tech text-xs tracking-wider transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{t.connect.downloadCvBtn}</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Direct Message Email Form (Hover animation is strictly behind card contents) */}
          <div className="lg:col-span-6 xl:col-span-5 lg:ml-auto w-full max-w-lg">
            <ScrollBlurFade direction="left" distance={35} delay={0.2}>
              <PixelCard
              variant="monochrome"
              gap={9}
              speed={32}
              colors="#ffffff,#e5e5e5,#a3a3a3,#525252"
              onMouseEnter={() => playFormHoverSound()}
              className="mail-form-card w-full !h-auto !aspect-auto relative rounded-2xl sm:rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-2xl p-4 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.7)]"
            >
              {/* Frosted glass top sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none z-0" />

              <div className="relative z-20 w-full">
                <div className="mb-4 sm:mb-5">
                  <div className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 mb-1">
                    {t.connect.formTag}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {t.connect.formTitle}
                  </h3>
                  <p className="font-mono-tech text-xs text-neutral-400 mt-1">
                    {t.connect.formDesc}
                  </p>
                </div>

                {/* Submission Success Banner */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-3.5 rounded-xl border border-white/20 bg-neutral-900/90 backdrop-blur-md flex items-start gap-3 relative z-30"
                    >
                      <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="text-xs font-mono-tech font-bold text-white uppercase tracking-wider">
                          {t.connect.successTitle}
                        </div>
                        <div className="text-xs font-mono-tech text-neutral-300 mt-0.5">
                          {t.connect.successDesc}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Inputs (Solid semi-opaque backgrounds so pixel hover animation stays behind) */}
                <form onSubmit={handleSubmit} className="space-y-3.5 relative z-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300 mb-1">
                        {t.connect.nameLabel}
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.connect.namePlaceholder}
                        className="cursor-target w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white text-base sm:text-xs font-mono-tech placeholder:text-neutral-500 focus:border-white focus:bg-neutral-900 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300 mb-1">
                        {t.connect.emailLabel}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.connect.emailPlaceholder}
                        className="cursor-target w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white text-base sm:text-xs font-mono-tech placeholder:text-neutral-500 focus:border-white focus:bg-neutral-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300 mb-1">
                      {t.connect.subjectLabel}
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t.connect.subjectPlaceholder}
                      className="cursor-target w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white text-base sm:text-xs font-mono-tech placeholder:text-neutral-500 focus:border-white focus:bg-neutral-900 outline-none transition-all"
                    />
                  </div>

                  {/* Message Body */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300 mb-1">
                      {t.connect.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.connect.messagePlaceholder}
                      className="cursor-target w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white text-base sm:text-xs font-mono-tech placeholder:text-neutral-500 focus:border-white focus:bg-neutral-900 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => playHoverSound()}
                      className="cursor-target w-full py-3 px-5 rounded-xl bg-white hover:bg-neutral-200 disabled:opacity-50 text-black font-mono-tech font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>{t.connect.sendingBtn}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.connect.sendBtn}</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </PixelCard>
            </ScrollBlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
