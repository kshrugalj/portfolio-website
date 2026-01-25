
import React from 'react';
import './Hero.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

const Hero: React.FC = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>
                        <Typewriter
                            options={{
                                strings: ["Kshrugal Reddy Jangalapalli"],
                                autoStart: true,
                                loop: false,
                                deleteSpeed: Infinity,
                            }}
                        />
                    </h1>
                    <h2>
                        <Typewriter
                            options={{
                                strings: ["Aitheria Full Stack Development Intern"],
                                autoStart: true,
                                loop: false,
                                deleteSpeed: Infinity,
                            }}
                        />
                    </h2>
                    <div className="hero-contact">
                        <span>Bentonville, AR</span>
                    </div>
                    <div className="hero-buttons">
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Resume</a>
                        <a href="https://www.linkedin.com/in/kshrugalj/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><FaLinkedin /></a>
                        <a href="https://github.com/kshrugalj" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><FaGithub /></a>
                        <a href="mailto:kshrugalj@gmail.com" className="btn btn-secondary"><FaEnvelope /></a>
                    </div>
                </div>
                <div className="hero-image-container">
                    <div className="hero-image">
                        <img src="/profile.jpg" alt="Kshrugal Reddy Jangalapalli" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
