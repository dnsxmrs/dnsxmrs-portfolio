'use client';

import {
  Github, ExternalLink, Monitor, Globe, BookOpen,
  // AlertCircle, Clock, CheckCircle
} from 'lucide-react';
import { projects, type Project, getTechStackWithIcons } from '@/data/projects';

const categoryLabels = {
  web: 'Web Application',
  desktop: 'Desktop Application',
  study: 'Case Study'
};

function ProjectCard({ project }: { project: Project }) {
  const ProjectIcon = project.icon;
  const techStackWithIcons = getTechStackWithIcons(project.techStack);

  // const getDeploymentBadge = () => {
  //   if (project.deploymentStatus === 'deployed') {
  //     return (
  //       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full border border-green-200">
  //         <CheckCircle className="w-3 h-3" />
  //         Deployed
  //       </span>
  //     );
  //   } else if (project.deploymentStatus === 'in-development') {
  //     return (
  //       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
  //         <Clock className="w-3 h-3" />
  //         In Development
  //       </span>
  //     );
  //   } else if (project.deploymentStatus === 'not-deployed') {
  //     return (
  //       <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
  //         <AlertCircle className="w-3 h-3" />
  //         No Deployment
  //       </span>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[var(--accent)]/50">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative">
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)] transition-all duration-300 flex-shrink-0">
                <ProjectIcon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  {/* {project.featured && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border border-[var(--accent)]/20 flex-shrink-0">
                      Featured
                    </span>
                  )} */}
                </div>
                <span className="text-sm text-[var(--muted-foreground)] mt-1 block">
                  {categoryLabels[project.category]}
                </span>
                {/* {project.deploymentStatus && (
                  <div className="mt-2">
                    {getDeploymentBadge()}
                  </div>
                )} */}
              </div>
            </div>

            <div className="flex space-x-2 flex-shrink-0 ml-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1"
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1"
                  aria-label="View live demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )
                // : project.deploymentStatus === 'not-deployed' ? (
                //   <span
                //     className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-gray-400 cursor-not-allowed"
                //     title="No deployment available"
                //   >
                //     <ExternalLink className="h-4 w-4" />
                //     <span className="sr-only">No deployment available</span>
                //   </span>
                // )
                : null}
            </div>
          </div>
        </div>

        <p className="mb-4 text-[var(--muted-foreground)] leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStackWithIcons.map((tech) => {
            const TechIcon = tech.icon;
            return (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs font-medium text-[var(--muted-foreground)] group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)] transition-all duration-300"
              >
                <TechIcon
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: tech.color }}
                />
                {tech.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const webProjects = projects.filter(p => p.category === 'web');
  const desktopProjects = projects.filter(p => p.category === 'desktop');
  const studyProjects = projects.filter(p => p.category === 'study');

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--muted)]/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <div className="mt-4 h-1 w-20 bg-[var(--accent)] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            A collection of projects showcasing my experience in web development, desktop applications, and programming case studies.
          </p>
        </div>

        {/* Web Applications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center">
            <Globe className="h-6 w-6 text-[var(--accent)] mr-3" />
            Web Applications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fade-in-up 0.6s ease-out forwards'
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Applications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center">
            <Monitor className="h-6 w-6 text-[var(--accent)] mr-3" />
            Desktop Applications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {desktopProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  animationDelay: `${(webProjects.length + index) * 0.1}s`,
                  animation: 'fade-in-up 0.6s ease-out forwards'
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-8 flex items-center">
            <BookOpen className="h-6 w-6 text-[var(--accent)] mr-3" />
            Programming Case Studies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  animationDelay: `${(webProjects.length + desktopProjects.length + index) * 0.1}s`,
                  animation: 'fade-in-up 0.6s ease-out forwards'
                }}
              >
                <ProjectCard project={project} />
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
