"use client";

export default function ProjectModal({ projectUrl, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative w-full h-full">
        <iframe
          src={projectUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-xl"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
