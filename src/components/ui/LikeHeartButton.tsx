import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { playTactileAudio, playHoverSound } from '../../utils/soundEffects';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const STORAGE_KEY = 'netxspider_site_likes_count';
const DEVICE_LIKED_KEY = 'netxspider_liked_device';
const DEVICE_ID_KEY = 'netxspider_device_id';
const DEFAULT_INITIAL_LIKES = 0;

// Persistent unique device identifier (indefinite per device)
const getDeviceId = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'device_fallback';
  }
};

export const LikeHeartButton: React.FC = () => {
  const { t } = useLanguage();
  const [likes, setLikes] = useState<number>(() => {
    if (typeof window === 'undefined') return DEFAULT_INITIAL_LIKES;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_INITIAL_LIKES;
  });

  const [isLiked, setIsLiked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return (
        localStorage.getItem(DEVICE_LIKED_KEY) === 'true' ||
        sessionStorage.getItem('netxspider_liked_session') === 'true'
      );
    } catch {
      return false;
    }
  });

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showPlusOne, setShowPlusOne] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('light');
  });

  const nextParticleId = useRef(0);
  const plusOneTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  // Sync theme
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

  // Synchronize visibility with navbar controls component (hides when scrolling down, reveals when scrolling up or near top)
  useEffect(() => {
    // 1. Direct custom event from Navbar controls
    const handleControlsVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ isVisible: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isVisible === 'boolean') {
        setIsVisible(customEvent.detail.isVisible);
      }
    };

    // 2. Local scroll direction detector matching Navbar
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      const diff = currentScrollY - prevScrollY;

      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (diff > 8 && currentScrollY > 80) {
        setIsVisible(false);
      } else if (diff < -6) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('controls-visibility', handleControlsVisibility);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('controls-visibility', handleControlsVisibility);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Live real-time sync with global likes endpoint across all users
  useEffect(() => {
    let isMounted = true;

    const fetchLiveLikes = () => {
      fetch('/api/likes', {
        headers: { 'Cache-Control': 'no-cache' },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Not available');
        })
        .then((data) => {
          if (isMounted && data && typeof data.count === 'number' && data.count >= DEFAULT_INITIAL_LIKES) {
            setLikes(data.count);
            localStorage.setItem(STORAGE_KEY, data.count.toString());
          }
        })
        .catch(() => {
          // Fallback to local storage
        });
    };

    // 1. Initial fetch on mount
    fetchLiveLikes();

    // 2. Live poll every 10 seconds for real-time count updates from other users
    const pollInterval = setInterval(fetchLiveLikes, 10000);

    // 3. Immediately re-fetch whenever user switches back to this tab
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchLiveLikes();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', fetchLiveLikes);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', fetchLiveLikes);
    };
  }, []);

  const handleLike = () => {
    // Check if this device has already liked
    const alreadyLiked = (() => {
      try {
        return (
          localStorage.getItem(DEVICE_LIKED_KEY) === 'true' ||
          sessionStorage.getItem('netxspider_liked_session') === 'true'
        );
      } catch {
        return false;
      }
    })();

    if (alreadyLiked || isLiked) {
      // User is allowed to like only once per device
      playTactileAudio('tick');
      return;
    }

    // Set persistent device flag indefinitely
    try {
      localStorage.setItem(DEVICE_LIKED_KEY, 'true');
      sessionStorage.setItem('netxspider_liked_session', 'true');
    } catch {
      // ignore
    }

    playTactileAudio('switch');
    setIsLiked(true);

    const newCount = likes + 1;
    setLikes(newCount);
    try {
      localStorage.setItem(STORAGE_KEY, newCount.toString());
    } catch {
      // ignore
    }

    // Ping global likes API with persistent device identifier
    const deviceId = getDeviceId();
    fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('POST failed');
      })
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setLikes(data.count);
          localStorage.setItem(STORAGE_KEY, data.count.toString());
        }
      })
      .catch(() => {});

    // Trigger "+1" float indicator
    setShowPlusOne(true);
    if (plusOneTimerRef.current) clearTimeout(plusOneTimerRef.current);
    plusOneTimerRef.current = setTimeout(() => {
      setShowPlusOne(false);
    }, 1100);

    // Spawn 7 energetic monochrome particles
    const newParticles: Particle[] = Array.from({ length: 7 }).map(() => ({
      id: nextParticleId.current++,
      x: (Math.random() - 0.5) * 60,
      y: -(Math.random() * 45 + 30),
      size: Math.random() * 6 + 10,
      rotation: (Math.random() - 0.5) * 60,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1000);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 50,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 select-none ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.16 }}
            className={`absolute bottom-full right-0 mb-2.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shadow-xl border pointer-events-none ${
              isDarkMode
                ? 'bg-neutral-950/95 border-white/15 text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
                : 'bg-white/95 border-neutral-300 text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono-tech">
              <span className={isDarkMode ? 'text-white' : 'text-black'}>♥</span>
              <span>{isLiked ? t.likes.liked : t.likes.tooltip}</span>
            </div>
            {/* Tooltip beak */}
            <div
              className={`absolute top-full right-5 w-2 h-2 rotate-45 border-r border-b ${
                isDarkMode ? 'bg-neutral-950 border-white/15' : 'bg-white border-neutral-300'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating "+1" Badge (Strictly Monochrome) */}
      <AnimatePresence>
        {showPlusOne && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, y: -42, scale: 1.15 }}
            exit={{ opacity: 0, y: -65, scale: 0.8 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className={`absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none font-mono-tech font-bold text-xs ${
              isDarkMode
                ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                : 'text-black drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]'
            }`}
          >
            +1
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monochrome Particles Bursting */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.3 }}
          animate={{
            opacity: 0,
            x: p.x,
            y: p.y,
            scale: 1,
            rotate: p.rotation,
          }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className={`absolute top-2 left-3 pointer-events-none ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          style={{ fontSize: p.size }}
        >
          ♥
        </motion.div>
      ))}

      {/* Main Glassmorphic Monochrome Button */}
      <motion.button
        onClick={handleLike}
        onMouseEnter={() => {
          setIsHovered(true);
          playHoverSound();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Like portfolio"
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-2xl border transition-all duration-200 cursor-pointer shadow-lg ${
          isDarkMode
            ? 'bg-neutral-950/80 border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-white/40'
            : 'bg-white/90 border-neutral-300 text-neutral-900 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-black/50'
        }`}
      >
        {/* Subtle Monochrome Ambient Backlight Glow */}
        <div
          className={`absolute -inset-0.5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
            isDarkMode ? 'bg-white/15' : 'bg-black/10'
          } ${isLiked ? 'opacity-50' : ''}`}
        />

        {/* Heart Icon with Spring Reaction (Strictly Black & White) */}
        <motion.div
          animate={
            isLiked
              ? {
                  scale: [1, 1.45, 0.85, 1.15, 1],
                  rotate: [0, -10, 10, -5, 0],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.45 }}
          className="relative z-10 flex items-center justify-center"
        >
          <svg
            className={`w-5 h-5 transition-colors duration-200 ${
              isLiked
                ? isDarkMode
                  ? 'text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                  : 'text-black fill-black drop-shadow-[0_0_6px_rgba(0,0,0,0.25)]'
                : isDarkMode
                ? 'text-neutral-400 group-hover:text-white'
                : 'text-neutral-500 group-hover:text-black'
            }`}
            viewBox="0 0 24 24"
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isLiked ? 0 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </motion.div>

        {/* Like Count & Label */}
        <div className="relative z-10 flex items-center gap-1.5">
          <motion.span
            key={likes}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`font-mono-tech text-xs font-bold tracking-wider ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {likes.toLocaleString()}
          </motion.span>
          <span
            className={`text-[10px] uppercase font-mono-tech tracking-wider hidden sm:inline ${
              isDarkMode ? 'text-white/40 group-hover:text-white/70' : 'text-neutral-400 group-hover:text-neutral-700'
            }`}
          >
            {t.likes.likeCount}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default LikeHeartButton;
