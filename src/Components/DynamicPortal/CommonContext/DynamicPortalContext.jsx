import { createContext } from "react";

const DynamicPortalContext = createContext({
    isPortalOpen: false,
    setIsPortalOpen: () => {},
    currentStep: 0,
    setCurrentStep: () => {},
    steps: [],
    stepHistory: [0],
    nextStep: () => {},
    prevStep: () => {},
    goToStep: () => {}
});

export default DynamicPortalContext;