
import React from 'react';

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
        <section id="projects" className="py-16 px-8 max-w-[1200px] mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold m-0 border-b-2 border-accent pb-2">Past Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {projects.map((project, index) => (
                    <div className="bg-surface rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-[#333]" key={index}>
                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold mt-0 mb-2">{project.title}</h3>
                            <p className="text-accent font-bold mb-4">{project.award}</p>
                            <p className="text-secondary leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 my-4">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="bg-[#333] px-3 py-1 rounded-md text-sm">{tag}</span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-6">
                                {project.links.video && <a href={project.links.video} className="bg-[#333] text-white px-4 py-2 rounded transition-colors hover:bg-[#444]" target="_blank" rel="noopener noreferrer">Video Demo</a>}
                                {project.links.website && <a href={project.links.website} className="bg-[#333] text-white px-4 py-2 rounded transition-colors hover:bg-[#444]" target="_blank" rel="noopener noreferrer">Website</a>}
                                {project.links.source && <a href={project.links.source} className="bg-[#333] text-white px-4 py-2 rounded transition-colors hover:bg-[#444]" target="_blank" rel="noopener noreferrer">GitHub</a>}
                                {project.links.devpost && <a href={project.links.devpost} className="bg-[#333] text-white px-4 py-2 rounded transition-colors hover:bg-[#444]" target="_blank" rel="noopener noreferrer">Devpost</a>}
                                {project.links.article && <a href={project.links.article} className="bg-[#333] text-white px-4 py-2 rounded transition-colors hover:bg-[#444]" target="_blank" rel="noopener noreferrer">Article</a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
