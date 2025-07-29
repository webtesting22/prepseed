import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./SingleModule.css";
import modulesData from "../ModulesData";

const SingleModule = () => {
    const { moduleId } = useParams();
    
    // Find the module across all industries
    let moduleData = null;
    let industryName = "";
    
    for (const [industry, data] of Object.entries(modulesData)) {
        const foundModule = data.modules.find(module => module.id === moduleId);
        if (foundModule) {
            moduleData = foundModule;
            industryName = industry;
            break;
        }
    }

    if (!moduleData) {
        return (
            <div className="MainContainer paddingBottom50 single-module-section">
                <div className="Container">
                    <div className="single-module-container">
                        <div className="module-not-found">
                            <h1>Module Not Found</h1>
                            <p>The module you're looking for could not be found.</p>
                            <Link to="/modules" className="back-link">Back to All Modules</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="MainContainer paddingBottom50 single-module-section">
            <div className="Container">
                <div className="single-module-container">
                    {/* Breadcrumb Navigation */}
                    <div className="breadcrumb">
                        <Link to="/modules">All Modules</Link>
                        <span> / </span>
                        <Link to={`/industry/${encodeURIComponent(industryName)}`}>{industryName}</Link>
                        <span> / </span>
                        <span>{moduleData.title}</span>
                    </div>
                    
                    {/* Module Hero Section */}
                    <div className="module-hero">
                        <div className="module-info">
                            <h1 className="module-title">{moduleData.title}</h1>
                            <p className="module-description">{moduleData.description}</p>
                            {/* <div className="module-meta">
                                <div className="meta-item">
                                    <span className="label">Price:</span>
                                    <span className="value">{moduleData.price}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="label">Duration:</span>
                                    <span className="value">{moduleData.duration}</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    
                    {/* Module Content */}
                    <div className="module-content">
                        {/* Features Section */}
                        <div className="features-section">
                            <h2>Key Features</h2>
                            <div className="features-grid">
                                {moduleData.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                        </svg>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* CTA Section */}
                        <div className="cta-section">
                            <h2>Ready to Get Started?</h2>
                            <p>Contact us to learn more about this module and how it can benefit your business.</p>
                            <div className="cta-buttons">
                                <button className="primary-btn">Request Demo</button>
                                <button className="secondary-btn">Contact Sales</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleModule;