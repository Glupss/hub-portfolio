"use client";

import { useState, useEffect } from "react";
import FlipCard from "@/components/FlipCard";
import ProjectModal from "@/components/ProjectModal";
import { KEY_APIFLASH } from "@/components/config";

const getScreenshot = (url) => {
  const apiKey = `${KEY_APIFLASH}`;
  return `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(
    url
  )}&width=1200&height=800&format=png&wait_until=page_loaded&delay=2&full_page=false`;
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCategories, setProjectCategories] = useState({});
  const [loading, setLoading] = useState(true);

  // Organisation manuelle par catégories
  const projectsByCategory = {
    "JavaScript Vanilla": [
      {
        title: "Guess my number",
        description:
          "Premier jeu en JS pour se familiariser gentillement avec la programmation",
        link: "https://guess-my-number-arthur.netlify.app/",
        usesAPI: false,
      },
      {
        title: "Pig game",
        description: "Petit jeu qui pousse un peu plus la manipulation de DOM",
        link: "https://pig-game-arthur.netlify.app/",
        usesAPI: false,
      },
      {
        title: "Bankist",
        description: "Petite application bancaire pour jouer avec les arrays",
        link: "https://bankist-arthur.netlify.app/",
        usesAPI: false,
      },
      {
        title: "Landing page Bankist",
        description:
          "La landing page de Bankist où on pousse plus loin la DOM manipulation",
        link: "https://bankist-lp-arthur.netlify.app/",
        usesAPI: false,
      },
      {
        title: "Mapty",
        description:
          "Début avec les API, app pour pin des workouts sur une carte",
        link: "https://mapty-arthur.netlify.app/",
        usesAPI: true,
      },
      {
        title: "Forkify",
        description:
          "Application de recettes de cuisine avec recherche via API",
        link: "https://forkifyarthur.netlify.app/",
        usesAPI: true,
      },
    ],
    React: [
      // Ajoutez ici vos projets React
      {
        title: "Portfolio en React",
        description: "Portfolio de ce que j'ai fait jusqu'a présent",
        link: "https://portfolio-arthur-js.netlify.app/",
        usesAPI: false,
      },
    ],
    "Node.js / Backend": [
      // Ajoutez ici vos projets backend
      // {
      //   title: "API REST",
      //   description: "API REST avec Node.js et Express",
      //   link: "https://mon-api.herokuapp.com/",
      //   usesAPI: false,
      // },
    ],
    "Projets Full Stack": [
      // Ajoutez ici vos projets full stack
    ],
  };

  useEffect(() => {
    // Générer les screenshots pour tous les projets
    const categoriesWithImages = {};

    Object.entries(projectsByCategory).forEach(([category, projects]) => {
      if (projects.length > 0) {
        categoriesWithImages[category] = projects.map((project) => ({
          ...project,
          image: getScreenshot(project.link),
        }));
      }
    });

    setProjectCategories(categoriesWithImages);
    setLoading(false);
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      "JavaScript Vanilla": "🟨",
      React: "⚛️",
      "Node.js / Backend": "🟢",
      "Projets Full Stack": "🚀",
    };
    return icons[category] || "📁";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "JavaScript Vanilla": "from-yellow-400 to-orange-500",
      React: "from-blue-400 to-cyan-500",
      "Node.js / Backend": "from-green-400 to-emerald-500",
      "Projets Full Stack": "from-purple-400 to-pink-500",
    };
    return colors[category] || "from-gray-400 to-gray-600";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio de Développement
          </h1>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <span className="ml-4 text-lg">Chargement des projets...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Portfolio de Développement
        </h1>

        <p className="text-center text-gray-400 mb-16 text-lg">
          Mes projets organisés par technologies et compétences
        </p>

        {/* Sections par catégorie */}
        <div className="space-y-16">
          {Object.entries(projectCategories).map(([category, projects]) => (
            <section key={category} className="space-y-8">
              {/* En-tête de section */}
              <div className="text-center">
                <h2
                  className={`text-3xl font-bold bg-gradient-to-r ${getCategoryColor(
                    category
                  )} bg-clip-text text-transparent inline-flex items-center gap-3`}
                >
                  <span className="text-4xl">{getCategoryIcon(category)}</span>
                  {category}
                </h2>
                <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"></div>
                <p className="mt-4 text-gray-400">
                  {projects.length} projet{projects.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Grille des projets */}
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
                  {projects.map((project, index) => (
                    <div key={index} className="w-full flex justify-center">
                      <FlipCard
                        {...project}
                        onClick={() => setSelectedProject(project.link)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
                  <div className="text-6xl opacity-30 mb-4">🚧</div>
                  <p className="text-gray-400 text-lg">Projets à venir...</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Cette section sera bientôt remplie avec mes nouveaux projets
                    !
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Stats globales */}
        <div className="mt-20 pt-12 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {Object.entries(projectCategories).map(([category, projects]) => (
              <div
                key={category}
                className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700"
              >
                <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                <div className="text-2xl font-bold text-blue-400">
                  {projects.length}
                </div>
                <div className="text-sm text-gray-400">{category}</div>
              </div>
            ))}
          </div>
        </div>
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
