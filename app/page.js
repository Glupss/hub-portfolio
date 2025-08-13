"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KEY_APIFLASH } from "@/components/config";

// ----------------
// Small Typewriter (no dep)
// ----------------
function Typewriter({ texts = [], speed = 80, pause = 1500, className = "" }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    if (index >= texts.length) return;
    const timeout = setTimeout(
      () => {
        if (forward) {
          if (subIndex < texts[index].length) {
            setSubIndex((s) => s + 1);
          } else {
            setForward(false);
            setTimeout(() => setForward(false), 200);
          }
        } else {
          if (subIndex > 0) {
            setSubIndex((s) => s - 1);
          } else {
            setForward(true);
            setIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      forward ? speed : 30
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, forward, texts, speed]);

  return (
    <span className={className}>
      {texts[index].substring(0, subIndex)}
      <span className="inline-block w-[10px] ml-1 animate-pulse">▌</span>
    </span>
  );
}

// ----------------
// Screenshot helper (uses your config key)
// ----------------
const getScreenshot = (url) => {
  const apiKey = KEY_APIFLASH || process.env.NEXT_PUBLIC_APIFLASH;
  if (!apiKey) return "";
  return `https://api.apiflash.com/v1/urltoimage?access_key=${apiKey}&url=${encodeURIComponent(
    url
  )}&width=1200&height=800&format=png&wait_until=page_loaded&delay=1&full_page=false`;
};

// ----------------
// Sample projects (kept from your data but can be replaced by your data source)
// ----------------
const PROJECTS_BY_CATEGORY = {
  JavaScript: [
    {
      title: "Guess my number",
      description:
        "Premier jeu en JS pour se familiariser avec la logique et le DOM.",
      link: "https://guess-my-number-arthur.netlify.app/",
      usesAPI: false,
    },
    {
      title: "Pig game",
      description: "Petit jeu pour maîtriser le DOM et la logique d'état.",
      link: "https://pig-game-arthur.netlify.app/",
      usesAPI: false,
    },
    {
      title: "Mapty",
      description:
        "App qui utilise des APIs et geolocation pour tracker des workouts.",
      link: "https://mapty-arthur.netlify.app/",
      usesAPI: true,
    },
  ],
  React: [
    {
      title: "Portfolio React",
      description: "La version React de mon portfolio (travail en cours).",
      link: "https://portfolio-arthur-js.netlify.app/",
      usesAPI: false,
    },
  ],
  "Full Stack": [],
};

// ----------------
// Animations
// ----------------
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const card = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ----------------
// Card component
// ----------------
function ProjectCard({ project }) {
  const image = project.link ? getScreenshot(project.link) : "";

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      variants={card}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-full max-w-sm h-56 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/6 backdrop-blur-md"
    >
      {/* background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: image
            ? `linear-gradient(180deg, rgba(10,10,12,0.18), rgba(8,6,12,0.6)), url(${image})`
            : "linear-gradient(180deg, rgba(10,10,12,0.18), rgba(8,6,12,0.6))",
        }}
      />

      {/* accent glow */}
      <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-60 bg-gradient-to-r from-blue-400 to-purple-500/60" />

      {/* content */}
      <div className="relative z-10 flex flex-col h-full p-6 justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="text-sm px-3 py-1 rounded-full bg-white/6 backdrop-blur-sm text-white/90 text-xs">
              {project.usesAPI ? "API" : "Front"}
            </div>
            <h3 className="text-white font-semibold text-lg">
              {project.title}
            </h3>
          </div>
          <p className="mt-3 text-sm text-white/80 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-white/60">Voir le projet</div>
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-white/80"
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
    </motion.a>
  );
}

// ----------------
// Main page
// ----------------
export default function HomeRefonte() {
  const categories = useMemo(() => Object.keys(PROJECTS_BY_CATEGORY), []);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const flattened = useMemo(() => {
    const all = Object.values(PROJECTS_BY_CATEGORY).flat();
    return all.map((p) => ({ ...p, image: getScreenshot(p.link) }));
  }, []);

  const displayed = useMemo(() => {
    const base =
      active === "All" ? flattened : PROJECTS_BY_CATEGORY[active] || [];
    return base.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [active, query, flattened]);

  useEffect(() => {
    // small prefetch images for smoother hover
    displayed.forEach((p) => {
      if (p.image) new Image().src = p.image;
    });
  }, [displayed]);

  return (
    <main className="min-h-screen bg-[#060615] text-white antialiased">
      {/* container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold">
                AF
              </div>
              <div className="text-xs text-white/60">
                Portfolio — Développement
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Arthur Fonteyne
              <div className="mt-3 text-2xl font-medium text-white/80">
                Je construit des interfaces rapides et mémorables —{" "}
                <Typewriter
                  texts={[
                    "Design & Code",
                    "Interactions qui claquent",
                    "Performances & accessibilité",
                  ]}
                />
              </div>
            </h1>

            <p className="mt-6 text-gray-300 max-w-xl leading-relaxed">
              Refondue pour faire sensation — projets présentés avec style,
              animations fluides et glassmorphism. Clique sur une catégorie pour
              filtrer les projets.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-full px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:scale-105 transform transition"
              >
                Voir mes projets
              </a>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-3 rounded-full px-5 py-3 ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                Contact
              </a>
            </div>

            <div className="mt-8 flex gap-3 text-sm text-white/60">
              <div className="flex items-center gap-2">⚛️ React</div>
              <div className="flex items-center gap-2">🟨 JavaScript</div>
              <div className="flex items-center gap-2">🟢 Node</div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/6 bg-gradient-to-br from-[#081026] to-[#08101b] p-6">
              <div className="w-full h-72 rounded-xl bg-gradient-to-br from-[#0b1220] to-[#071226] flex items-center justify-center text-white/30">
                <div className="text-center">
                  <div className="text-2xl font-semibold mb-2">
                    Exemples de projets
                  </div>
                  <div className="text-sm">
                    Survolez les cartes pour voir l'effet — clique pour ouvrir
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-20 rounded-lg bg-gradient-to-br from-white/3 to-transparent"
                  />
                ))}
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full blur-3xl opacity-40 bg-gradient-to-r from-purple-500 to-pink-500/60" />
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-20">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setActive("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  active === "All"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
                    : "bg-white/3 hover:bg-white/6"
                }`}
              >
                Tous
              </button>

              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    active === c
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
                      : "bg-white/3 hover:bg-white/6"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="w-full md:w-1/3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Recherche..."
                className="w-full rounded-xl bg-white/5 px-4 py-2 ring-1 ring-white/6 placeholder:text-white/40"
              />
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayed.length === 0 ? (
              <div className="col-span-full p-12 rounded-2xl bg-white/3 text-center">
                Aucun projet trouvé — essaie un autre filtre.
              </div>
            ) : (
              displayed.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))
            )}
          </motion.div>
        </section>

        {/* STATS / SKILLS */}
        <section className="mt-20 bg-gradient-to-br from-white/4 to-transparent p-8 rounded-2xl ring-1 ring-white/6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold">Compétences</h3>
              <p className="mt-2 text-white/70">
                Tech stack, préférence pour les interfaces rapides et
                accessibles.
              </p>
            </div>

            <div className="flex gap-4 justify-around md:justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">JS</div>
                <div className="text-sm text-white/60">Vanilla / ESNext</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">React</div>
                <div className="text-sm text-white/60">Components & hooks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">Node</div>
                <div className="text-sm text-white/60">API & backend</div>
              </div>
            </div>

            <div className="text-right">
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-3 rounded-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Contacte moi
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Arthur — Built with ❤️ and some crazy CSS
        </footer>
      </div>

      {/* small entrance animations */}
      <AnimatePresence />
    </main>
  );
}
