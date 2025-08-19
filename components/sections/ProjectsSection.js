"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/common/ProjectCard";
import FilterTabs from "@/components/common/FilterTabs";
import Input from "@/components/ui/Input";
import useProjectFilter from "@/hooks/useProjectFilter";
import { container } from "@/lib/animations";

export default function ProjectsSection() {
  const { categories, active, setActive, query, setQuery, displayed } =
    useProjectFilter();

  return (
    <section id="projects" className="mt-20">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <FilterTabs
          categories={categories}
          active={active}
          onActiveChange={setActive}
        />

        <div className="w-full md:w-1/3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Recherche..."
            className="w-full"
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
            <ProjectCard
              key={i}
              project={project}
              category={project.category}
            />
          ))
        )}
      </motion.div>
    </section>
  );
}
