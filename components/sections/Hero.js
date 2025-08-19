// src/components/sections/Hero.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "@/components/common/Typewriter";
import Button from "@/components/ui/Button";
import { useProjectPreview } from "@/hooks/useProjectPreview";

export default function Hero() {
  const { previewProject, setPreviewProject, clearPreview } =
    useProjectPreview();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold">
            AF
          </div>
          <div className="text-xs text-white/60">Portfolio — Développement</div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Arthur Fonteyne
          <div className="mt-3 text-2xl font-medium text-white/80">
            En plein apprentissage du web —{" "}
            <Typewriter texts={["JavaScript", "ReactJS", "NextJS"]} />
          </div>
        </h1>

        <div className="flex gap-4 mt-8">
          <Button href="#projects" variant="gradient">
            Voir mes projets
          </Button>
          <Button href="mailto:fonteyne.arthur@gmail.com" variant="outline">
            Contact
          </Button>
        </div>

        <div className="mt-8 flex gap-3 text-sm text-white/60">
          <div className="flex items-center gap-2">⚛️ React</div>
          <div className="flex items-center gap-2">🟨 JavaScript</div>
          <div className="flex items-center gap-2">🟢 Next</div>
        </div>
      </div>

      {/* Hero visual avec preview */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/6 bg-gradient-to-br from-[#081026] to-[#08101b] p-6">
          <div className="relative w-full h-72 rounded-xl bg-gradient-to-br from-[#0b1220] to-[#071226] overflow-hidden">
            {/* État par défaut */}
            <AnimatePresence mode="wait">
              {!previewProject ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center text-white/30"
                >
                  <div className="text-center">
                    <div className="text-2xl font-semibold mb-2">
                      Preview des projets
                    </div>
                    <div className="text-sm">
                      Survolez un projet pour voir l&apos;aperçu ici
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={previewProject.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {/* Image de fond */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${previewProject.image})`,
                    }}
                  />

                  {/* Overlay avec infos */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Contenu */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <div
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          previewProject.categoryStyle ||
                          "bg-gray-500/50 text-white"
                        }`}
                      >
                        {previewProject.category}
                      </div>
                    </motion.div>

                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="text-white font-bold text-xl mb-2"
                    >
                      {previewProject.title}
                    </motion.h3>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="text-white/90 text-sm leading-relaxed whitespace-pre-line"
                    >
                      {previewProject.description}
                    </motion.p>
                  </div>

                  {/* Effet de glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-400 to-purple-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Indicateurs en bas */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: previewProject ? 0.8 : 0.3,
                  scale: previewProject ? 1.05 : 1,
                }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="h-20 rounded-lg bg-gradient-to-br from-white/3 to-transparent"
              />
            ))}
          </div>
        </div>

        {/* Glow effect externe */}
        <motion.div
          animate={{
            opacity: previewProject ? 0.6 : 0.4,
            scale: previewProject ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full blur-3xl bg-gradient-to-r from-purple-500 to-pink-500/60"
        />
      </div>
    </section>
  );
}
