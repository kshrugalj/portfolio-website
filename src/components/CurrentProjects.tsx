import React from 'react';
import './CurrentProjects.css';
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
            { type: 'instagram', icon: <FiInstagram className="icon" />, url: 'https://www.instagram.com/playrecall/' },
            { type: 'linkedin', icon: <FiLinkedin className="icon" />, url: 'https://www.linkedin.com/company/playrecall/' }
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
        <section id="current-projects" className="current-projects">
            <div className="container">
                <div className="section-header">
                    <h2>Currently Building</h2>
                </div>
                
                <div className="projects-stack">
                    {currentProjects.map((project, index) => (
                        <div key={index} className={`project-feature ${index % 2 === 1 ? 'reversed' : ''}`}>
                            <div className="feature-info">
                                <div className="feature-header">
                                    <div className="status-pill">
                                        <span className="pulse"></span>
                                        {project.status}
                                    </div>
                                </div>
                                
                                <h3 className="feature-title">{project.title}</h3>
                                <p className="feature-description">{project.description}</p>
                                
                                {project.links.length > 0 && (
                                    <div className="feature-links">
                                        {project.links.map((link, i) => (
                                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="action-link">
                                                {link.icon}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="feature-visual">
                                <div className="visual-glow" style={{ backgroundColor: project.color } as React.CSSProperties}></div>
                                <div className="visual-number">0{index + 1}</div>
                                <div className="visual-box">
                                    <div className="inner-glow" style={{ border: `1px solid ${project.color}33` } as React.CSSProperties}></div>
                                    {project.image && (
                                        <img src={project.image} alt={`${project.title} visual`} className="project-image" />
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
