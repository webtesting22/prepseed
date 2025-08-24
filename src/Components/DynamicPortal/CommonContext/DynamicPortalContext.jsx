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
    goToStep: () => {},
    // Personal Information
    personalInfo: {},
    updatePersonalInfo: () => {},
    updatePersonalInfoBatch: () => {},
    isPersonalInfoComplete: () => false,
    // Data Management
    clearAllData: () => {},
    // Portal Creation
    isCreatingPortal: false,
    portalCreationProgress: 0,
    isAllStepsCompleted: () => false,
    startPortalCreation: () => false,
    getPortalData: () => ({})
});

export default DynamicPortalContext;