import React, { useContext } from "react";
import DynamicPortalContext from "../../CommonContext/DynamicPortalContext";
import SelectIndustryContainer from "../SelectIndustryContainer/SelectIndustryContainer";
import SelectModulesContainer from "../SelectModulesContainer/SelectModulesContainer";
import IdentityContainer from "../IdentityContainer/IdentityContainer";
import LogoUploadContainer from "./LogoUploadContainer";
import "./ProcessViewContainer.css";

const ProcessViewContainer = () => {
    const {
        currentStep,
        steps,
        nextStep,
        prevStep,
        goToStep
    } = useContext(DynamicPortalContext);

    const renderCurrentComponent = () => {
        switch (currentStep) {
            case 0:
                return <LogoUploadContainer />;
            case 1:
                return <SelectIndustryContainer />;
            case 2:
                return <SelectModulesContainer />;
            case 3:
                return <IdentityContainer />;
            default:
                return <div>Step not found</div>;
        }
    };

    const getStepDescription = (stepIndex) => {
        const descriptions = {
            0: "Upload your logo and set brand identity",
            1: "Choose the industry that best fits your business needs",
            2: "Select the modules and features you want to include",
            3: "Provide your identity and company information"
        };
        return descriptions[stepIndex] || "";
    };

    return (
        <div className="process-container">
            <div className="sidebar">
                <div className="logo-section">
                    <div className="logo"><img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/3DLogo.png" alt="" /></div>
                </div>

                <div className="step-progress">
                    <div className="step-label">Step {currentStep + 1}</div>
                    <div className="step-title">{steps[currentStep]?.name}</div>
                    <div className="step-description">
                        {getStepDescription(currentStep)}
                    </div>

                    <div className="progress-bar">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`progress-segment ${index < currentStep ? 'completed' :
                                    index === currentStep ? 'active' : ''
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="sidebar-content">
                    {/* <div className="content-header">
                        <h1 className="main-title">{steps[currentStep]?.name}</h1>
                        <p className="subtitle">{getStepDescription(currentStep)}</p>
                    </div> */}

                    <div className="breadcrumb">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <span
                                    className={`breadcrumb-step ${index < currentStep ? 'completed' :
                                        index === currentStep ? 'current' : 'future'
                                        }`}
                                    onClick={() => index <= currentStep && goToStep(index)}
                                >
                                    {step.name}
                                </span>
                                {index < steps.length - 1 && (
                                    <span className="breadcrumb-arrow">→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="content-card">
                        {renderCurrentComponent()}
                    </div>

                    <div className="navigation-buttons">
                        <button
                            className="prev-button"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                        >
                            ← Previous step
                        </button>

                        <span className="step-counter">
                            Step {currentStep + 1} of {steps.length}
                        </span>

                        <button
                            className="next-button"
                            onClick={nextStep}
                            disabled={currentStep === steps.length - 1}
                        >
                            Next step →
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-content-empty">
                <div className="mockups-container">
                    <div className="iphone-mockup">
                        <img 
                            src="/src/Components/DynamicPortal/Mocups/iphonemockup.svg" 
                            alt="iPhone 15 Pro Max Mockup"
                            className="mockup-image iphone-svg"
                        />
                        <div className="iphone-screen-content">
                            <div className="iphone-header">
                                <h3>Mobile Preview</h3>
                                <p>iPhone 15 Pro Max</p>
                            </div>
                            <div className="iphone-body">
                                <div className="mock-logo">
                                    <span>🎨</span>
                                    <h4>Brand Logo</h4>
                                </div>
                                <div className="mock-features">
                                    <div className="feature-item">
                                        <span>✨</span>
                                        <span>Responsive Design</span>
                                    </div>
                                    <div className="feature-item">
                                        <span>📱</span>
                                        <span>Mobile Optimized</span>
                                    </div>
                                    <div className="feature-item">
                                        <span>🎯</span>
                                        <span>Touch Friendly</span>
                                    </div>
                                </div>
                                <div className="mock-status">
                                    <span className="status-dot active"></span>
                                    <span>Mobile Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="macbook-mockup">
                        <img 
                            src="/src/Components/DynamicPortal/Mocups/PcMocupImage.svg" 
                            alt="MacBook Pro Mockup"
                            className="mockup-image macbook-svg"
                        />
                        <div className="macbook-screen-content">
                            <div className="macbook-menu-bar">
                                <div className="menu-left">
                                    <span className="apple-logo">🍎</span>
                                    <span>PrepSeed Portal</span>
                                </div>
                                <div className="menu-center">
                                    <span>File</span>
                                    <span>Edit</span>
                                    <span>View</span>
                                    <span>Window</span>
                                    <span>Help</span>
                                </div>
                                <div className="menu-right">
                                    <div className="control-buttons">
                                        <span className="control-btn close"></span>
                                        <span className="control-btn minimize"></span>
                                        <span className="control-btn maximize"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="macbook-body">
                                <div className="mock-dashboard">
                                    <div className="dashboard-header">
                                        <h4>Portal Dashboard</h4>
                                        <span className="version">v2.1</span>
                                    </div>
                                    <div className="dashboard-stats">
                                        <div className="stat-card">
                                            <span className="stat-icon">📊</span>
                                            <div className="stat-info">
                                                <span className="stat-number">1,247</span>
                                                <span className="stat-label">Users</span>
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <span className="stat-icon">🚀</span>
                                            <div className="stat-info">
                                                <span className="stat-number">89%</span>
                                                <span className="stat-label">Uptime</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mock-chart">
                                        <div className="chart-bar" style={{ height: '60%' }}></div>
                                        <div className="chart-bar" style={{ height: '80%' }}></div>
                                        <div className="chart-bar" style={{ height: '45%' }}></div>
                                        <div className="chart-bar" style={{ height: '95%' }}></div>
                                        <div className="chart-bar" style={{ height: '70%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessViewContainer;