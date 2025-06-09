'use client';

import { Mail, Github, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>
          <div className="mt-4 h-1 w-20 bg-[var(--accent)] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Whether you have a project in mind, want to collaborate, or simply want to say hello,
                I&apos;d love to hear from you. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:ericemarial@gmail.com"
                className="group flex items-center space-x-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:bg-[var(--muted)] hover:border-[var(--accent)]/50 hover:scale-105"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)] transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">Email</p>
                  <p className="text-sm text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    ericemarial@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/dnsxmrs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:bg-[var(--muted)] hover:border-[var(--accent)]/50 hover:scale-105"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)] transition-all duration-300">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">GitHub</p>
                  <p className="text-sm text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    @dnsxmrs
                  </p>
                </div>
              </a>

              {/* linkedin */}
              <a
                href="https://www.linkedin.com/in/erice-michael-marial-76b74a300/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:bg-[var(--muted)] hover:border-[var(--accent)]/50 hover:scale-105"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)] transition-all duration-300">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">LinkedIn</p>
                  <p className="text-sm text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                    @dnsxmrs
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Send className="h-8 w-8" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                  Ready to Start a Project?
                </h3>

                <p className="text-[var(--muted-foreground)] mb-6">
                  I&apos;m currently available for new opportunities and exciting projects.
                  Let&apos;s discuss how we can work together.
                </p>

                <a
                  href="mailto:ericemarial@gmail.com?subject=Project%20Inquiry&body=Hi%20Erice,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you."
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-foreground)] transition-all duration-300 hover:bg-[var(--accent)]/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                >
                  <Mail className="h-4 w-4" />
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
