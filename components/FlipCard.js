"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function FlipCard({ title, description, link, image, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleHoverStart = () => {
    setHovered(true);
    // Délai de 1.5 secondes pour afficher l'image agrandie
    const timer = setTimeout(() => {
      setShowLargeImage(true);
    }, 1500);
    setHoverTimer(timer);
  };

  const handleHoverEnd = () => {
    setHovered(false);
    // Ne pas fermer immédiatement la modale si elle est ouverte
    if (!showLargeImage) {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        setHoverTimer(null);
      }
    }
  };

  const closeLargeImage = () => {
    setShowLargeImage(false);
    setHovered(false);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  // Nettoyer le timer au démontage du composant
  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showLargeImage) {
        closeLargeImage();
      }
    };

    if (showLargeImage) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [showLargeImage]);

  return (
    <>
      <motion.div
        className="relative w-64 h-40 cursor-pointer"
        style={{ perspective: "1000px" }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={onClick}
      >
        <motion.div
          className="absolute w-full h-full rounded-xl shadow-lg"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: hovered ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Front - Titre et description */}
          <div
            className="absolute w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center p-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
            <p className="text-sm text-center opacity-90">{description}</p>
          </div>

          {/* Back - Image */}
          <div
            className="absolute w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Image non trouvée: ${image}`);
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23666' text-anchor='middle' dy='.3em'%3EImage manquante%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Image agrandie au centre */}
      <AnimatePresence>
        {showLargeImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLargeImage} // Clic sur le fond pour fermer
          >
            <motion.div
              className="relative max-w-4xl max-h-4xl w-auto h-auto cursor-default"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // Empêcher la fermeture en cliquant sur l'image
            >
              {/* Bouton de fermeture */}
              <button
                onClick={closeLargeImage}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-light transition-colors z-10"
                aria-label="Fermer"
              >
                ×
              </button>

              <img
                src={image}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              />

              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm opacity-90 mb-3">{description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick();
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Voir le projet
                  </button>
                  <button
                    onClick={closeLargeImage}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
