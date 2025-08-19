export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const card = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};
