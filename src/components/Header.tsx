'use client';

import { Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-end px-4 sm:px-6 lg:px-8">

        <nav className="hidden md:flex items-center space-x-8 mr-5">
          <a
            href="#about"
            className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)] focus:text-[var(--accent)] focus:outline-none"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/dnsxmrs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--muted)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
