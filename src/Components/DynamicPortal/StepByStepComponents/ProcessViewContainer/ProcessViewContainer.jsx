import React, { useContext, useState, useEffect } from "react";
import DynamicPortalContext from "../../CommonContext/DynamicPortalContext";
import SelectIndustryContainer from "../SelectIndustryContainer/SelectIndustryContainer";
import SelectModulesContainer from "../SelectModulesContainer/SelectModulesContainer";
import IdentityContainer from "../IdentityContainer/IdentityContainer";
import LogoUploadContainer from "./LogoUploadContainer";
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
        }, 10000); // 10 seconds for smoother animation

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
                    setBatteryLevel(100);
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

            <div className="main-content-empty">
                <div className="mockups-container">
                    <div className="iphone-mockup">
                        <div className="iphone-frame">
                            <div className="iphone-notch"></div>
                            <div className="iphone-screen">
                                <div className="iphone-status-bar">
                                    <div className="status-left">
                                        <span className="time">9:41</span>
                                    </div>
                                    <div className="dynamic-island">
                                        <div className="island-camera"></div>
                                        <div className="island-speaker"></div>
                                    </div>
                                    <div className="status-right">
                                        <div className="signal-bars">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div className="wifi-icon">
                                            <FaWifi />
                                        </div>
                                        <div className="battery">
                                            <div
                                                className={`battery-level ${batteryLevel <= 20 ? 'low' : ''} ${isActive ? 'active' : ''}`}
                                                style={{ 
                                                    backgroundColor: getBatteryColor(batteryLevel),
                                                    width: `${(batteryLevel / 100) * 18}px`
                                                }}
                                            >
                                                <span>{getBatteryIcon(batteryLevel)}</span>
                                            </div>
                                            <span className="battery-percentage">{batteryLevel.toFixed(1)}%</span>
                                            {isActive && (
                                                <span className="drain-indicator" title={`Drain rate: ${drainRate.toFixed(1)}x`}>
                                                    ⚡
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="iphone-content">
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
                                            <span className="battery-status">
                                                {isActive ? `⚡ ${drainRate.toFixed(1)}x` : '💤 Idle'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Low Battery Warning Overlay */}
                                {showLowBattery && (
                                    <div className="low-battery-overlay">
                                        <div className="low-battery-content">
                                            <div className="battery-warning-icon">🔋</div>
                                            <h4>Low Battery</h4>
                                            <p>Battery level: {batteryLevel}%</p>
                                            <button
                                                className="connect-charge-btn"
                                                onClick={handleConnectCharge}
                                            >
                                                <FaBolt /> Connect to Charge
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Charging Overlay */}
                                {showCharging && (
                                    <div className="charging-overlay">
                                        <div className="charging-content">
                                            <div className="charging-animation">
                                                <FaBolt className="lightning-bolt" />
                                                <div className="charging-pulse"></div>
                                            </div>
                                            <h4>Charging...</h4>
                                            <p>Battery level: {batteryLevel}%</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="macbook-mockup">
                        <div className="macbook-frame">
                            <div className="macbook-screen">
                                <div className="macbook-notch"></div>
                                <div className="macbook-content">
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
                            <div className="macbook-base"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessViewContainer;