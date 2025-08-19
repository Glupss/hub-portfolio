export default function FilterTabs({ categories, active, onActiveChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={() => onActiveChange("All")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          active === "All"
            ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
            : "bg-white/3 hover:bg-white/6"
        }`}
      >
        Tous
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onActiveChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === category
              ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
              : "bg-white/3 hover:bg-white/6"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
