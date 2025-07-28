import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-animation">
                    <div className="four-left">4</div>
                    <div className="zero-void">
                        <div className="void-hole"></div>
                        <div className="floating-element"></div>
                    </div>
                    <div className="four-right">4</div>
                </div>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-description">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn primary">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;