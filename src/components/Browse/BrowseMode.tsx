import React from "react";
import { profile, stats, currentProjects, pastProjects, competitions, experiences, education } from "../../data/content";
import StatusBadge from "../UI/StatusBadge";

interface BrowseModeProps {
  onSwitchMode: () => void;
}

const BrowseMode: React.FC<BrowseModeProps> = ({ onSwitchMode }) => {
  return (
    <div className="min-h-screen bg-term-bg">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-term-bg/90 backdrop-blur-sm border-b border-term-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
          <span className="font-mono text-sm text-term-green">kshrugal@portfolio</span>
          <div className="flex gap-6 text-xs font-mono items-center">
            {["projects", "competitions", "experience"].map((s) => (
              <a key={s} href={`#${s}`} className="text-term-muted hover:text-term-green transition-colors">#{s}</a>
            ))}
            <button
              onClick={onSwitchMode}
              className="text-term-dim hover:text-term-green transition-colors cursor-pointer bg-transparent border-none font-mono text-xs"
            >
              → terminal mode
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto flex items-center gap-8">
          <img src="/profile.jpg" alt="Kshrugal" className="w-28 h-28 rounded-full border border-term-border object-cover flex-shrink-0" />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-term-text mb-4">{profile.name}</h1>
            <div className="text-term-green text-lg mb-2">{profile.role}</div>
            <div className="text-term-blue text-sm mb-6">{profile.education}</div>
            <p className="text-term-muted max-w-xl mb-8">{profile.tagline}</p>
          <div className="flex gap-4 text-sm font-mono">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">github →</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">linkedin →</a>
            <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green transition-colors">email →</a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green transition-colors">resume →</a>
          </div>
          <div className="flex gap-6 mt-8 text-xs font-mono text-term-dim">
            <span>{stats.competitions} competitions</span>
            <span>{stats.projects} projects</span>
            <span>{stats.experiences} experiences</span>
          </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6 border-t border-term-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">projects</h2>
          <div className="space-y-8">
            {[...currentProjects, ...pastProjects].map((p) => (
              <div key={p.id} className="bg-term-surface border border-term-border rounded-lg p-6 hover:border-term-border-active transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-term-text font-bold text-lg">{p.title}</h3>
                  {p.status === "active" && <StatusBadge active label="active" />}
                </div>
                {p.award && <div className="text-term-yellow text-sm mb-2">{p.award}</div>}
                <p className="text-term-muted text-sm mb-4">{p.description}</p>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span key={t} className="text-term-purple text-xs bg-term-purple/10 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">
                      → {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section id="competitions" className="py-16 px-6 border-t border-term-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">competitions</h2>
          <div className="space-y-3">
            {competitions.map((c, i) => (
              <div key={i} className="flex items-center gap-4 py-2 px-3 hover:bg-term-surface rounded transition-colors">
                <span className="text-term-dim text-xs w-16 tabular-nums">{c.date}</span>
                <span className="text-term-text text-sm flex-1">{c.title}</span>
                <span className="text-term-yellow text-xs">{c.award}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="py-16 px-6 border-t border-term-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">experience</h2>
          <div className="space-y-6 mb-12">
            {experiences.map((e, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-term-dim text-xs w-36 flex-shrink-0 tabular-nums pt-0.5 whitespace-nowrap">{e.period}</span>
                <div>
                  <div className="text-term-text font-semibold text-sm">{e.title}</div>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">{e.company}</a>
                  <div className="text-term-muted text-xs mt-1">{e.description}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-term-text mb-8 font-mono">education</h2>
          <div className="space-y-6">
            {education.map((e, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-term-dim text-xs w-36 flex-shrink-0 tabular-nums pt-0.5 whitespace-nowrap">{e.period}</span>
                <div>
                  <div className="text-term-text font-semibold text-sm">{e.degree}</div>
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:text-term-green text-xs transition-colors">{e.school}</a>
                  <div className="text-term-muted text-xs mt-1">{e.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-term-border text-center">
        <div className="text-term-dim text-xs font-mono">
          © 2026 {profile.name} · <a href={`mailto:${profile.email}`} className="text-term-blue hover:text-term-green transition-colors">{profile.email}</a>
        </div>
      </footer>
    </div>
  );
};

export default BrowseMode;
