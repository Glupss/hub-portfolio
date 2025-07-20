"use client";

import { useState } from "react";
import FlipCard from "@/components/FlipCard";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Forkify",
      description: "Recette de cuisine avec recherche sur une API",
      image: "/images/calculatrice.png",
      link: "https://forkifyarthur.netlify.app/",
    },
    {
      title: "Jeu Mémoire",
      description: "Petit jeu mémoire avec React.",
      image: "/images/memoire.png",
      link: "https://ton-projet2.netlify.app",
    },
    {
      title: "Jeu Mémoire",
      description: "Petit jeu mémoire avec React.",
      image: "/images/memoire.png",
      link: "https://ton-projet2.netlify.app",
    },
    {
      title: "Jeu Mémoire",
      description: "Petit jeu mémoire avec React.",
      image: "/images/memoire.png",
      link: "https://ton-projet2.netlify.app",
    },
    {
      title: "Jeu Mémoire",
      description: "Petit jeu mémoire avec React.",
      image: "/images/memoire.png",
      link: "https://ton-projet2.netlify.app",
    },
    {
      title: "Jeu Mémoire",
      description: "Petit jeu mémoire avec React.",
      image: "/images/memoire.png",
      link: "https://ton-projet2.netlify.app",
    },
    // Ajoute d'autres projets ici
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Mes Projets JS</h1>
      <div className="flex flex-wrap gap-8">
        {projects.map((proj, i) => (
          <FlipCard
            key={i}
            {...proj}
            onClick={() => setSelectedProject(proj.link)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          projectUrl={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
