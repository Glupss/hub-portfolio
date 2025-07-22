"use client";

import { useState, useEffect } from "react";
import FlipCard from "@/components/FlipCard";
import ProjectModal from "@/components/ProjectModal";
import { KEY } from "@/components/config";

const getScreenshot = (url) => {
  // ApiFlash - 100 screenshots gratuits/mois
  const apiKey = `${KEY}`; // Inscrivez-vous sur apiflash.com
  return `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(
    url
  )}&width=1200&height=800&format=png&wait_until=page_loaded&delay=2&full_page=true`;
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsWithImages, setProjectsWithImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const projects = [
    {
      title: "Guess my number",
      description:
        "Premier jeu en JS pour se familiariser gentillement avec la programation",
      link: "https://guess-my-number-arthur.netlify.app/",
      usesAPI: false, // Pas d'API externe
    },
    {
      title: "Pig game",
      description: "Petit jeu qui pousse un peu plus la manipulation de DOM",
      link: "https://pig-game-arthur.netlify.app/",
      usesAPI: false, // Pas d'API externe
    },
    {
      title: "Bankist",
      description: "Petite application bancaire pour jouer avec les arrays",
      link: "https://bankist-arthur.netlify.app/",
      usesAPI: false, // Pas d'API externe
    },
    {
      title: "Landing page Bankist",
      description:
        "La landing page de Bankist ou on pousse plus loin la DOM manipulatrion",
      link: "https://bankist-lp-arthur.netlify.app/",
      usesAPI: false, // Pas d'API externe
    },
    {
      title: "Mapty",
      description:
        "Début avec les API, app pour pin des workouts sur une carte",
      link: "https://mapty-arthur.netlify.app/",
      usesAPI: true, // Utilise l'API de géolocalisation
    },
    {
      title: "Forkify",
      description: "Recette de cuisine avec recherche sur une API",
      link: "https://forkifyarthur.netlify.app/",
      usesAPI: true, // Utilise une API de recettes
    },
  ];

  useEffect(() => {
    // Avec ApiFlash, l'URL de l'image est directe
    const projectsWithScreenshots = projects.map((project) => ({
      ...project,
      image: getScreenshot(project.link),
    }));

    setProjectsWithImages(projectsWithScreenshots);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Mes Projets JS</h1>
        <p>Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Mes Projets JS</h1>

      <div className="flex flex-wrap gap-8">
        {projectsWithImages.map((proj, i) => (
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
