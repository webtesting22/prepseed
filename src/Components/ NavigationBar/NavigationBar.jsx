import React, { useState } from "react";
import "./NavigationBar.css";
import NavigationNarLinksData from "./NavigationNarLinksData";
import NavigationTransition from "../NavigationTransition/NavigationTransition";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navigation-bar">
            <div className="nav-container">
                {/* Logo Section */}
                <Link to="/">
                    <div className="nav-logo">
                        <img src="/Images/PrepseedLogo.svg" alt="Prepseed" className="logo-image" />
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="nav-links desktop-nav">
                    {NavigationNarLinksData.map((item, index) => (
                        <React.Fragment key={index}>
                            <NavigationTransition to={item.link} className="nav-link">
                                {item.name}
                            </NavigationTransition>
                            {index < NavigationNarLinksData.length - 1 && (
                                <span className="nav-separator">•</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Action Buttons */}
                <div className="nav-actions">
                    <Link to="tel:+919913382221" className="nav-btn primary-btn">Contact Prepseed</Link>
                    {/* <button className="nav-btn secondary-btn">View Services</button> */}
                    {/* <Link to="mailto:vivek@prepseed.com" className="nav-btn primary-btn">vivek@prepseed.com</Link> */}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-links">
                    {NavigationNarLinksData.map((item, index) => (
                        <NavigationTransition 
                            key={index} 
                            to={item.link} 
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                        >
                            {item.name}
                        </NavigationTransition>
                    ))}
                </div>
                <div className="mobile-menu-actions">
                    <Link to="tel:+919913382221" className="nav-btn primary-btn" onClick={closeMobileMenu}>Contact Prepseed</Link>
                    {/* <button className="nav-btn secondary-btn">View Services</button> */}
                    {/* <Link to="mailto:vivek@prepseed.com" className="nav-btn primary-btn">vivek@prepseed.com</Link> */}
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;