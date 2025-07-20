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
      image: "/images/forkify.png",
      link: "https://forkifyarthur.netlify.app/",
    },
    {
      title: "Jeu Mémoire",
      description: "Petit jeu mémoire avec React.",
      image: "/images/forkify.png", // Changez le nom si nécessaire
      link: "https://ton-projet2.netlify.app",
    },
    {
      title: "Projet 3",
      description: "Description du projet 3.",
      image: "/images/forkify.png",
      link: "https://ton-projet3.netlify.app",
    },
    {
      title: "Projet 4",
      description: "Description du projet 4.",
      image: "/images/forkify.png",
      link: "https://ton-projet4.netlify.app",
    },
    {
      title: "Projet 5",
      description: "Description du projet 5.",
      image: "/images/forkify.png",
      link: "https://ton-projet5.netlify.app",
    },
    {
      title: "Projet 6",
      description: "Description du projet 6.",
      image: "/images/forkify.png",
      link: "https://ton-projet6.netlify.app",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Mes Projets JS</h1>

      {/* Test d'image directe
      <div className="mb-4">
        <p>Test image directe:</p>
        <img
          src="/images/forkify.png"
          alt="test"
          className="w-32 h-32 border border-red-500"
        />
      </div> */}

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
