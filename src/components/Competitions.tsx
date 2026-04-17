import React from 'react';

interface Competition {
    title: string;
    award: string;
    issuer: string;
    date: string;
    description: string;
    associated?: string;
    tags?: string[];
}

const competitions: Competition[] = [
    {
        title: 'HogHacks 2026',
        award: '4th Place',
        issuer: 'University of Arkansas ACM',
        date: 'Apr 2026',
        description: 'Placed 4th in the University of Arkansas’s annual hackathon.',
        associated: 'Bentonville West High School'
    },
    {
        title: 'High School Programming Competition',
        award: '5th Place',
        issuer: 'University of Arkansas EECS',
        date: 'Mar 2026',
        description: 'Placed 5th out of 20 teams. Solved algorithmic problems in Python representing Bentonville West High School Programming Club.',
        associated: 'Bentonville West High School',
        tags: ['Python', 'Algorithms']
    },
    {
        title: 'NexHacks 2026',
        award: 'Qualifier (Top 800/7000+)',
        issuer: 'NexHacks (Carnegie Mellon University)',
        date: 'Jan 2026',
        description: 'Developed AdmitX, an AI-powered college advising platform at this selective 24-hour hackathon at CMU.',
        associated: 'Bentonville West High School',
        tags: ['AI', 'React', 'LiveKit']
    },
    {
        title: 'Congressional App Challenge 2025',
        award: '2nd Place',
        issuer: 'United States Congress (Arkansas District 3)',
        date: 'Nov 2025',
        description: 'Awarded 2nd place for OralScan, an AI-powered mobile application designed for early oral cancer detection.',
        associated: 'Bentonville West High School',
        tags: ['Flutter', 'TensorFlow', 'Python']
    },
    {
        title: 'VibeCon 2025 (YC x Emergent x Anthropic x AWS)',
        award: 'Top 25',
        issuer: 'Y Combinator HQ, San Francisco',
        date: 'Nov 2025',
        description: 'Selected for VibeCon (250/2,000+), a 48-hour buildathon at YC, where I built MirAI, an AI college counseling assistant.',
        associated: 'Bentonville West High School',
        tags: ['AI', 'MirAI']
    },
    {
        title: 'HogHacks 2025',
        award: '4th Place & Best Implementation Award',
        issuer: 'University of Arkansas',
        date: 'Apr 2025',
        description: 'Won Best Implementation for ChakraClash, a cross-platform AI fitness app using Flutter, TensorFlow, and FastAPI.',
        associated: 'Bentonville West High School',
        tags: ['Flutter', 'TensorFlow', 'FastAPI']
    },
    {
        title: 'High School Programming Competition',
        award: 'Top 10 (8th Place)',
        issuer: 'University of Arkansas CSCE',
        date: 'Mar 2025',
        description: 'Placed 8th out of 25 teams while representing Bentonville West High School. Solved problems in Python.',
        associated: 'Bentonville West High School',
        tags: ['Python']
    },
    {
        title: 'CyberPatriot',
        award: '2nd Place (State Platinum Division)',
        issuer: 'AFA CyberPatriot',
        date: 'Dec 2024',
        description: 'Placed 2nd in Arkansas’s highest tier in the State Round, focusing on Windows Server security and advanced defense. Top 10% out of 3,200+ teams.',
        associated: 'Ignite Professional Studies',
        tags: ['Cybersecurity', 'Windows Server']
    },
    {
        title: 'Arvest Hackathon',
        award: '1st Place',
        issuer: 'Arvest Bank',
        date: 'Nov 2024',
        description: 'Secured 1st place with a multilingual chatbot designed to enhance financial literacy by translating the Arvest website.',
        associated: 'Ignite Professional Studies',
        tags: ['Translation', 'Fintech']
    },
    {
        title: 'All-Regional Coding Competition',
        award: 'State Qualifier',
        issuer: 'Division of Elementary and Secondary Education (Arkansas)',
        date: 'Feb 2024',
        description: 'Qualified for State, ranking 12th in the region and 2nd in our school.',
        associated: 'Bentonville West High School'
    }
];

const Competitions: React.FC = () => {
    return (
        <section id="competitions" className="py-16 px-8 max-w-[1200px] mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-4xl font-bold m-0 border-b-2 border-accent pb-2">Competitions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {competitions.map((comp, index) => (
                    <div 
                        key={index} 
                        className="group relative bg-gradient-to-br from-[#1f1f1f] to-[#151515] rounded-2xl p-6 border border-[#333] transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_rgba(3,218,198,0.1)] overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold text-white m-0">{comp.title}</h3>
                                <span className="text-sm text-secondary">{comp.date}</span>
                            </div>
                            <div className="text-accent font-semibold text-[0.95rem]">{comp.award}</div>
                            <div className="text-sm text-[#aaa] italic">{comp.issuer}</div>
                            {comp.associated && (
                                <div className="text-[0.8rem] text-secondary">
                                    Associated with {comp.associated}
                                </div>
                            )}
                            <p className="text-[0.9rem] text-[#ccc] leading-relaxed my-2">{comp.description}</p>
                            {comp.tags && comp.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {comp.tags.map((tag, i) => (
                                        <span key={i} className="bg-accent/10 text-accent px-2.5 py-1 rounded-md text-[0.75rem] border border-accent/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Competitions;
