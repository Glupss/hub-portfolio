import Button from "@/components/ui/Button";
import { SKILLS } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section className="mt-20 bg-gradient-to-br from-white/4 to-transparent p-8 rounded-2xl ring-1 ring-white/6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-bold">Compétences</h3>
          <p className="mt-2 text-white/70">
            Tech stack, préférence pour les interfaces rapides et accessibles.
          </p>
        </div>

        <div className="flex gap-4 justify-around md:justify-center">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="text-center">
              <div className={`text-3xl font-bold ${skill.color}`}>
                {skill.name}
              </div>
              <div className="text-sm text-white/60">{skill.description}</div>
            </div>
          ))}
        </div>

        <div className="text-right">
          <Button href="mailto:fonteyne.arthur@gmail.com" variant="gradient">
            Contacte moi
          </Button>
        </div>
      </div>
    </section>
  );
}
