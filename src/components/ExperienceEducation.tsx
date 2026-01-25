import React, { useState } from 'react';
import './ExperienceEducation.css';
import wolverineLogo from '../assets/wolverine.png';
import aitheriaLogo from '../assets/aitheria.png';
import arvestLogo from '../assets/arvest.png';
import velricLogo from '../assets/velric.png';
import waypaveLogo from '../assets/waypave.png';
import igniteLogo from '../assets/ignite.png';

const ExperienceEducation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

    const experiences = [
        {
            title: 'Full Stack Development Intern',
            company: 'Aitheria',
            period: 'Jan 2026 - Present',
            description: 'Developing Full Stack Applications.',
            logo: aitheriaLogo
        },
        {
            title: 'Frontend Developer Intern',
            company: 'Velric',
            period: 'Sep 2025 - Dec 2025',
            description: 'Helped build the company website, including Home and Contact pages, using Next.js, TypeScript, and Tailwind. Focused on server-side rendering and type safety.',
            logo: velricLogo
        },
        {
            title: 'Software Engineer Intern',
            company: 'WayPave',
            period: 'Jun 2025 - Aug 2025',
            description: 'Built a full-stack hiring analytics platform with a Firebase backend and Vue.js/Tailwind frontend, providing real-time recruitment insights and leveraging analytics to guide product strategy.',
            logo: waypaveLogo
        },
        {
            title: 'Information Security Intern',
            company: 'Arvest Bank',
            period: 'Jan 2025 - May 2025',
            description: 'Led the development of a company-wide ransomware training program, creating an interactive JavaScript/HTML/CSS game integrated with the LMS to simplify cybersecurity concepts and boost risk awareness.',
            logo: arvestLogo
        }
    ];

    const education = [
        {
            degree: 'Ignite Technology Student (Year 2)',
            school: 'Ignite Professional Studies',
            period: 'Aug 2025 - Present',
            description: 'Yin and Yang Sensory Room, The Hawk-Eye System (@Zebra Technologies), Cybersecurity Research (@OBU), Traffic Optimization (@Bentonville Traffic Unit)',
            logo: igniteLogo
        },
        {
            degree: 'Ignite Technology Student (Year 1)',
            school: 'Ignite Professional Studies',
            period: 'Aug 2024 - May 2025',
            description: 'Flow (Kayaking VR experience @Crystal Bridges), NurseAI (Curiosity Gauntlet), OCR PDF development (LexMed), Multilingual chatbot (@Arvest Hackathon, 1st place)',
            logo: igniteLogo
        },
        {
            degree: 'High School Diploma',
            school: 'Bentonville West High School',
            period: 'Aug 2022 - Present',
            description: 'Grade: 12th \n Activities and societies: Varsity Tennis, Key Club, Programming Club (Vice President), Mu Alpha Theta, Varsity Quiz Bowl, NHS, DECA',
            logo: wolverineLogo
        }
    ];

    return (
        <section id="experience-education" className="experience-education">
            <div className="container">
                <h2>Experience & Education</h2>
                
                <div className="tab-container">
                    <div className="tab-buttons">
                        <button
                            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                            onClick={() => setActiveTab('experience')}
                        >
                            Experience
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                            onClick={() => setActiveTab('education')}
                        >
                            Education
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'experience' && (
                            <div className="experience-list">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="timeline-item">
                                <div className={`timeline-marker ${exp.logo ? 'has-logo' : ''}`}>
                                    {exp.logo && <img src={exp.logo} alt={`${exp.company} logo`} className="timeline-logo" />}
                                </div>
                                        <div className="timeline-content">
                                            <h3>{exp.title}</h3>
                                            <h4>{exp.company}</h4>
                                            <span className="period">{exp.period}</span>
                                            <p>{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'education' && (
                            <div className="education-list">
                                {education.map((edu, index) => (
                                    <div key={index} className="timeline-item">
                                <div className={`timeline-marker ${edu.logo ? 'has-logo' : ''}`}>
                                    {edu.logo && <img src={edu.logo} alt={`${edu.school} logo`} className="timeline-logo" />}
                                </div>
                                        <div className="timeline-content">
                                            <h3>{edu.degree}</h3>
                                            <h4>{edu.school}</h4>
                                            <span className="period">{edu.period}</span>
                                            <p>{edu.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceEducation;