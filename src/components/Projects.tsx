
import React from 'react';
import './Projects.css';

const projects = [
    {
        title: 'DocOps Copilot',
        award: 'Built @ DVHacks 2026',
        description: 'A document processing system that transforms unstructured documents into actionable outputs. Classifies document types, highlights potential risks, identifies missing information, and suggests next steps to support enterprise teams in document review workflows.',
        tags: ['AI', 'Groq', 'Llama', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'PyTesseract', 'Python', 'shadcn/ui', 'Tailwind CSS', 'TypeScript'],
        links: { website: 'https://docops-copilot.vercel.app/', source: 'https://github.com/kshrugalj/DVHacks', devpost: 'https://devpost.com/software/docops-copilot' },
    },
    {
        title: 'AdmitX',
        award: 'Qualifier @ NexHacks 2026',
        description: 'An AI-driven college advising platform built at NexHacks, a highly selective 24-hour hackathon at Carnegie Mellon University, bringing together ~800 top student hackers from a pool of 7,000+ applicants worldwide.',
        tags: ['Claude', 'DevSwarm', 'Groq', 'LiveKit', 'Python', 'React', 'SQL', 'Supabase', 'TypeScript'],
        links: { website: 'https://www.admitx.tech/', source: 'https://github.com/kshrugalj/AdmitX', devpost: 'https://devpost.com/software/admitx-phb81q' },

    },
    {
        title: 'OralScan',
        award: '2nd Place — Congressional App Challenge 2025 (Arkansas District 3)',
        description: 'An AI-powered mobile application designed to detect early signs of oral cancer through image analysis. Developed for the Congressional App Challenge, it aims to provide accessible screening in underserved communities.',
        tags: ['Flutter', 'Dart', 'Figma', 'AWS', 'Docker', 'Python', 'FastAPI', 'TensorFlow', 'OpenCV', 'Google Colab'],
        links: { video: 'https://www.youtube.com/watch?v=QshasNCWGik' },

    },
    {
        title: 'ChakraClash',
        award: '4th Place & Best Implementation Award — HogHacks 2025',
        description: 'A real-time competitive Yoga ranking app built for HogHacks 2025, where it won "Best Implementation". The app uses a custom machine vision model to score yoga poses, while simultaneously sending cheeky, distracting messages to contestants, creating a fun and mischievous experience.',
        tags: ['Deno', 'Flutter', 'Python', 'TensorFlow', 'OpenCV', 'WebSockets'],
        links: { article: 'https://news.uark.edu/articles/77408/u-of-a-students-compete-in-hoghacks-hackathon', source: 'https://github.com/kshrugalj/ChakraClash' },
    }
];

const Projects: React.FC = () => {
    return (
        <section id="projects" className="projects">
            <div className="projects-header">
                <h2>Recent Projects</h2>

            </div>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div className="project-card" key={index}>

                        <div className="project-info">
                            <h3>{project.title}</h3>
                            <p className="project-award">{project.award}</p>
                            <p>{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.links.video && <a href={project.links.video} className="btn" target="_blank" rel="noopener noreferrer">Video Demo</a>}
                                {project.links.website && <a href={project.links.website} className="btn" target="_blank" rel="noopener noreferrer">Website</a>}
                                {project.links.source && <a href={project.links.source} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>}
                                {project.links.devpost && <a href={project.links.devpost} className="btn" target="_blank" rel="noopener noreferrer">Devpost</a>}
                                {project.links.article && <a href={project.links.article} className="btn" target="_blank" rel="noopener noreferrer">Article</a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
