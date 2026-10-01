import React, { useEffect, useRef } from 'react';

const CIRCLE_COUNT = 20;

// Dark Mode Palette: White tip down to dark charcoal
const DARK_COLORS = [
  '#ffffff',
  '#f3f3f3',
  '#e7e7e7',
  '#dbdbdb',
  '#cfcfcf',
  '#c3c3c3',
  '#b7b7b7',
  '#ababab',
  '#9f9f9f',
  '#939393',
  '#878787',
  '#7b7b7b',
  '#6f6f6f',
  '#636363',
  '#575757',
  '#4b4b4b',
  '#3f3f3f',
  '#333333',
  '#272727',
  '#1b1b1b',
];

// Light Mode Palette: Deep black tip down to light gray
const LIGHT_COLORS = [
  '#09090b',
  '#18181b',
  '#27272a',
  '#3f3f46',
  '#52525b',
  '#71717a',
  '#84848d',
  '#9797a1',
  '#a1a1aa',
  '#b5b5bc',
  '#c4c4cb',
  '#d4d4d8',
  '#dddddf',
  '#e4e4e7',
  '#ececed',
  '#f0f0f2',
  '#f4f4f5',
  '#f8f8fa',
  '#fafafa',
  '#fdfdfd',
];

interface CircleObject {
  el: HTMLDivElement;
  x: number;
  y: number;
}

const TrailingCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const circleElements = container.querySelectorAll<HTMLDivElement>('.circle');
    if (!circleElements.length) return;

    const circles: CircleObject[] = [];
    circleElements.forEach((el) => {
      circles.push({
        el,
        x: -100,
        y: -100,
      });
    });

    const applyThemeColors = () => {
      const isLight = document.documentElement.classList.contains('light');
      const palette = isLight ? LIGHT_COLORS : DARK_COLORS;
      circleElements.forEach((el, index) => {
        el.style.backgroundColor = palette[index % palette.length];
        el.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.2)';
        el.style.boxShadow = isLight
          ? '0 0 6px rgba(0, 0, 0, 0.15)'
          : '0 0 8px rgba(255, 255, 255, 0.15)';
      });
    };

    applyThemeColors();

    // Listen for theme toggle events & class mutations on <html>
    const observer = new MutationObserver(applyThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    window.addEventListener('theme-change', applyThemeColors);

    const coords = { x: -100, y: -100 };
    let hasMoved = false;
    let isVisible = false;
    let animId: number;

    const isExcludedArea = (clientX: number, clientY: number): boolean => {
      // 1. Check topmost element under cursor
      const target = document.elementFromPoint(clientX, clientY);
      if (
        target &&
        target.closest('#stack, [data-no-cursor="true"], #hero-image-area, #id-card-area, .hover-mask-reveal')
      ) {
        return true;
      }

      // 2. Fallback check: bounding boxes of excluded sections
      const excludedElements = document.querySelectorAll(
        '#stack, [data-no-cursor="true"], #hero-image-area, #id-card-area, .hover-mask-reveal'
      );
      for (let i = 0; i < excludedElements.length; i++) {
        const rect = excludedElements[i].getBoundingClientRect();
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          return true;
        }
      }

      return false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        for (let i = 0; i < circles.length; i++) {
          circles[i].x = e.clientX;
          circles[i].y = e.clientY;
          circles[i].el.style.left = `${e.clientX - 12}px`;
          circles[i].el.style.top = `${e.clientY - 12}px`;
        }
      }

      const excluded = isExcludedArea(e.clientX, e.clientY);
      if (excluded) {
        isVisible = false;
        container.style.opacity = '0';
      } else {
        isVisible = true;
        container.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      container.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    function animateCircles() {
      if (isVisible) {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
          circle.el.style.left = x - 12 + 'px';
          circle.el.style.top = y - 12 + 'px';

          const scale = (circles.length - index) / circles.length;
          circle.el.style.transform = `scale(${scale})`;
          (circle.el.style as unknown as { scale: number }).scale = scale;

          circle.x = x;
          circle.y = y;

          const nextCircle = circles[index + 1] || circles[0];
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        });
      }

      animId = requestAnimationFrame(animateCircles);
    }

    animId = requestAnimationFrame(animateCircles);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('theme-change', applyThemeColors);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[99999999] overflow-hidden transition-opacity duration-150"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {Array.from({ length: CIRCLE_COUNT }).map((_, index) => (
        <div
          key={index}
          className="circle pointer-events-none fixed top-0 left-0 w-6 h-6 rounded-full border will-change-transform"
        />
      ))}
    </div>
  );
};

export default TrailingCursor;
