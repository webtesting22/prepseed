import React, { useContext, useState } from "react";
import DynamicPortalContext from "../../CommonContext/DynamicPortalContext";

const IdentityContainer = () => {
  const {
    identityData,
    setIdentityData,
    selectedIndustry,
    selectedModules,
    brandName,
    uploadedLogoUrl,
    selectedColors,
  } = useContext(DynamicPortalContext);

  const handleInputChange = (field, value) => {
    setIdentityData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const companySizeOptions = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
  ];

  const { personalInfo, updatePersonalInfo } = useContext(DynamicPortalContext);
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "8px",
          }}
        >
          Tell us about yourself
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#64748b",
            lineHeight: "1.6",
          }}
        >
          Help us personalize your portal experience and get in touch when it's
          ready.
        </p>
      </div>

      <div style={{ display: "grid", gap: "24px" }}>
        {/* Personal Information */}
        <div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "16px",
            }}
          >
            Personal Information
          </h3>
          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="Enter your email address"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="Enter your phone number"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>
            <div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Company Size
                </label>
                <select
                  value={personalInfo.companySize}
                  onChange={(e) =>
                    updatePersonalInfo("companySize", e.target.value)
                  }
                  style={{
                    width: "90%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    transition: "border-color 0.2s",
                    background: "white",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        {/* Company Information section temporarily hidden */}
        {false && (
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#334155",
                marginBottom: "16px",
              }}
            >
              Company Information
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  value={personalInfo.companyName}
                  onChange={(e) =>
                    updatePersonalInfo("companyName", e.target.value)
                  }
                  placeholder="Enter your company name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Job Title
                </label>
                <input
                  type="text"
                  value={personalInfo.jobTitle}
                  onChange={(e) =>
                    updatePersonalInfo("jobTitle", e.target.value)
                  }
                  placeholder="Enter your job title"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Company Size
                </label>
                <select
                  value={personalInfo.companySize}
                  onChange={(e) =>
                    updatePersonalInfo("companySize", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    backgroundColor: "white",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                >
                  <option value="">Select company size</option>
                  {companySizeOptions.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "16px",
            }}
          >
            Portal Summary
          </h3>
          <div style={{ display: "grid", gap: "12px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Brand Name:</span>
              <span style={{ fontWeight: "500", color: "#1e293b" }}>
                {brandName || "Not set"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Industry:</span>
              <span style={{ fontWeight: "500", color: "#1e293b" }}>
                {selectedIndustry ? selectedIndustry.name : "Not selected"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Modules:</span>
              <span style={{ fontWeight: "500", color: "#1e293b" }}>
                {selectedModules.length > 0
                  ? `${selectedModules.length} selected`
                  : "None selected"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Logo:</span>
              <span style={{ fontWeight: "500", color: "#1e293b" }}>
                {uploadedLogoUrl ? "Uploaded" : "Not uploaded"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Colors:</span>
              <span style={{ fontWeight: "500", color: "#1e293b" }}>
                {selectedColors.length > 0
                  ? `${selectedColors.length} selected`
                  : "None selected"}
              </span>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div
          style={{
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>
            <strong>Current Progress:</strong> Step {4} of {4}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentityContainer;
