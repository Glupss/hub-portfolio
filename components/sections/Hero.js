import Typewriter from "@/components/common/Typewriter";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold">
            AF
          </div>
          <div className="text-xs text-white/60">Portfolio — Développement</div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Arthur Fonteyne
          <div className="mt-3 text-2xl font-medium text-white/80">
            En plein apprentissage du web —{" "}
            <Typewriter texts={["JavaScript", "ReactJS", "NextJS"]} />
          </div>
        </h1>

        <div className="flex gap-4 mt-8">
          <Button href="#projects" variant="gradient">
            Voir mes projets
          </Button>
          <Button href="mailto:fonteyne.arthur@gmail.com" variant="outline">
            Contact
          </Button>
        </div>

        <div className="mt-8 flex gap-3 text-sm text-white/60">
          <div className="flex items-center gap-2">⚛️ React</div>
          <div className="flex items-center gap-2">🟨 JavaScript</div>
          <div className="flex items-center gap-2">🟢 Next</div>
        </div>
      </div>

      {/* Hero visual */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/6 bg-gradient-to-br from-[#081026] to-[#08101b] p-6">
          <div className="w-full h-72 rounded-xl bg-gradient-to-br from-[#0b1220] to-[#071226] flex items-center justify-center text-white/30">
            <div className="text-center">
              <div className="text-2xl font-semibold mb-2">
                Exemples de projets
              </div>
              <div className="text-sm">
                Survolez les cartes pour voir l&apos;effet — clique pour ouvrir
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-20 rounded-lg bg-gradient-to-br from-white/3 to-transparent"
              />
            ))}
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full blur-3xl opacity-40 bg-gradient-to-r from-purple-500 to-pink-500/60" />
      </div>
    </section>
  );
}
