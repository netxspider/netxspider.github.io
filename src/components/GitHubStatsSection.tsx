import React from 'react';
import { World } from './ui/globe';
import { motion } from 'framer-motion';

const GitHubStatsSection: React.FC = () => {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#1a1a2e",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#1a1a2e",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  
  // Sample arcs for global connections
  const sampleArcs = [
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.3,
      color: colors[0],
    },
    {
      order: 2,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.2,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.25,
      color: colors[2],
    },
  ];

  return (
    <section id="github" className="relative min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GitHub Activity
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Contributing to open source and building innovative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-[600px]"
          >
            <div className="absolute w-full h-full">
              <World data={sampleArcs} globeConfig={globeConfig} />
            </div>
          </motion.div>

          {/* Right side - GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">@netxspider</h3>
              <p className="text-white/70">
                Check out my repositories and contributions on GitHub
              </p>
            </div>

            {/* GitHub Stats Cards */}
            <div className="space-y-4">
              {/* GitHub Stats */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=netxspider&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=ffffff&icon_color=06b6d4"
                  alt="GitHub Stats"
                  className="w-full"
                />
              </div>

              {/* GitHub Streak */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <img
                  src="https://github-readme-streak-stats.herokuapp.com/?user=netxspider&theme=tokyonight&hide_border=true&background=00000000&ring=06b6d4&fire=06b6d4&currStreakLabel=ffffff"
                  alt="GitHub Streak"
                  className="w-full"
                />
              </div>

              {/* Top Languages */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=netxspider&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=ffffff&text_color=ffffff"
                  alt="Top Languages"
                  className="w-full"
                />
              </div>
            </div>

            {/* GitHub Button */}
            <a
              href="https://github.com/netxspider"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Visit My GitHub →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStatsSection;
