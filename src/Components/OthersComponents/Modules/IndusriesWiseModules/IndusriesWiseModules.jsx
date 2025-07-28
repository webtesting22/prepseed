import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./IndusriesWiseModules.css";
import modulesData from "../ModulesData";

const IndusriesWiseModules = () => {
    const { industryName } = useParams();
    const decodedIndustryName = decodeURIComponent(industryName);

    // Find the industry data from modulesData
    const industryData = modulesData[decodedIndustryName];

    if (!industryData) {
        return (
            <div className="MainContainer paddingBottom50 industry-modules-section">
                <div className="Container">
                    <div className="industry-modules-container">
                        <div className="industry-not-found">
                            <h1>Industry Not Found</h1>
                            <p>The industry "{decodedIndustryName}" could not be found.</p>
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
        <div className="MainContainer paddingBottom50 industry-modules-section">
            <div className="Container">
                <div className="industry-modules-container">
                    {/* Industry Header */}
                    <div className="industry-header">
                        <div className="industry-info">
                            <img src={industryData.image} alt={industryData.title} className="industry-icon" />
                            <div>
                                <h1 className="industry-title">{industryData.title}</h1>
                                <p className="industry-description">{industryData.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Modules Grid */}
                    <div className="modules-grid">
                        {industryData.modules.map((module) => (
                            <Link
                                to={`/module/${module.id}`}
                                key={module.id}
                                className="module-card"
                            >
                                <div className="module-header">
                                    <h3 className="module-title">{module.title}</h3>
                                    {/* <div className="module-price">{module.price}</div> */}
                                </div>
                                <p className="module-description">{module.description}</p>
                                <div className="module-features">
                                    {module.features.slice(0, 3).map((feature, index) => (
                                        <span key={index} className="feature-tag">{feature}</span>
                                    ))}
                                </div>
                                <div className="all-modules-card-action">
                                    <span className="all-modules-action-text">View Modules</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndusriesWiseModules;