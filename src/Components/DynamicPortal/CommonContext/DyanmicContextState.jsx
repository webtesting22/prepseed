import React, { useState } from "react";
import DynamicPortalContext from "./DynamicPortalContext";

const DyanmicContextState = ({ children }) => {
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [stepHistory, setStepHistory] = useState([0]);
    
    const steps = [
        { id: 0, name: "Process View", component: "ProcessView" },
        { id: 1, name: "Select Industry", component: "SelectIndustry" },
        { id: 2, name: "Select Modules", component: "SelectModules" },
        { id: 3, name: "Identity", component: "Identity" }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            setStepHistory([...stepHistory, newStep]);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            setStepHistory([...stepHistory, newStep]);
        }
    };

    const goToStep = (stepIndex) => {
        setCurrentStep(stepIndex);
        setStepHistory([...stepHistory, stepIndex]);
    };

    return (
        <DynamicPortalContext.Provider value={{ 
            isPortalOpen, 
            setIsPortalOpen,
            currentStep,
            setCurrentStep,
            steps,
            stepHistory,
            nextStep,
            prevStep,
            goToStep
        }}>
            {children}
        </DynamicPortalContext.Provider>
    );
};

export default DyanmicContextState;