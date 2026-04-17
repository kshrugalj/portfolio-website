
import React from 'react';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';
import recallLogo from '../assets/recall.png';
import vibetextingLogo from '../assets/vibetexting.png';

const currentProjects = [
    {
        title: 'Recall',
        status: 'In Development',
        description: 'Gamifying music education to make mastering instruments immersive. A smart platform that transforms music theory into an engaging, game-like experience.',
        tags: [],
        color: '#03dac6',
        links: [
            { type: 'instagram', icon: <FiInstagram />, url: 'https://www.instagram.com/playrecall/' },
            { type: 'linkedin', icon: <FiLinkedin />, url: 'https://www.linkedin.com/company/playrecall/' }
        ],
        image: recallLogo
    },
    {
        title: 'VibeTexting',
        status: 'In Development',
        description: 'Adding emotional depth to digital communication. Real-time sentiment analysis provides visual feedback to ensure your messages carry the weight they deserve.',
        tags: [],
        color: '#03dac6',
        links: [],
        image: vibetextingLogo
    }
];

const CurrentProjects: React.FC = () => {
    return (
        <section id="current-projects" className="py-20 px-8 bg-background relative">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold m-0 border-b-2 border-accent pb-2 inline-block">Currently Building</h2>
                </div>
                
                <div className="flex flex-col gap-24">
                    {currentProjects.map((project, index) => (
                        <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 w-full">
                                <div className="mb-4">
                                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold border border-accent/20">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                        {project.status}
                                    </div>
                                </div>
                                
                                <h3 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h3>
                                <p className="text-lg text-secondary leading-relaxed mb-8 max-w-xl">{project.description}</p>
                                
                                {project.links.length > 0 && (
                                    <div className="flex gap-4">
                                        {project.links.map((link, i) => (
                                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl text-secondary hover:text-accent transition-colors">
                                                {link.icon}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 w-full relative">
                                <div className="absolute -inset-4 bg-accent/20 blur-[100px] rounded-full"></div>
                                <div className="absolute top-0 right-0 text-9xl font-black text-white/5 select-none pointer-events-none">0{index + 1}</div>
                                <div className="relative z-10 bg-[#1f1f1f] border border-white/10 rounded-3xl p-8 overflow-hidden group">
                                    <div className="absolute inset-0 border border-accent/20 rounded-3xl group-hover:border-accent/50 transition-colors"></div>
                                    {project.image && (
                                        <img src={project.image} alt={`${project.title} visual`} className="w-full h-auto rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-[1.02]" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurrentProjects;
