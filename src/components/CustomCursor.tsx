
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <div 
            className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-opacity duration-300 hidden lg:block ${isHidden ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
                transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
            }}
        >
            <div className={`w-full h-full border border-accent rounded-full transition-all duration-300 flex items-center justify-center ${isPointer ? 'scale-150 bg-accent/10' : 'scale-100'}`}>
                <div className={`w-1 h-1 bg-accent rounded-full transition-all duration-300 ${isPointer ? 'scale-0' : 'scale-100'}`}></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-accent opacity-20 rounded-full blur-md animate-pulse"></div>
        </div>
    );
};

export default CustomCursor;
