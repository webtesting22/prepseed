import React, { useState, useEffect } from 'react';
import './Loader.css';
import PrepseedIcon from '/Images/3DLogo.png';

const Loader = ({ onLoadingComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showLogo, setShowLogo] = useState(true);
    const [logoGlow, setLogoGlow] = useState(false);
    const [slideAnimation, setSlideAnimation] = useState(false);

    useEffect(() => {
        // Logo glow effect - 2 times
        const glowTimer = setTimeout(() => {
            setLogoGlow(true);
        }, 200);

        const glowOffTimer = setTimeout(() => {
            setLogoGlow(false);
        }, 400);

        const glowTimer2 = setTimeout(() => {
            setLogoGlow(true);
        }, 600);

        const glowOffTimer2 = setTimeout(() => {
            setLogoGlow(false);
        }, 800);

        // Hide logo and start slide animation
        const hideLogoTimer = setTimeout(() => {
            setShowLogo(false);
            setSlideAnimation(true);
        }, 1000);

        // Complete loading after slide animation
        const completeTimer = setTimeout(() => {
            setIsLoading(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, 2800);

        return () => {
            clearTimeout(glowTimer);
            clearTimeout(glowOffTimer);
            clearTimeout(glowTimer2);
            clearTimeout(glowOffTimer2);
            clearTimeout(hideLogoTimer);
            clearTimeout(completeTimer);
        };
    }, [onLoadingComplete]);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="loader-container">
            {/* Top slide part */}
            <div className={`loader-slide loader-slide-top ${slideAnimation ? 'slide-top' : ''}`}></div>
            
            {/* Bottom slide part */}
            <div className={`loader-slide loader-slide-bottom ${slideAnimation ? 'slide-bottom' : ''}`}></div>
            
            {/* Logo section */}
            {showLogo && (
                <div className="loader-logo-container">
                    <img 
                        src={PrepseedIcon} 
                        alt="Prepseed" 
                        className={`loader-logo ${logoGlow ? 'logo-glow' : ''}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Loader; 