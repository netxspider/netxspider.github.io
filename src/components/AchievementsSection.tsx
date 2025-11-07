import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

interface Achievement {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  icon?: React.ReactNode;
  area: string;
}

const achievements: Achievement[] = [
  {
    title: "SIH 2025 Finalist",
    description: "Developing Krishika AI for Smart Farming - Leading innovation in agricultural technology",
    icon: <span className="text-4xl">🏆</span>,
    area: "md:col-span-2"
  },
  {
    title: "TCS CodeVita",
    description: "Global Rank in Season 12",
    metric: "6784",
    metricLabel: "Global Rank",
    area: "md:col-span-1"
  },
  {
    title: "CodeXtreme",
    description: "Top performer in competitive programming",
    metric: "Top 30",
    metricLabel: "National Ranking",
    icon: <span className="text-3xl">🥇</span>,
    area: "md:col-span-1"
  },
  {
    title: "Postman Student Expert",
    description: "Certified API development and testing expert",
    icon: (
      <div className="flex items-center gap-2">
        <span className="text-3xl">📮</span>
        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-semibold border border-orange-500/30">Expert</span>
      </div>
    ),
    area: "md:col-span-1"
  },
  {
    title: "Programming Certifications",
    description: "C++ (Infosys) and C (Coding Tantra) - Strong foundation in core programming languages",
    icon: (
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/30">C++</span>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-500/30">C</span>
      </div>
    ),
    area: "md:col-span-2"
  },
  {
    title: "Leadership Fundamentals",
    description: "MOOC Certification from Skillera - Essential soft skills for team collaboration",
    icon: <span className="text-3xl">👔</span>,
    area: "md:col-span-1"
  },
  {
    title: "Zinnovatio 3.0",
    description: "Special Recognition at hackathon held at Chandigarh University",
    icon: <span className="text-3xl">⚡</span>,
    area: "md:col-span-1"
  },
];

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Milestones that reflect dedication, innovation, and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[14rem]">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`min-h-[12rem] ${achievement.area}`}
            >
              <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-5 bg-black/50 backdrop-blur-sm border border-white/5">
                  <div className="relative flex flex-1 flex-col justify-between gap-2">
                    {achievement.icon && (
                      <div className="w-fit">
                        {achievement.icon}
                      </div>
                    )}
                    
                    {achievement.metric && (
                      <div className="flex flex-col">
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                          {achievement.metric}
                        </div>
                        {achievement.metricLabel && (
                          <div className="text-xs text-white/60 mt-1">
                            {achievement.metricLabel}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="space-y-2 mt-auto">
                      <h3 className="font-sans text-lg md:text-xl font-semibold text-white">
                        {achievement.title}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-white/70 line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
