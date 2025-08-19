// src/hooks/useProjectPreview.js
"use client";

import { create } from "zustand";

// Store global pour partager l'état entre Hero et ProjectCard
const useProjectPreviewStore = create((set) => ({
  previewProject: null,
  setPreviewProject: (project) => set({ previewProject: project }),
  clearPreview: () => set({ previewProject: null }),
}));

export const useProjectPreview = () => {
  const { previewProject, setPreviewProject, clearPreview } =
    useProjectPreviewStore();

  return {
    previewProject,
    setPreviewProject,
    clearPreview,
  };
};
