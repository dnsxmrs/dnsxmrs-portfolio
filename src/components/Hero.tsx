'use client';

import { Github, ChevronDown, FolderKanban } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--accent)]/5 to-transparent rounded-full animate-float"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              {/* Glowing ring effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] via-purple-500 to-[var(--accent)] rounded-full blur opacity-30 group-hover:opacity-60 animate-spin-slow"></div>
              <div className="relative">
                <Image
                  src="/pic.webp"
                  alt="Erice Michael D. Marial"
                  width={180}
                  height={180}
                  className="h-44 w-44 rounded-full object-cover border-4 border-[var(--accent)] shadow-2xl group-hover:scale-110 transition-all duration-500 bg-[var(--background)]"
                  priority
                />
                {/* Animated border pulse */}
                <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/50 animate-ping"></div>
                {/* Gradient overlay with sparkle effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--accent)]/20 via-transparent to-purple-500/10 group-hover:from-[var(--accent)]/30 transition-all duration-500"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl mb-2 animate-text-reveal bg-gradient-to-r from-[var(--foreground)] via-[var(--accent)] to-[var(--foreground)] bg-clip-text text-transparent bg-300% animate-gradient-x">
              Erice Michael D. Marial
            </h1>
            {/* Decorative line under name */}
            <div className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-width-expand"></div>
          </div>
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
            className="group relative inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[var(--accent)]/30 bg-[var(--accent)] backdrop-blur-sm px-10 py-4 text-sm font-bold text-white transition-all duration-500 hover:scale-105 hover:border-[var(--accent)] hover:bg-[var(--accent)]/90 hover:shadow-2xl hover:shadow-[var(--accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            <FolderKanban className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative">
              View Projects
            </span>
          </a>
          <a
            href="https://github.com/dnsxmrs"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[var(--accent)]/30 bg-transparent backdrop-blur-sm px-10 py-4 text-sm font-bold text-[var(--foreground)] transition-all duration-500 hover:scale-105 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:shadow-2xl hover:shadow-[var(--accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative">
              GitHub
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-enhanced">
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          33% { transform: translate(-48%, -52%) rotate(120deg); }
          66% { transform: translate(-52%, -48%) rotate(240deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes width-expand {
          from { width: 0; }
          to { width: 8rem; }
        }
        
        @keyframes slide-in-delayed {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-delayed {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes type-writer {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        
        @keyframes buttons-fade-in {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes bounce-enhanced {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateX(-50%) translateY(-25%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 6s ease-in-out infinite 2s;
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-width-expand {
          animation: width-expand 1s ease-out 0.5s both;
        }
        
        .animate-slide-in-delayed {
          animation: slide-in-delayed 0.8s ease-out 0.3s both;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 0.6s both;
        }
        
        .animate-type-writer {
          animation: type-writer 2s steps(20) 1s both;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-buttons-fade-in {
          animation: buttons-fade-in 0.8s ease-out 0.9s both;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-bounce-enhanced {
          animation: bounce-enhanced 2s infinite;
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}
