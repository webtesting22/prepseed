import React, { useState, useEffect } from "react";
import axios from "axios";

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SelectIndustryContainer = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Function to fetch industries from API
  const fetchIndustries = async () => {
    try {
      setLoading(true);
      setError("");

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
      setError(`Failed to load industries: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // Function to handle industry selection
  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    // Here you can add logic to save the selection or pass it to parent component
    console.log("Selected industry:", industry);
  };

  return (
    <div className="step-content">
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: "16px",
        }}
      >
        Select Your Industry
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "#64748b",
          lineHeight: "1.6",
          marginBottom: "32px",
        }}
      >
        Choose the industry that best represents your business. This will help
        us customize your portal experience.
      </p>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid #3b82f6",
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <span style={{ color: "#64748b", fontSize: "16px" }}>
            Loading industries...
          </span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            padding: "16px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            color: "#dc2626",
            fontSize: "14px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>⚠️</span>
          <div>
            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
              Error loading industries
            </div>
            <div>{error}</div>
            <button
              onClick={fetchIndustries}
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Industries Grid */}
      {!loading && !error && industries.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {industries.map((industry) => (
            <div
              key={industry._id}
              onClick={() => handleIndustrySelect(industry)}
              style={{
                padding: "20px",
                border:
                  selectedIndustry?._id === industry._id
                    ? `2px solid ${industry.color || "#3b82f6"}`
                    : "1px solid #e2e8f0",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                background:
                  selectedIndustry?._id === industry._id
                    ? `${industry.color || "#3b82f6"}10`
                    : "white",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (selectedIndustry?._id !== industry._id) {
                  e.currentTarget.style.borderColor =
                    industry.color || "#3b82f6";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedIndustry?._id !== industry._id) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Selection indicator */}
              {selectedIndustry?._id === industry._id && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "24px",
                    height: "24px",
                    backgroundColor: industry.color || "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: industry.color || "#3b82f6",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {industry.name.charAt(0).toUpperCase()}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1e293b",
                    margin: "0",
                  }}
                >
                  {industry.name}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  margin: "0",
                  lineHeight: "1.5",
                }}
              >
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && industries.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#64748b",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏢</div>
          <h3
            style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}
          >
            No Industries Available
          </h3>
          <p style={{ fontSize: "14px", marginBottom: "16px" }}>
            No active industries found. Please try again later.
          </p>
          <button
            onClick={fetchIndustries}
            style={{
              padding: "8px 16px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      )}

      {/* Selected Industry Summary */}
      {selectedIndustry && (
        <div
          style={{
            marginTop: "32px",
            padding: "20px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ✅ Selected Industry: {selectedIndustry.name}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              margin: "0",
            }}
          >
            {selectedIndustry.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectIndustryContainer;
