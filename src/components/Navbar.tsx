
import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-menu centered">
                    <li className="nav-item">
                        <a href="#home" onClick={() => scrollToSection('home')} className="nav-links">
                            home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#projects" onClick={() => scrollToSection('projects')} className="nav-links">
                            projects
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#experience-education" onClick={() => scrollToSection('experience-education')} className="nav-links">
                            experience/education
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
