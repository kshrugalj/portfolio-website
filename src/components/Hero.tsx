
import React from 'react';
import Typewriter from 'typewriter-effect';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero: React.FC = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-8 relative overflow-hidden bg-background">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent opacity-5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent opacity-5 rounded-full blur-[100px] animate-pulse"></div>

            <div className="z-10 flex flex-col items-center">
                <div className="mb-6 relative">
                    <div className="absolute -inset-1 bg-accent opacity-20 blur-md rounded-full"></div>
                    <img
                        src="/profile_rotated.jpg"
                        alt="Profile"
                        className="w-40 h-40 rounded-full object-cover border-2 border-accent/30 relative z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-[0_0_30px_rgba(3,218,198,0.2)] rotate-90"
                    />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
                    I'm <span className="text-accent">Kshrugal Jangalapalli</span>
                </h1>

                <div className="text-xl md:text-2xl text-secondary h-8 mb-8 font-medium italic">
                    <Typewriter
                        options={{
                            strings: ['Building Technical Systems', 'Chief Architect @ AitheriA', 'Incoming CS @ Georgia Tech'],
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed: 30,
                        }}
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-accent text-background font-bold rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(3,218,198,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] text-sm"
                    >
                        view resume
                    </a>
                    <a
                        href="https://github.com/kshrugalj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-white/20 hover:border-accent/50 text-white hover:text-accent font-bold rounded-lg transition-all duration-300 backdrop-blur-sm"
                        title="GitHub"
                    >
                        <FiGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kshrugalj/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-white/20 hover:border-accent/50 text-white hover:text-accent font-bold rounded-lg transition-all duration-300 backdrop-blur-sm"
                        title="LinkedIn"
                    >
                        <FiLinkedin size={20} />
                    </a>
                    <a
                        href="mailto:kshrugalj@gmail.com"
                        className="p-2.5 border border-white/20 hover:border-accent/50 text-white hover:text-accent font-bold rounded-lg transition-all duration-300 backdrop-blur-sm"
                        title="Email"
                    >
                        <FiMail size={20} />
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 animate-bounce text-secondary opacity-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
