// src/components/common/ProjectCard.js
"use client";

import { motion } from "framer-motion";
import { getScreenshot } from "@/lib/utils";
import { card } from "@/lib/animations";
import { CATEGORY_STYLES } from "@/data/projects";
import { useProjectPreview } from "@/hooks/useProjectPreview";

export default function ProjectCard({ project, category }) {
  const image = project.link ? getScreenshot(project.link) : "";
  const { setPreviewProject, clearPreview } = useProjectPreview();

  const handleMouseEnter = () => {
    setPreviewProject({
      ...project,
      category,
      image,
      categoryStyle: CATEGORY_STYLES[category] || "bg-gray-500/50 text-white",
    });
  };

  const handleMouseLeave = () => {
    clearPreview();
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      variants={card}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm h-56 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/6 backdrop-blur-md group"
    >
      {/* background image */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundImage: image
            ? `linear-gradient(180deg, rgba(10,10,12,0.55), rgba(8,6,12,0.9)), url(${image})`
            : "linear-gradient(180deg, rgba(10,10,12,0.55), rgba(8,6,12,0.9))",
        }}
      />

      {/* accent glow */}
      <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-60 bg-gradient-to-r from-blue-400 to-purple-500/60 transition-all duration-300 group-hover:opacity-80" />

      {/* content */}
      <div className="relative z-10 flex flex-col h-full p-6 justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm transition-all duration-300 group-hover:scale-105 ${
                CATEGORY_STYLES[category] || "bg-gray-500/50 text-white"
              }`}
            >
              {category}
            </div>
            <h3 className="text-white font-bold text-lg drop-shadow-lg transition-all duration-300 group-hover:text-blue-200">
              {project.title}
            </h3>
          </div>
          <p className="mt-3 text-sm text-white font-medium drop-shadow-md leading-snug line-clamp-3 transition-all duration-300 group-hover:text-white/90">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-white/80 font-semibold transition-all duration-300 group-hover:text-white">
            Preview dans Hero →
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-white transition-all duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Indication visuelle du hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
      </div>
    </motion.a>
  );
}
