import React, { useState, useEffect } from "react";
import axios from "axios";
import DynamicPortalContext from "./DynamicPortalContext";

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DynamicContextState = ({ children }) => {
  // LocalStorage key
  const STORAGE_KEY = 'dynamicPortalData';

  // Helper function to load data from localStorage
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return {};
    }
  };

  // Helper function to save data to localStorage
  const saveToStorage = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Load initial data from localStorage
  const savedData = loadFromStorage();

  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(savedData.currentStep || 0);
  const [stepHistory, setStepHistory] = useState(savedData.stepHistory || [0]);

  // Industries state
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(savedData.selectedIndustry || null);
  const [industriesLoading, setIndustriesLoading] = useState(true);
  const [industriesError, setIndustriesError] = useState("");

  // Modules state
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState(savedData.selectedModules || []);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [modulesError, setModulesError] = useState("");

  // Logo/Brand state
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(savedData.logoPreview || null);
  const [brandName, setBrandName] = useState(savedData.brandName || "");
  const [extractedColors, setExtractedColors] = useState(savedData.extractedColors || []);
  const [selectedColors, setSelectedColors] = useState(savedData.selectedColors || []);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState("");
  const [logoUploadSuccess, setLogoUploadSuccess] = useState(savedData.logoUploadSuccess || false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(savedData.uploadedLogoUrl || "");

  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState(savedData.personalInfo || {
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    companySize: "",
    location: ""
  });

  // Portal Creation state - These are temporary UI states and should not persist
  const [isCreatingPortal, setIsCreatingPortal] = useState(false);
  const [portalCreationProgress, setPortalCreationProgress] = useState(0);

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

  // Function to get filtered modules based on selected industry
  const getFilteredModules = () => {
    if (!selectedIndustry) {
      return []; // Return empty array if no industry is selected
    }

    return modules.filter((module) => {
      // Check if the module's industries array contains the selected industry
      return module.industries.some(
        (industry) => industry._id === selectedIndustry._id
      );
    });
  };

  // Function to upload logo to S3 using upload policy
  const uploadLogoToS3 = async (file) => {
    try {
      setLogoUploading(true);
      setLogoUploadError("");
      setLogoUploadSuccess(false);

      const filename = file.name;
      const mime = file.type.split("/")[1];

      const requestBody = {
        fileName: filename,
        mime: mime,
      };

      // Get upload policy from API
      const response = await fetch(`${API_BASE_URL}/chats/uploadPolicy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${window.localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Upload policy API failed: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();

      // Validate response structure
      if (!data.data || !data.data.fields || !data.data.url) {
        throw new Error("Invalid upload policy response structure");
      }

      // Create FormData for S3 upload
      const formData = new FormData();
      Object.entries(data.data.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      // Construct final URL
      const finalUrl = `${data.data.url}/${data.filePath}`;

      // Upload to S3
      const uploadResponse = await fetch(data.data.url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        setUploadedLogoUrl(finalUrl);
        setLogoUploadSuccess(true);
        return finalUrl;
      } else {
        const errorText = await uploadResponse.text();
        throw new Error(
          `S3 upload failed: ${uploadResponse.status} - ${errorText}`
        );
      }
    } catch (error) {
      setLogoUploadError(`Failed to upload logo: ${error.message}`);
      throw error;
    } finally {
      setLogoUploading(false);
    }
  };

  // Function to handle logo file selection
  const handleLogoFileSelect = (file) => {
    setLogoFile(file);
    setLogoUploadError("");
    setLogoUploadSuccess(false);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Function to remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setExtractedColors([]);
    setSelectedColors([]);
    setLogoUploadError("");
    setLogoUploadSuccess(false);
    setUploadedLogoUrl("");
  };

  // Function to handle color selection
  const handleColorSelect = (color, index) => {
    setSelectedColors((prev) => {
      const isAlreadySelected = prev.find((c) => c.hex === color.hex);

      if (isAlreadySelected) {
        // Remove color if already selected
        return prev.filter((c) => c.hex !== color.hex);
      } else if (prev.length < 2) {
        // Add color if less than 2 are selected
        return [...prev, { ...color, index }];
      } else {
        // Replace the first color if 2 are already selected
        return [prev[1], { ...color, index }];
      }
    });
  };

  // Function to check if color is selected
  const isColorSelected = (color) => {
    return selectedColors.some((c) => c.hex === color.hex);
  };

  // Function to update personal information
  const updatePersonalInfo = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to update multiple personal info fields at once
  const updatePersonalInfoBatch = (updates) => {
    setPersonalInfo(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to check if personal info is complete
  // Note: companyName removed from required fields as Company Information section is hidden
  const isPersonalInfoComplete = () => {
    const requiredFields = ['fullName', 'email'];
    return requiredFields.every(field => personalInfo[field] && personalInfo[field].trim() !== '');
  };

  // Function to check if all steps are completed
  const isAllStepsCompleted = () => {
    const hasLogo = logoPreview || uploadedLogoUrl;
    const hasIndustry = selectedIndustry !== null;
    const hasModules = selectedModules && selectedModules.length > 0;
    const hasPersonalInfo = isPersonalInfoComplete();
    
    return hasLogo && hasIndustry && hasModules && hasPersonalInfo;
  };

  // Function to get portal data for creation
  const getPortalData = () => {
    return {
      step: currentStep,
      industry: selectedIndustry,
      modules: selectedModules,
      branding: {
        name: brandName,
        logo: logoPreview || uploadedLogoUrl,
        colors: selectedColors
      },
      personal: personalInfo,
      completionDate: new Date().toISOString()
    };
  };

  // Function to start portal creation process
  const startPortalCreation = () => {
    if (!isAllStepsCompleted()) {
      console.warn('Cannot create portal: Not all steps completed');
      return false;
    }
    
    setIsCreatingPortal(true);
    setPortalCreationProgress(0);
    
    // Simulate portal creation with progress
    const interval = setInterval(() => {
      setPortalCreationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Reset portal creation values and redirect
          setTimeout(() => {
            setIsCreatingPortal(false);
            setPortalCreationProgress(0);
            // Save final portal data to localStorage for the portal page
            const portalData = getPortalData();
            localStorage.setItem('createdPortalData', JSON.stringify(portalData));
            
            // Clean up any old portal creation states from localStorage
            const currentData = loadFromStorage();
            if (currentData.isCreatingPortal !== undefined || currentData.portalCreationProgress !== undefined) {
              delete currentData.isCreatingPortal;
              delete currentData.portalCreationProgress;
              saveToStorage(currentData);
            }
            
            // Redirect to portal
            window.location.href = '/portal';
          }, 1000);
          return 100;
        }
        return prev + (100 / 30); // 30 seconds total
      });
    }, 1000); // Update every second
    
    return true;
  };

  // Function to clear all data (including localStorage)
  const clearAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Reset all state to initial values
      setCurrentStep(0);
      setStepHistory([0]);
      setSelectedIndustry(null);
      setSelectedModules([]);
      setLogoPreview(null);
      setBrandName("");
      setExtractedColors([]);
      setSelectedColors([]);
      setLogoUploadSuccess(false);
      setUploadedLogoUrl("");
      setPersonalInfo({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        jobTitle: "",
        companySize: "",
        location: ""
      });
      setIsCreatingPortal(false);
      setPortalCreationProgress(0);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  // Clear selected modules when industry changes
  useEffect(() => {
    if (selectedIndustry) {
      // Clear previously selected modules when industry changes
      setSelectedModules([]);
    }
  }, [selectedIndustry]);

  // Save data to localStorage whenever important state changes
  // Note: isCreatingPortal and portalCreationProgress are excluded as they are temporary UI states
  useEffect(() => {
    const dataToSave = {
      currentStep,
      stepHistory,
      selectedIndustry,
      selectedModules,
      logoPreview,
      brandName,
      extractedColors,
      selectedColors,
      logoUploadSuccess,
      uploadedLogoUrl,
      personalInfo
    };
    saveToStorage(dataToSave);
  }, [
    currentStep,
    stepHistory,
    selectedIndustry,
    selectedModules,
    logoPreview,
    brandName,
    extractedColors,
    selectedColors,
    logoUploadSuccess,
    uploadedLogoUrl,
    personalInfo
  ]);

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
        getFilteredModules,
        // Logo/Brand
        logoFile,
        logoPreview,
        brandName,
        setBrandName,
        extractedColors,
        setExtractedColors,
        selectedColors,
        logoUploading,
        logoUploadError,
        logoUploadSuccess,
        uploadedLogoUrl,
        uploadLogoToS3,
        handleLogoFileSelect,
        removeLogo,
        handleColorSelect,
        isColorSelected,
        // Personal Information
        personalInfo,
        updatePersonalInfo,
        updatePersonalInfoBatch,
        isPersonalInfoComplete,
        // Data Management
        clearAllData,
        // Portal Creation
        isCreatingPortal,
        portalCreationProgress,
        isAllStepsCompleted,
        startPortalCreation,
        getPortalData,
      }}
    >
      {children}
    </DynamicPortalContext.Provider>
  );
};

export default DynamicContextState;
