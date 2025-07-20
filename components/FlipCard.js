"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function FlipCard({ title, description, link, image, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-40 cursor-pointer perspective"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="absolute w-full h-full rounded-xl shadow-lg transform-style preserve-3d"
        animate={{
          rotateY: hovered ? 180 : 0,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-gray-800 text-white flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full opacity-80"
          />
          <div className="absolute text-xl font-bold">{title}</div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-white flex">
          <div className="w-2/3 p-4 text-sm text-gray-700 flex items-center">
            {description}
          </div>
          <div className="w-1/3 bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
            Voir
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
