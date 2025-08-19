"use client";

import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#060615] text-white antialiased">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <Footer />
      </div>
    </main>
  );
}
