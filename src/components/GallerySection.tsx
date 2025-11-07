import React from 'react';
import {
  DraggableCardBody,
  DraggableCardContainer,
} from './ui/draggable-card';

const GallerySection: React.FC = () => {
  const items = [
    {
      title: "Memory 1",
      image: "/gallery/photo1.jpg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Memory 2",
      image: "/gallery/photo2.jpg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Memory 3",
      image: "/gallery/photo3.jpg",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Memory 4",
      image: "/gallery/photo4.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Memory 5",
      image: "/gallery/photo5.jpg",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "Memory 6",
      image: "/gallery/photo6.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Memory 7",
      image: "/gallery/photo7.jpg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
    {
      title: "Memory 8",
      image: "/gallery/photo8.jpg",
      className: "absolute top-36 left-[15%] rotate-[-3deg]",
    },
    {
      title: "Memory 9",
      image: "/gallery/photo9.jpg",
      className: "absolute top-16 right-[25%] rotate-[6deg]",
    },
    {
      title: "Memory 10",
      image: "/gallery/photo10.jpg",
      className: "absolute top-28 right-[15%] rotate-[-4deg]",
    },
    {
      title: "Memory 11",
      image: "/gallery/photo11.jpg",
      className: "absolute top-12 left-[35%] rotate-[3deg]",
    },
  ];

  return (
    <section id="gallery" className="relative bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gallery
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Drag, throw, and explore my memories
          </p>
        </div>

        <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
          <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
            Moments captured, memories preserved
          </p>
          {items.map((item, index) => (
            <DraggableCardBody key={index} className={item.className}>
              <img
                src={item.image}
                alt={item.title}
                className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-md"
              />
              <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </h3>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>
    </section>
  );
};

export default GallerySection;
