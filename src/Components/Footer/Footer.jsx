import React from "react";
import "./Footer.css";
import NavigationNarLinksData from "../ NavigationBar/NavigationNarLinksData";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-main">
                    <div className="footer-grid">
                        {/* Company Info & Newsletter */}
                        <div className="footer-section">
                            <div className="company-info">
                                <h2 className="company-name">Prepseed</h2>
                                <p className="company-tagline">Trustify is the most used Chat Marketing Platform.</p>
                            </div>
                            <div className="newsletter-section">
                                <h3 className="newsletter-title">Subscribe to newsletter.</h3>
                                <div className="newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="email@provider.com"
                                        className="newsletter-input"
                                    />
                                    <button className="newsletter-button">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Pages */}
                        <div className="footer-section">
                            <h3 className="footer-heading">Main Pages</h3>
                            <ul className="footer-links">
                                {NavigationNarLinksData.map((item, index) => (
                                    <li key={index}><a href={item.link} className="footer-link">{item.name}</a></li>
                                ))}
                                {/* <li><a href="#Ifooter-link">Pricing</a></li> */}
                            </ul>
                        </div>

                        {/* Inner Pages */}
                        <div className="footer-section">
                            <h3 className="footer-heading">Inner Pages</h3>
                            <ul className="footer-links">
                                <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-use" className="footer-link">Terms of Use</Link></li>
                                <li><Link to="/refund-policy" className="footer-link">Refund Policy</Link></li>
                                <li><Link to="/shipping-delivery-policy" className="footer-link">Shipping and Delivery Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="footer-section">
                            <h3 className="footer-heading">Contact</h3>
                            <ul className="footer-links">
                                <li>
                                    <a href="tel:+919913382221" className="footer-link">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                        &nbsp;
                                        +91-99133-82221
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:vivek@prepseed.com" className="footer-link">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                        &nbsp;
                                        vivek@prepseed.com
                                    </a>
                                </li>
                                <li>
                                    <a href="https://maps.app.goo.gl/sfZwyjdmXFC96jGk9" target="_blank" className="footer-link">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                        &nbsp;
                                        A-408 Ratnaakar Nine Square Opposite ITC Narmada, Keshavbaug, Ahmedabad, Gujarat- 380015
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="social-links">
                            <a href="https://www.facebook.com/prepseed" target="_blank" className="social-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/prepseedportal/" target="_blank" className="social-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/prepseed" target="_blank" className="social-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UClDNIqiEgobCNdKTu-NWo3Q" target="_blank" className="social-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                        <div className="copyright">
                            © Made By Prepseed - License | Powered By Prepseed
                        </div>
                    </div>
                    <div className="webflow-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                        </svg>
                        Prepseed.com
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;  