'use client';

import { Code, Database, Server, Layers } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: Code,
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js']
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: ['Laravel', 'C#', 'Python', 'Node.js', 'PHP']
  },
  {
    category: 'Database',
    icon: Database,
    technologies: ['PostgreSQL', 'MySQL', 'SQLite', 'SQL Server', 'MongoDB']
  },
  {
    category: 'Architecture',
    icon: Layers,
    technologies: ['Clean Architecture', 'Scalable Systems', 'API Integration']
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl md:text-5xl">
            About Me
          </h2>
          <div className="mt-4 h-1 w-20 bg-[var(--accent)] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-justify">
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              I&apos;m a passionate <span className="text-[var(--accent)] font-semibold">backend developer</span> with
              growing expertise in fullstack development. My journey in software development has been driven by
              a love for creating efficient, scalable systems and clean, maintainable code.
            </p>

            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              Currently working as a <span className="text-[var(--accent)] font-semibold">fullstack developer</span>,
              I specialize in building robust backend architectures while expanding my frontend skills.
              I believe in writing code that not only works but is also elegant, performant, and easy to understand.
            </p>

            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              My expertise spans across <span className="text-[var(--accent)] font-semibold">Laravel</span>,
              <span className="text-[var(--accent)] font-semibold"> C#</span>,
              <span className="text-[var(--accent)] font-semibold"> Python</span>, and
              <span className="text-[var(--accent)] font-semibold"> React</span>, with a strong foundation in
              database technologies like <span className="text-[var(--accent)] font-semibold">PostgreSQL</span> and
              <span className="text-[var(--accent)] font-semibold"> MySQL</span>.
              I&apos;m passionate about clean architecture, scalable systems, and seamless integrations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="group p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in-up 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)] transition-all duration-300">
                    <skill.icon className="h-5 w-5" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-[var(--foreground)]">
                    {skill.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block mr-2 mb-2 px-3 py-1 text-sm bg-[var(--muted)] text-[var(--muted-foreground)] rounded-full border border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
