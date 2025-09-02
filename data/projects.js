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
      title: "Bankist",
      description:
        "App bancaire pour travailler sur les array et toujours la manipulation de DOM   \n User: js:1111 /// User: jd:2222 \n User: stw:3333 /// User:  ss:4444",
      link: "https://bankist-arthur.netlify.app/",
      usesAPI: false,
    },
    {
      title: "LP Bankist",
      description:
        "Landing page pour l'application précédente avec des lazy loadings, des modals des softs scrolls, etc...",
      link: "https://bankist-lp-arthur.netlify.app/",
      usesAPI: false,
    },
    {
      title: "Mapty",
      description:
        "App qui utilise des APIs et geolocation pour tracker des workouts avec une sauvegarde dans le browser en local.",
      link: "https://mapty-arthur.netlify.app/",
      usesAPI: true,
    },
    {
      title: "Forkify",
      description:
        "App de recette de cuisine: on, peut rechercher dans une API nimporte quelle recette, et elle viendra s'afficher correctement,  on peut ajouter nous meme des recettes et bookmark celles qu'on apprécie avec sauvegarde en local dans le browser",
      link: "https://forkifyarthur.netlify.app/",
      usesAPI: true,
    },
  ],
  React: [
    {
      title: "usePopcorn",
      description:
        "App de tracking de films sur une API avec sauvegarde en locale",
      link: "https://arthur-usepopcorn.netlify.app/",
      usesAPI: true,
    },
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
