import React, { useState } from "react";
import { currentProjects, pastProjects, type Project } from "../../data/content";
import TerminalPrompt from "../Terminal/TerminalPrompt";
import TerminalOutput from "../Terminal/TerminalOutput";
import StatusBadge from "../UI/StatusBadge";

interface ProjectsProps {
  args?: string;
}

const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-2 mt-2 pl-4 border-l border-term-border-active">
      <div className="text-term-text font-bold"># {project.title}</div>
      {project.award && <div className="text-term-yellow text-xs">&gt; award: {project.award}</div>}
      {project.status === "active" && <StatusBadge active label="In Development" />}
      <div className="text-term-muted mt-2">{project.description}</div>
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-term-purple text-xs bg-term-purple/10 px-1.5 py-0.5 rounded border border-term-purple/20">
              {tag}
            </span>
          ))}
        </div>
      )}
      {project.links.length > 0 && (
        <div className="mt-2 space-y-1">
          {project.links.map((link) => (
            <div key={link.label}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
                → {link.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ args }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const showActive = args?.includes("--active");
  const projects = showActive ? currentProjects : [...currentProjects, ...pastProjects];

  return (
    <div className="space-y-4">
      <TerminalPrompt command={showActive ? "projects --active" : "projects"} />
      <TerminalOutput indent={1}>
        <div className="text-term-muted mb-2">
          {showActive ? "currently building:" : "all projects:"}
        </div>

        <div className="space-y-0.5">
          {projects.map((project) => (
            <div key={project.id}>
              <button
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                className="w-full text-left flex items-center gap-3 py-1.5 px-2 hover:bg-term-raised rounded transition-colors cursor-pointer font-mono text-sm bg-transparent border-none"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.status === "active" ? "#03dac6" : "#5c6773" }} />
                <span className="text-term-blue hover:underline">{project.title}</span>
                {project.award && <span className="text-term-dim text-xs hidden sm:inline">— {project.award}</span>}
              </button>
              {expandedProject === project.id && <ProjectDetail project={project} />}
            </div>
          ))}
        </div>

        <div className="text-term-green mt-4">$ <span className="text-term-dim">cat &lt;project&gt; for details (click above)</span></div>
      </TerminalOutput>
    </div>
  );
};

export default Projects;
