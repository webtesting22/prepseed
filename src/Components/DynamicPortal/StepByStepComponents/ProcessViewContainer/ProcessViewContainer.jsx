import React, { useContext, useState, useEffect } from "react";
import DynamicPortalContext from "../../CommonContext/DynamicPortalContext";
import SelectIndustryContainer from "../SelectIndustryContainer/SelectIndustryContainer";
import SelectModulesContainer from "../SelectModulesContainer/SelectModulesContainer";
import IdentityContainer from "../IdentityContainer/IdentityContainer";
import LogoUploadContainer from "./LogoUploadContainer";
import Portal from "../Portal/Portal";
// import DynamicPreview from "./DynamicPreview";
import "./ProcessViewContainer.css";
import { FaWifi, FaBolt, FaTimes } from "react-icons/fa";

const ProcessViewContainer = () => {
    const {
        currentStep,
        steps,
        nextStep,
        prevStep,
        goToStep
    } = useContext(DynamicPortalContext);
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [showLowBattery, setShowLowBattery] = useState(false);
    const [showCharging, setShowCharging] = useState(false);
    const [isCharging, setIsCharging] = useState(false);
    const [drainRate, setDrainRate] = useState(1);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Faster updates for smoother animation (every 10 seconds)
        const batteryInterval = setInterval(() => {
            setBatteryLevel(prev => {
                if (prev > 0) {
                    const newLevel = prev - (drainRate / 6); // Divide by 6 since we update every 10s instead of 60s
                    if (newLevel <= 20 && !showLowBattery) {
                        setShowLowBattery(true);
                    }
                    return Math.max(0, newLevel);
                }
                return 0;
            });
        }, 3000); // 10 seconds for smoother animation

        // Simulate user activity (random drain rate changes)
        const activityInterval = setInterval(() => {
            const randomActivity = Math.random();
            if (randomActivity > 0.7) {
                setIsActive(true);
                setDrainRate(prev => Math.min(prev + 0.5, 3)); // Increase drain rate
            } else if (randomActivity < 0.3) {
                setIsActive(false);
                setDrainRate(prev => Math.max(prev - 0.3, 0.5)); // Decrease drain rate
            }
        }, 30000); // Change activity every 30 seconds

        return () => {
            clearInterval(batteryInterval);
            clearInterval(activityInterval);
        };
    }, [showLowBattery, drainRate]);

    const handleConnectCharge = () => {
        setIsCharging(true);
        setShowCharging(true);
        setShowLowBattery(false);

        // Animated charging effect
        let chargeLevel = batteryLevel;
        const chargeInterval = setInterval(() => {
            chargeLevel += 10;
            setBatteryLevel(chargeLevel);
            if (chargeLevel >= 100) {
                clearInterval(chargeInterval);
                setTimeout(() => {
                    setShowCharging(false);
                    setIsCharging(false);
                    setBatteryLevel(50);
                    setDrainRate(1); // Reset drain rate
                }, 500);
            }
        }, 100); // Charge 10% every 100ms for smooth animation
    };

    const getBatteryColor = (level) => {
        if (level > 50) return "#4ade80";
        if (level > 20) return "#fbbf24";
        return "#ef4444";
    };

    const getBatteryIcon = (level) => {
        if (level > 50) return "🔋";
        if (level > 20) return "⚠️";
        return "🔴";
    };

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
            <div className="PortalPreviewContainers">
                <Portal />
            </div>

        </div>
    );
};

export default ProcessViewContainer;