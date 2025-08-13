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

  // Logo/Brand state
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [extractedColors, setExtractedColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState("");
  const [logoUploadSuccess, setLogoUploadSuccess] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");

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

  // Clear selected modules when industry changes
  useEffect(() => {
    if (selectedIndustry) {
      // Clear previously selected modules when industry changes
      setSelectedModules([]);
    }
  }, [selectedIndustry]);

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
      }}
    >
      {children}
    </DynamicPortalContext.Provider>
  );
};

export default DynamicContextState;
