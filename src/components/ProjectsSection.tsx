import React from 'react';
import { CardSpotlight } from './ui/card-spotlight';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  color: string;
}

const projects: Project[] = [
  {
    name: "Lullaby - Your Sleep Companion",
    description: "A holistic sleep companion that turns bedtime into healing time. It integrates ultra-realistic voice synthesis, voice cloning, and multilingual support for immersive bedtime stories (ElevenLabs), conversational AI for finding content and answering sleep wellness questions (Dappier), and secure video conversations with AI therapists (Tavus).",
    technologies: ["NextJs", "ElevenLabs", "RevenueCat", "Dappier", "Tavus", "Gemini", "Firebase"],
    color: "rgba(139, 92, 246, 0.3)" // Purple
  },
  {
    name: "Annadata – AI-Powered Smart Farming System",
    description: "An AI-powered smart farming application integrating real-time IoT sensor data, weather APIs, and machine learning to deliver personalized crop recommendations, disease detection, and agricultural insights. It features a multilingual voice-enabled ChatBot with conversation memory and dynamic dashboard analytics.",
    technologies: ["React Native", "Python Flask", "PyTorch", "Google Gemini AI", "MongoDB", "Node.js", "Express.js"],
    color: "rgba(34, 197, 94, 0.3)" // Green
  },
  {
    name: "Planner App",
    description: "Your ultimate digital planner, customizable with widgets and intuitive screen navigation. It enables agencies to customize the dashboard with company and client logos.",
    technologies: ["React"],
    color: "rgba(59, 130, 246, 0.3)" // Blue
  },
  {
    name: "Kanban App",
    description: "A flexible Kanban board to organize and prioritize your workload. It uses drag-and-drop functionality to track progress, simplify workflow, and boost productivity.",
    technologies: ["React", "Firebase"],
    color: "rgba(236, 72, 153, 0.3)" // Pink
  },
  {
    name: "AI File Manager",
    description: "Built as a data-driven file manager capable of categorizing unstructured data and performing search retrieval using ML embeddings.",
    technologies: ["React", "Node.js", "Python Flask"],
    color: "rgba(251, 146, 60, 0.3)" // Orange
  },
  {
    name: "Movie Exploration Mobile App",
    description: "An application to explore movies in different categories. It integrates trailers from YouTube and uses a GraphQL API and database integration.",
    technologies: ["React Native", "Hygraph", "Expo"],
    color: "rgba(244, 63, 94, 0.3)" // Rose
  },
  {
    name: "Boomm Recommendation System",
    description: "A hybrid content-based + collaborative filtering recommender developed for social media posts. Applied cosine similarity, TF-IDF vectorization, and user profiling for high-accuracy results.",
    technologies: ["Python", "Pandas", "Scikit-Learn"],
    color: "rgba(168, 85, 247, 0.3)" // Violet
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A showcase of my work spanning AI/ML, full-stack development, and mobile applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <CardSpotlight
              key={index}
              spotlightColor={project.color}
              className="h-full"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.name}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-white/10 text-white/90 rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
