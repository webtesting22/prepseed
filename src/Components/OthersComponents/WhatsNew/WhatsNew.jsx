import React from "react";
import "./WhatsNew.css";
import WhatsNewModuleData from "./WhatsNewModuleData";

const WhatsNew = () => {
    const { mainCard, featureCards } = WhatsNewModuleData;

    return (
        <div className="whats-new-container paddingTop50 paddingBottom50">
            <div className="whats-new-wrapper">
                {/* Header Section */}
                <div className="flex-column-widthGap">
                    <h2 className="textCenter">
                        What's <span >New</span>
                    </h2>
                    <p className="textCenter paraWeight" style={{marginTop:"0px"}}>
                        Stay up to date with the latest product improvements and powerful new features
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="whats-new-grid paddingTop">
                    {/* Large Promotional Card */}
                    <div className="main-card">
                        <div className="main-card-image">
                            <img src={mainCard.image} alt="Version 2.0 Update" />
                        </div>
                        <div className="main-card-content">
                            <div className="card-header">
                                <h3 className="card-title">{mainCard.title}</h3>
                                <div className="card-tags">
                                    {mainCard.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="card-description">{mainCard.description}</p>
                            {/* <a href="#" className="read-more-link">
                                Read more →
                            </a> */}
                        </div>
                    </div>

                    {/* Feature Cards Column */}
                    <div className="feature-cards">
                        {featureCards.map((card, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-card-icon">
                                   {card.icon}
                                </div>
                                <div className="feature-card-content">
                                    <div className="card-header">
                                        <h4 className="feature-card-title">{card.title}</h4>
                                        <div className="card-tags">
                                            {card.tags.map((tag, tagIndex) => (
                                                <span key={tagIndex} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="feature-card-description">{card.description}</p>
                                    {/* <a href="#" className="read-more-link">
                                        Read more →
                                    </a> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatsNew;


