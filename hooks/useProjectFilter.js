"use client";

import { useMemo, useState, useEffect } from "react";
import { PROJECTS_BY_CATEGORY } from "@/data/projects";
import { getScreenshot } from "@/lib/utils";

export default function useProjectFilter() {
  const categories = useMemo(() => Object.keys(PROJECTS_BY_CATEGORY), []);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const flattened = useMemo(() => {
    return Object.entries(PROJECTS_BY_CATEGORY).flatMap(
      ([category, projects]) =>
        projects.map((p) => ({
          ...p,
          category,
          image: getScreenshot(p.link),
        }))
    );
  }, []);

  const displayed = useMemo(() => {
    const base =
      active === "All"
        ? flattened
        : flattened.filter((p) => p.category === active);

    return base.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [active, query, flattened]);

  // Prefetch images
  useEffect(() => {
    displayed.forEach((p) => {
      if (p.image) new Image().src = p.image;
    });
  }, [displayed]);

  return {
    categories,
    active,
    setActive,
    query,
    setQuery,
    displayed,
    flattened,
  };
}
