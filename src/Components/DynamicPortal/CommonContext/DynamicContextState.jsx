import React, { useState, useEffect } from "react";
import axios from "axios";
import DynamicPortalContext from "./DynamicPortalContext";

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DynamicContextState = ({ children }) => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([0]);

  // Industries state
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [industriesLoading, setIndustriesLoading] = useState(true);
  const [industriesError, setIndustriesError] = useState("");

  // Modules state
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [modulesError, setModulesError] = useState("");

  const steps = [
    { id: 0, name: "Logo & Branding", component: "LogoUpload" },
    { id: 1, name: "Select Industry", component: "SelectIndustry" },
    { id: 2, name: "Select Modules", component: "SelectModules" },
    { id: 3, name: "Identity", component: "Identity" },
  ];

  // Function to fetch industries from API
  const fetchIndustries = async () => {
    try {
      setIndustriesLoading(true);
      setIndustriesError("");

      const response = await axios.get(`${API_BASE_URL}/industry`);

      if (response.data.success && response.data.data) {
        // Filter only active industries and sort by order
        const activeIndustries = response.data.data
          .filter((industry) => industry.isActive)
          .sort((a, b) => a.order - b.order);

        setIndustries(activeIndustries);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
      setIndustriesError(`Failed to load industries: ${error.message}`);
    } finally {
      setIndustriesLoading(false);
    }
  };

  // Function to fetch modules from API
  const fetchModules = async () => {
    try {
      setModulesLoading(true);
      setModulesError("");

      const response = await axios.get(`${API_BASE_URL}/modules`);

      if (response.data.success && response.data.data) {
        // Filter only active modules and sort by order
        const activeModules = response.data.data
          .filter((module) => module.isActive)
          .sort((a, b) => a.order - b.order);

        setModules(activeModules);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      setModulesError(`Failed to load modules: ${error.message}`);
    } finally {
      setModulesLoading(false);
    }
  };

  // Function to handle industry selection
  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    console.log("Selected industry:", industry);
  };

  // Function to handle module selection
  const handleModuleToggle = (moduleId) => {
    setSelectedModules((prev) => {
      if (prev.includes(moduleId)) {
        // Remove module if already selected
        return prev.filter((id) => id !== moduleId);
      } else {
        // Add module if not selected
        return [...prev, moduleId];
      }
    });
  };

  // Function to check if module is selected
  const isModuleSelected = (moduleId) => {
    return selectedModules.includes(moduleId);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchIndustries();
    fetchModules();
  }, []);

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
    <DynamicPortalContext.Provider
      value={{
        isPortalOpen,
        setIsPortalOpen,
        currentStep,
        setCurrentStep,
        steps,
        stepHistory,
        nextStep,
        prevStep,
        goToStep,
        // Industries
        industries,
        selectedIndustry,
        industriesLoading,
        industriesError,
        fetchIndustries,
        handleIndustrySelect,
        // Modules
        modules,
        selectedModules,
        modulesLoading,
        modulesError,
        fetchModules,
        handleModuleToggle,
        isModuleSelected,
      }}
    >
      {children}
    </DynamicPortalContext.Provider>
  );
};

export default DynamicContextState;
