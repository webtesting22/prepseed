import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PoliciesData from "./PoliciesData";
import "./Policies.css";

const Policies = () => {
    const { policyType } = useParams();
    const navigate = useNavigate();

    // Get the policy data based on the URL parameter
    const policyData = PoliciesData[policyType];

    // If no valid policy is found, redirect to privacy policy
    if (!policyData) {
        navigate("/privacy-policy");
        return null;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="MainContainer paddingBottom50 paddingTop50">
            <div className="Container">
                <div className="policies-header">
                    {/* <button 
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button> */}
                    <h1 className="policy-title">{policyData.title}</h1>
                    <p className="policy-last-updated">Last updated: {policyData.lastUpdated}</p>
                </div>

                <div className="policy-content-wrapper">
                    {policyData.content}
                </div>
            </div>
        </div>
    );
};

export default Policies;