'use client';

import { Github, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl">
            Erice Michael D. Marial
          </h1>
          <p className="mt-4 text-xl text-[var(--muted-foreground)] sm:text-2xl md:text-3xl">
            Fullstack Developer |
            <span className="text-[var(--accent)]"> Backend Specialist</span>
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-[var(--muted-foreground)] leading-relaxed">
            I tinker with code for the joy of it. Whether it&apos;s a quick idea or a full-blown project, I&apos;m always chasing that &quot;what if?&quot; moment.
            Someday, I hope to use what I know to help make the world a little better — one line of code at a time.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[var(--accent-foreground)] transition-all duration-300 hover:bg-[var(--accent)]/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            View Projects
          </a>
          <a
            href="https://github.com/dnsxmrs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-8 py-3 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--muted)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] transition-all duration-300 hover:bg-[var(--muted)] hover:text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
