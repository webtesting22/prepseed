import React from "react";
import { Link } from "react-router-dom";
import "./AllModules.css";
import industriesData from "../../Industries/IndustriesData";

const AllModules = () => {
    return (
        <div className="all-modules-container">
            <div className="modules-header">
                <h1 className="modules-title">All Industries & Modules</h1>
                <p className="modules-subtitle">
                    Explore our comprehensive software solutions across different industries
                </p>
            </div>
            
            <div className="industries-grid">
                {industriesData.map((industry, index) => (
                    <Link 
                        to={`/industry/${encodeURIComponent(industry.title)}`} 
                        key={index}
                        className="industry-card"
                    >
                        <div className="card-image">
                            <img src={industry.image} alt={industry.title} />
                        </div>
                        <div className="card-content">
                            <h3 className="industry-title">{industry.title}</h3>
                            <p className="industry-description">{industry.description}</p>
                            <div className="card-action">
                                <span className="action-text">View Modules</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllModules;