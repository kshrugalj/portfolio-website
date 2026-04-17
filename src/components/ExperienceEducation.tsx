
import React, { useState } from 'react';
import wolverineLogo from '../assets/wolverine.png';
import aitheriaLogo from '../assets/aitheria.png';
import arvestLogo from '../assets/arvest.png';
import velricLogo from '../assets/velric.png';
import waypaveLogo from '../assets/waypave.png';
import igniteLogo from '../assets/ignite.png';
import georgiaTechLogo from '../assets/georgia-tech.png';

const ExperienceEducation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

    const experiences = [
        {
            title: 'Chief Architect',
            company: 'Aitheria',
            period: 'Jan 2026 - Present',
            description: 'Developing Technical Systems and AI Training.',
            logo: aitheriaLogo,
            link: 'https://aitheria.io/'
        },
        {
            title: 'Frontend Developer Intern',
            company: 'Velric',
            period: 'Sep 2025 - Dec 2025',
            description: 'Helped build the company website, including Home and Contact pages, using Next.js, TypeScript, and Tailwind. Focused on server-side rendering and type safety.',
            logo: velricLogo,
            link: 'https://velric.ai/'
        },
        {
            title: 'Software Engineer Intern',
            company: 'WayPave',
            period: 'Jun 2025 - Aug 2025',
            description: 'Built a full-stack hiring analytics platform with a Firebase backend and Vue.js/Tailwind frontend, providing real-time recruitment insights and leveraging analytics to guide product strategy.',
            logo: waypaveLogo,
            link: 'https://waypave.com/'
        },
        {
            title: 'Information Security Intern',
            company: 'Arvest Bank',
            period: 'Jan 2025 - May 2025',
            description: 'Led the development of a company-wide ransomware training program, creating an interactive JavaScript/HTML/CSS game integrated with the LMS to simplify cybersecurity concepts and boost risk awareness.',
            logo: arvestLogo,
            link: 'https://www.arvest.com/'
        }
    ];

    const education = [
        {
            degree: 'Incoming CS Student',
            school: 'Georgia Institute of Technology',
            period: 'June 2026 - Present',
            description: 'Major: Computer Science',
            logo: georgiaTechLogo,
            link: 'https://www.gatech.edu/'
        },
        {
            degree: 'Ignite Technology Student (Year 2)',
            school: 'Ignite Professional Studies',
            period: 'Aug 2025 - Present',
            description: 'Yin and Yang Sensory Room, The Hawk-Eye System (@Zebra Technologies), Cybersecurity Research (@OBU), Traffic Optimization (@Bentonville Traffic Unit)',
            logo: igniteLogo,
            link: 'https://www.bentonvillek12.org/o/ignite'
        },
        {
            degree: 'Ignite Technology Student (Year 1)',
            school: 'Ignite Professional Studies',
            period: 'Aug 2024 - May 2025',
            description: 'Flow (Kayaking VR experience @Crystal Bridges), NurseAI (Curiosity Gauntlet), OCR PDF development (LexMed), Multilingual chatbot (@Arvest Hackathon, 1st place)',
            logo: igniteLogo,
            link: 'https://www.bentonvillek12.org/o/ignite'
        },
        {
            degree: 'High School Diploma',
            school: 'Bentonville West High School',
            period: 'Aug 2022 - Present',
            description: 'Grade: 12th \n Activities and societies: Varsity Tennis, Key Club, Programming Club (Vice President), Mu Alpha Theta, Varsity Quiz Bowl, NHS, DECA',
            logo: wolverineLogo,
            link: 'https://www.bentonvillek12.org/o/bwhs'
        }
    ];

    const items = activeTab === 'experience' ? experiences : education;

    return (
        <section id="experience-education" className="py-20 px-8 bg-background">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-4xl font-bold m-0 border-b-2 border-accent pb-2 inline-block mb-12">Experience & Education</h2>
                
                <div className="bg-[#1f1f1f] rounded-3xl p-6 md:p-12 border border-white/5">
                    <div className="flex gap-4 mb-12 border-b border-white/10">
                        <button
                            className={`pb-4 px-4 font-bold transition-all duration-300 relative ${activeTab === 'experience' ? 'text-accent' : 'text-secondary hover:text-white'}`}
                            onClick={() => setActiveTab('experience')}
                        >
                            Experience
                            {activeTab === 'experience' && <span className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></span>}
                        </button>
                        <button
                            className={`pb-4 px-4 font-bold transition-all duration-300 relative ${activeTab === 'education' ? 'text-accent' : 'text-secondary hover:text-white'}`}
                            onClick={() => setActiveTab('education')}
                        >
                            Education
                            {activeTab === 'education' && <span className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></span>}
                        </button>
                    </div>

                    <div className="relative pl-8 md:pl-12 border-l-2 border-accent/20 space-y-12">
                        {items.map((item, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute left-[-33px] md:left-[-49px] top-0 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#1f1f1f] border-2 border-accent rounded-full flex items-center justify-center overflow-hidden z-10 group-hover:scale-110 transition-transform bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(3,218,198,0.2)]">
                                    {(item as any).logo && <img src={(item as any).logo} alt="Logo" className="w-full h-full object-cover p-1 rounded-full" />}
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-white">{(item as any).title || (item as any).degree}</h3>
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                        <h4 className="text-accent font-semibold">
                                            {(item as any).link ? (
                                                <a href={(item as any).link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                    {(item as any).company || (item as any).school}
                                                </a>
                                            ) : (
                                                (item as any).company || (item as any).school
                                            )}
                                        </h4>
                                        <span className="hidden md:block text-secondary">•</span>
                                        <span className="text-secondary text-sm font-medium">{(item as any).period}</span>
                                    </div>
                                    <p className="text-secondary leading-relaxed max-w-3xl pt-2">{(item as any).description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceEducation;
