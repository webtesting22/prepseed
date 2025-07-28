import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllModules.css";
import modulesData from "../ModulesData";

const AllModules = () => {
    // Function to truncate text to 10 words
    const truncateToWords = (text, wordLimit = 10) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) {
            return text;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Convert modulesData object to array for mapping
    const modulesArray = Object.values(modulesData);

    return (
        <div className="MainContainer paddingBottom50 all-modules-section paddingTop">
            <div className="Container">
                <div class="flex-column-widthGap maxWidth600">
                    <h2 className="textCenter">All Industries & <span>Modules</span></h2>
                    <p className="textCenter paraWeight">
                        Explore our comprehensive software solutions across different industries
                    </p>
                </div>

                <div className="all-modules-grid paddingTop50   ">
                    {modulesArray.map((industry, index) => (
                        <Link
                            to={`/industry/${encodeURIComponent(industry.title)}`}
                            key={index}
                            className="all-modules-card"
                        >
                            <div className="all-modules-card-image">
                                <img src={industry.image} alt={industry.title} />
                            </div>
                            <div className="all-modules-card-content">
                                <h3 className="all-modules-card-title">{industry.title}</h3>
                                <p className="all-modules-card-description">
                                    {truncateToWords(industry.description)}
                                </p>
                                <div className="all-modules-card-action">
                                    <span className="all-modules-action-text">View Modules</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllModules;