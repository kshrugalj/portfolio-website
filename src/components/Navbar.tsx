
import React from 'react';

const Navbar: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { label: 'home', id: 'home' },
        { label: 'current projects', id: 'current-projects' },
        { label: 'past projects', id: 'projects' },
        { label: 'competitions', id: 'competitions' },
        { label: 'experience/education', id: 'experience-education' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 py-4 px-8 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-white/5">
            <div className="max-w-[1200px] mx-auto flex justify-center">
                <ul className="flex gap-8 md:gap-12 items-center m-0 p-0 list-none">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.id);
                                }}
                                className="text-secondary hover:text-accent uppercase tracking-widest text-[0.7rem] md:text-xs font-bold transition-all duration-300 relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
