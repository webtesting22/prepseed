import React from "react";
import "./SlidesClients.css";
import ClientsData from "../ClientsData";
import { Link } from "react-router-dom";
const SlidesClients = () => {
    // Filter out hidden clients and get only first 10 visible ones
    const visibleClients = ClientsData.filter(client => !client.hide).slice(0, 10);

    // Create seamless infinite scroll by duplicating the array multiple times
    const duplicatedLogos = [...visibleClients, ...visibleClients, ...visibleClients, ...visibleClients, ...visibleClients];

    return (
        <div className="clients-section MainContainer paddingTop50 paddingBottom50">
            <div className="Container">
                <div className="clients-header">
                    <h2 className="clients-title">
                        Trusted by innovative companies and forward-thinking founders
                    </h2>
                </div>

                <div className="clients-carousel">
                    <div className="clients-track">
                        {duplicatedLogos.map((client, index) => (
                            <div key={index} className="client-logo">
                                <div className="logo-icon">
                                    <img
                                        src={client.logo}
                                        alt={client.name}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <div className="fallback-icon" style={{ display: 'none' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="logo-text">{client.name}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }} className="marginTop50">
                        <Link to="/our-clients">
                            <button className="all-industries-btn">View All Clients</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlidesClients;