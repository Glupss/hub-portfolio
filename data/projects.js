export const PROJECTS_BY_CATEGORY = {
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

export const CATEGORY_STYLES = {
  JavaScript: "bg-gradient-to-r from-yellow-400/70 to-yellow-500/70 text-black",
  React: "bg-gradient-to-r from-sky-400/70 to-sky-500/70 text-black",
  "Full Stack":
    "bg-gradient-to-r from-purple-400/70 to-purple-500/70 text-white",
};
