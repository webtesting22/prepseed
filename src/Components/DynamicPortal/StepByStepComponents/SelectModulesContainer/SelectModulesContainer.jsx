import React, { useContext } from "react";
import DynamicPortalContext from "../../CommonContext/DynamicPortalContext";

const SelectModulesContainer = () => {
  const {
    modules,
    selectedModules,
    selectedIndustry,
    modulesLoading: loading,
    modulesError: error,
    fetchModules,
    handleModuleToggle,
    isModuleSelected,
    getFilteredModules,
  } = useContext(DynamicPortalContext);

  // Get filtered modules based on selected industry
  const filteredModules = getFilteredModules();

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
        Select Modules
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "#64748b",
          lineHeight: "1.6",
          marginBottom: "32px",
        }}
      >
        {selectedIndustry
          ? `Choose the modules and features you need for your ${selectedIndustry.name.toLowerCase()} portal. You can always add more later.`
          : "Choose the modules and features you need for your portal. You can always add more later."}
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
            Loading modules...
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
              Error loading modules
            </div>
            <div>{error}</div>
            <button
              onClick={fetchModules}
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

      {/* No Industry Selected Message */}
      {!loading && !error && !selectedIndustry && (
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
            Select an Industry First
          </h3>
          <p style={{ fontSize: "14px", marginBottom: "16px" }}>
            Please go back and select an industry to see available modules for
            that industry.
          </p>
        </div>
      )}

      {/* Modules Grid */}
      {!loading && !error && selectedIndustry && filteredModules.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredModules.map((module) => (
            <div
              key={module._id}
              onClick={() => handleModuleToggle(module._id)}
              style={{
                padding: "20px",
                border: isModuleSelected(module._id)
                  ? "2px solid #3b82f6"
                  : "1px solid #e2e8f0",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                background: isModuleSelected(module._id) ? "#f0f9ff" : "white",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isModuleSelected(module._id)) {
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isModuleSelected(module._id)) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Selection indicator */}
              {isModuleSelected(module._id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#3b82f6",
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

              {/* Industries indicator */}
              {!isModuleSelected(module._id) &&
                module.industries &&
                module.industries.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#f1f5f9",
                      color: "#64748b",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "500",
                    }}
                  >
                    {module.industries.map((ind) => ind.name).join(", ")}
                  </div>
                )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                  marginTop:
                    module.industries && module.industries.length > 0
                      ? "24px"
                      : "0",
                }}
              >
                <span style={{ fontSize: "24px" }}>{module.icon}</span>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1e293b",
                    margin: "0",
                  }}
                >
                  {module.name}
                </h3>
              </div>

              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  margin: "0 0 16px 0",
                  lineHeight: "1.5",
                }}
              >
                {module.description}
              </p>

              {/* Features preview */}
              {module.features && module.features.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Key Features:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                  >
                    {module.features
                      .filter((feature) => feature.isEnabled)
                      .slice(0, 3)
                      .map((feature, index) => (
                        <span
                          key={feature._id}
                          style={{
                            fontSize: "11px",
                            background: "#e5e7eb",
                            color: "#374151",
                            padding: "2px 6px",
                            borderRadius: "12px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {feature.name}
                        </span>
                      ))}
                    {module.features.filter((f) => f.isEnabled).length > 3 && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#6b7280",
                          fontStyle: "italic",
                        }}
                      >
                        +{module.features.filter((f) => f.isEnabled).length - 3}{" "}
                        more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State - No modules for selected industry */}
      {!loading &&
        !error &&
        selectedIndustry &&
        filteredModules.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748b",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              No Modules Available for {selectedIndustry?.name}
            </h3>
            <p style={{ fontSize: "14px", marginBottom: "16px" }}>
              No modules found for the selected industry. Please try selecting a
              different industry.
            </p>
            <button
              onClick={fetchModules}
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

      {/* Selected Modules Summary */}
      {selectedModules.length > 0 && (
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
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ✅ Selected Modules ({selectedModules.length})
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {filteredModules
              .filter((module) => selectedModules.includes(module._id))
              .map((module) => (
                <div
                  key={module._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    background: "#e0f2fe",
                    border: "1px solid #0891b2",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#0c4a6e",
                  }}
                >
                  <span>{module.icon}</span>
                  <span>{module.name}</span>
                  <button
                    onClick={() => handleModuleToggle(module._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0c4a6e",
                      cursor: "pointer",
                      padding: "0",
                      marginLeft: "4px",
                      fontSize: "14px",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectModulesContainer;
