import React from "react";
import { Link } from "react-router-dom";
import "./Industries.css";
import modulesData from "../Modules/ModulesData";

const Industries = () => {
    // Convert modulesData object to array for mapping
    const industriesArray = Object.values(modulesData);

    return (
        <div className="MainContainer paddingTop50 paddingBottom50 industries-section">
            <div className="Container">
                {/* Header Section */}
                <div className="flex-column-widthGap maxWidth600">
                    {/* <div >
                        <span className="section-label">/ INDUSTRIES</span>
                    </div> */}
                    <div>
                        <h2 className="textCenter">Made for <span>B2B Teams</span> in Every Industry</h2>
                        {/* <p></p> */}
                    </div>

                </div>

                {/* Industries Grid */}
                <div className="industries-grid marginTop50">
                    {industriesArray.slice(0, 4).map((industry, index) => (
                        <Link 
                            to={`/industry/${encodeURIComponent(industry.title)}`} 
                            key={index} 
                            className="industry-card"
                        >
                            <div className="industry-card-content">
                                <div className="industry-card-image">
                                    <img src={industry.image} alt={industry.title} />
                                </div>
                                <div className="industry-card-text">
                                    <h3 className="industry-title">{industry.title}</h3>
                                    <p className="industry-description">{industry.description}</p>
                                </div>
                                <div className="industry-card-action">
                                    <button className="industry-action-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
                <div style={{ display: "flex", justifyContent: "center" }} className="marginTop50">
                    <Link to="/modules" className="all-industries-btn">All Industries</Link>
                </div>
            </div>
        </div>
    );
};

export default Industries;