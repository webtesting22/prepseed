import React, { useState,useEffect } from "react";
import "./AllClients.css";
import ClientsData from "../ClientsData";

const AllClients = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Filter out hidden clients
    const visibleClients = ClientsData.filter(client => !client.hide);

    const handleCardClick = (client) => {
        // Priority: websiteUrl > portalUrl > no action
        if (client.websiteUrl) {
            window.open(client.websiteUrl, '_blank');
        } else if (client.portalUrl) {
            window.open(client.portalUrl, '_blank');
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
        <div className="MainContainer  paddingBottom50 AllClientsContainer">
            <div className="Container ">
                <div className="flex-column-widthGap maxWidth600 paddingTop">
                    <h2 className="textCenter">We <span>Work</span> With</h2>
                    <p className="textCenter paraWeight">Trusted by innovative companies and forward-thinking founders</p>
                </div>

                <div className="all-clients-grid paddingTop50">
                    {visibleClients.map((client, index) => (
                        <div
                            key={index}
                            className="client-card"
                            onClick={() => handleCardClick(client)}
                        >
                            <div className="card-header">
                                <div className="logo-container">
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div className="fallback-logo" style={{ display: 'none' }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* {client.tags && client.tags[0] !== "-" && (
                                    <span className="client-tag">{client.tags[0]}</span>
                                )} */}
                            </div>

                            <div className="card-content">
                                <h3 className="client-name">{client.name}</h3>
                                {/* {client.portalUrl && (
                                    <div className="client-links">
                                        <a 
                                            href={client.portalUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="portal-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Portal
                                        </a>
                                        {client.websiteUrl && (
                                            <a 
                                                href={client.websiteUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="website-link"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Website
                                            </a>
                                        )}
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllClients;