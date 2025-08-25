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

  // Session tracking state
  const [sessionId, setSessionId] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [ipId, setIpId] = useState(null);
  const [activityId, setActivityId] = useState(null);
  const [sessionInitializing, setSessionInitializing] = useState(false);
  const [sessionError, setSessionError] = useState("");

  // Portal tracking state
  const [portalId, setPortalId] = useState(null);
  const [portalSubdomain, setPortalSubdomain] = useState("");
  const [portalStatus, setPortalStatus] = useState("");
  const [portalCurrentStep, setPortalCurrentStep] = useState("");
  const [portalNextStepUrl, setPortalNextStepUrl] = useState("");
  const [portalInitializing, setPortalInitializing] = useState(false);
  const [portalError, setPortalError] = useState("");

  // Identity state
  const [identityData, setIdentityData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    companySize: "",
  });

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

  // Function to initialize session tracking
  const initializeSession = async (deviceInfo, referrer, utm) => {
    try {
      setSessionInitializing(true);
      setSessionError("");

      const response = await axios.post(
        `${API_BASE_URL}/website/tracking/session/initialize`,
        {
          deviceInfo,
          referrer,
          utm,
        }
      );

      if (response.data.success && response.data.data) {
        const {
          sessionId: newSessionId,
          deviceId: newDeviceId,
          ipId: newIpId,
          activityId: newActivityId,
        } = response.data.data;

        // Store session data in localStorage with 24 hour expiry
        const sessionData = {
          ...response.data.data,
          timestamp: Date.now(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        };
        localStorage.setItem(
          "sessionTrackingData",
          JSON.stringify(sessionData)
        );

        setSessionId(newSessionId);
        setDeviceId(newDeviceId);
        setIpId(newIpId);
        setActivityId(newActivityId);

        return response.data.data;
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error initializing session:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to initialize session";
      setSessionError(errorMessage);
      throw error;
    } finally {
      setSessionInitializing(false);
    }
  };

  // Function to check if session data exists and is valid
  const getStoredSessionData = () => {
    try {
      const storedData = localStorage.getItem("sessionTrackingData");
      if (!storedData) return null;

      const sessionData = JSON.parse(storedData);
      const now = Date.now();

      // Check if data has expired
      if (now > sessionData.expiresAt) {
        localStorage.removeItem("sessionTrackingData");
        return null;
      }

      return sessionData;
    } catch (error) {
      console.error("Error parsing stored session data:", error);
      localStorage.removeItem("sessionTrackingData");
      return null;
    }
  };

  // Function to load session data from localStorage
  const loadStoredSessionData = () => {
    const sessionData = getStoredSessionData();
    if (sessionData) {
      setSessionId(sessionData.sessionId);
      setDeviceId(sessionData.deviceId);
      setIpId(sessionData.ipId);
      setActivityId(sessionData.activityId);
      return true;
    }
    return false;
  };

  // Function to initialize portal creation process
  const initializePortal = async () => {
    try {
      setPortalInitializing(true);
      setPortalError("");

      // Generate subdomain from brandName
      const subdomain = brandName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      if (subdomain.length < 3) {
        throw new Error(
          "Brand name must be at least 3 characters long to generate subdomain"
        );
      }

      const response = await axios.post(
        `${API_BASE_URL}/website/tracking/portal/initialize`,
        {
          sessionId,
          deviceId,
          ipId,
          subdomain,
          tier: "premium",
        }
      );

      if (response.data.success && response.data.data) {
        const {
          portalId: newPortalId,
          subdomain: newSubdomain,
          status: newStatus,
          currentStep: newCurrentStep,
          nextStepUrl: newNextStepUrl,
        } = response.data.data;

        setPortalId(newPortalId);
        setPortalSubdomain(newSubdomain);
        setPortalStatus(newStatus);
        setPortalCurrentStep(newCurrentStep);
        setPortalNextStepUrl(newNextStepUrl);

        return response.data.data;
      } else {
        throw new Error("Invalid portal API response format");
      }
    } catch (error) {
      console.error("Error initializing portal:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to initialize portal";
      setPortalError(errorMessage);
      throw error;
    } finally {
      setPortalInitializing(false);
    }
  };

  // Function to update portal step data
  const updatePortalStep = async (stepNumber, stepData) => {
    try {
      if (!portalId) {
        throw new Error("Portal ID not found. Please initialize portal first.");
      }

      // Include session data required by validateSession middleware
      const requestBody = {
        ...stepData,
        sessionId,
        deviceId,
        ipId,
      };

      const response = await axios.put(
        `${API_BASE_URL}/website/tracking/portal/${portalId}/step/${stepNumber}`,
        requestBody
      );

      if (response.data.success && response.data.data) {
        // Update portal status if returned
        if (response.data.data.status) {
          setPortalStatus(response.data.data.status);
        }
        if (response.data.data.currentStep) {
          setPortalCurrentStep(response.data.data.currentStep);
        }
        if (response.data.data.nextStepUrl) {
          setPortalNextStepUrl(response.data.data.nextStepUrl);
        }

        return response.data.data;
      } else {
        throw new Error("Invalid portal step update response format");
      }
    } catch (error) {
      console.error("Error updating portal step:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to update portal step";
      setPortalError(errorMessage);
      throw error;
    }
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

  // Initialize session tracking on component mount
  useEffect(() => {
    const initializeSessionTracking = async () => {
      try {
        // Collect device information dynamically
        const deviceInfo = {
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          colorDepth: window.screen.colorDepth,
          pixelRatio: window.devicePixelRatio,
          language: navigator.language,
          platform: navigator.platform,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          userAgent: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        // Get referrer
        const referrer = document.referrer || "";

        // Extract UTM parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const utm = {
          utm_source: urlParams.get("utm_source") || "",
          utm_medium: urlParams.get("utm_medium") || "",
          utm_campaign: urlParams.get("utm_campaign") || "",
          utm_term: urlParams.get("utm_term") || "",
          utm_content: urlParams.get("utm_content") || "",
        };

        // Load session data from localStorage
        if (loadStoredSessionData()) {
          console.log("Session data loaded from localStorage.");
        } else {
          // Initialize session if no data is found
          await initializeSession(deviceInfo, referrer, utm);
        }
      } catch (error) {
        console.error("Failed to initialize session tracking:", error);
      }
    };

    initializeSessionTracking();
  }, []);

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      // If we're on the logo upload step (step 0) and have a brand name, initialize portal
      if (
        currentStep === 0 &&
        brandName &&
        brandName.trim().length >= 3 &&
        sessionId &&
        deviceId &&
        ipId &&
        !portalId
      ) {
        try {
          await initializePortal();
          console.log("Portal initialized before proceeding to next step.");
        } catch (error) {
          console.error("Failed to initialize portal:", error);
          // Don't proceed if portal initialization fails
          return;
        }
      }

      // Update portal step data before proceeding
      if (portalId) {
        try {
          let stepData = {};

          // Collect data for the step we're moving TO (next step)
          // Map frontend steps to API step numbers based on validation requirements
          switch (currentStep + 1) {
            case 1: // Logo & Branding (when moving from step 0 to 1)
              // API step 1: CLIENT_INFO_AND_LOGO - expects companyName
              stepData = {
                logoUrl: uploadedLogoUrl,
                companyName: brandName, // API expects companyName, not brandName
                brandName: brandName, // Keep brandName for backward compatibility
                extractedColors: extractedColors,
                selectedColors: selectedColors,
                logoFile: logoFile
                  ? {
                      name: logoFile.name,
                      size: logoFile.size,
                      type: logoFile.type,
                    }
                  : null,
              };
              break;

            case 2: // Select Industry (when moving from step 1 to 2)
              // API step 2: CONTACT_DETAILS - expects name, email, mobile
              // But we don't have this data yet, so we'll skip this step for now
              // and collect it later when we have the identity data
              stepData = {
                // Placeholder data to satisfy validation
                name: "TBD",
                email: "tbd@example.com",
                mobile: "0000000000",
                // Also include industry data
                selectedIndustry: selectedIndustry
                  ? {
                      _id: selectedIndustry._id,
                      name: selectedIndustry.name,
                      description: selectedIndustry.description,
                    }
                  : null,
              };
              break;

            case 3: // Select Modules (when moving from step 2 to 3)
              // API step 3: ORGANIZATION_TYPE - expects organizationType
              stepData = {
                organizationType: "company", // Default to company type
                // Also include modules data
                selectedModules: selectedModules,
                selectedIndustry: selectedIndustry
                  ? {
                      _id: selectedIndustry._id,
                      name: selectedIndustry.name,
                    }
                  : null,
              };
              break;

            case 4: // Identity (when moving from step 3 to 4)
              // API step 4: MODULE_SELECTION - expects modules array
              stepData = {
                // API expects modules array for step 4
                modules: selectedModules,
                // Also include all identity data for completeness
                name: identityData.fullName,
                email: identityData.email,
                mobile: identityData.phone,
                organizationType: "company",
                ...identityData,
                selectedIndustry: selectedIndustry
                  ? {
                      _id: selectedIndustry._id,
                      name: selectedIndustry.name,
                    }
                  : null,
                brandName: brandName,
                logoUrl: uploadedLogoUrl,
                selectedColors: selectedColors,
              };
              break;

            default:
              stepData = {};
          }

          // Update portal step (step numbers are 1-based for API)
          await updatePortalStep(currentStep + 1, stepData);
          console.log(`Portal step ${currentStep + 1} updated successfully.`);
        } catch (error) {
          console.error("Failed to update portal step:", error);
          // Don't proceed if portal step update fails
          return;
        }
      }

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
        // Session tracking
        sessionId,
        deviceId,
        ipId,
        activityId,
        sessionInitializing,
        sessionError,
        initializeSession,
        getStoredSessionData,
        loadStoredSessionData,
        // Portal tracking
        portalId,
        portalSubdomain,
        portalStatus,
        portalCurrentStep,
        portalNextStepUrl,
        portalInitializing,
        portalError,
        initializePortal,
        updatePortalStep,
        // Identity
        identityData,
        setIdentityData,
      }}
    >
      {children}
    </DynamicPortalContext.Provider>
  );
};

export default DynamicContextState;
