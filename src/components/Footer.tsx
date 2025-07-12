'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-[var(--muted-foreground)]">
            {/* dynamic year displaying if 2025 this year then display 2025, if above 2025 then display 2025 - current year */}
            <span>
              © {new Date().getFullYear() === 2025 ? '2025' : '2025 - ' + new Date().getFullYear()} dnsxmrs
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--accent)] focus:outline-none focus:text-[var(--accent)]"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
