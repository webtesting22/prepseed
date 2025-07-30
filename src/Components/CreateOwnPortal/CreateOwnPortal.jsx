import React, { useState } from "react";
import "./CreateOwnPortal.css";
import modulesData from "../OthersComponents/Modules/ModulesData";

const CreateOwnPortal = () => {
    const [portalConfig, setPortalConfig] = useState({
        brandName: "",
        logo: null,
        logoPreview: null,
        selectedModules: [],
        primaryColor: "#667eea",
        secondaryColor: "#764ba2"
    });

    const modulesArray = Object.values(modulesData);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPortalConfig(prev => ({
                    ...prev,
                    logo: file,
                    logoPreview: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBrandNameChange = (event) => {
        setPortalConfig(prev => ({
            ...prev,
            brandName: event.target.value
        }));
    };

    const handleModuleToggle = (module) => {
        setPortalConfig(prev => {
            const isSelected = prev.selectedModules.some(m => m.id === module.id);
            if (isSelected) {
                return {
                    ...prev,
                    selectedModules: prev.selectedModules.filter(m => m.id !== module.id)
                };
            } else {
                return {
                    ...prev,
                    selectedModules: [...prev.selectedModules, module]
                };
            }
        });
    };

    const handleColorChange = (type, color) => {
        setPortalConfig(prev => ({
            ...prev,
            [type]: color
        }));
    };

    return (
        <div className="MainContainer paddingTop50 paddingBottom50">
            <div className="Container">
                <div className="portal-creation-container">
                    {/* Professional Header */}
                    <div className="portal-header">
                        <div className="header-content">
                            <h1>Create Your Own Portal</h1>
                            <p>Design and customize your perfect business portal with our intuitive builder</p>
                            <div className="header-badge">
                                <span className="badge-icon">⚡</span>
                                <span>Live Preview</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Professional Grid */}
                    <div className="portal-grid">
                        {/* Left Side - Configuration Panel */}
                        <div className="config-panel">
                            <div className="panel-header">
                                <h2>Portal Configuration</h2>
                                <p>Customize your portal settings and select modules</p>
                            </div>
                            <div className="config-sections">
                                {/* Brand Configuration Section */}
                                <div className="config-section">
                                    <div className="section-header">
                                        <div className="section-icon">🎨</div>
                                        <h3>Brand Identity</h3>
                                    </div>
                                    
                                    {/* Logo Upload */}
                                    <div className="config-item">
                                        <label>Upload Logo</label>
                                        <div className="logo-upload-container">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="file-input"
                                                id="logo-upload"
                                            />
                                            <label htmlFor="logo-upload" className="upload-btn">
                                                <span className="upload-icon">📁</span>
                                                Choose Logo
                                            </label>
                                            {portalConfig.logoPreview && (
                                                <div className="logo-preview">
                                                    <img src={portalConfig.logoPreview} alt="Logo preview" />
                                                    <span className="preview-label">Preview</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Brand Name */}
                                    <div className="config-item">
                                        <label>Brand Name</label>
                                        <div className="input-container">
                                            <span className="input-icon">🏢</span>
                                            <input
                                                type="text"
                                                placeholder="Enter your brand name"
                                                value={portalConfig.brandName}
                                                onChange={handleBrandNameChange}
                                                className="brand-input"
                                            />
                                        </div>
                                    </div>

                                    {/* Color Scheme */}
                                    <div className="config-item">
                                        <label>Color Scheme</label>
                                        <div className="color-scheme">
                                            <div className="color-inputs">
                                                <div className="color-item">
                                                    <span className="color-label">Primary</span>
                                                    <input
                                                        type="color"
                                                        value={portalConfig.primaryColor}
                                                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                                                        className="color-input"
                                                    />
                                                </div>
                                                <div className="color-item">
                                                    <span className="color-label">Secondary</span>
                                                    <input
                                                        type="color"
                                                        value={portalConfig.secondaryColor}
                                                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                                                        className="color-input"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modules Selection Section */}
                                <div className="config-section">
                                    <div className="section-header">
                                        <div className="section-icon">📦</div>
                                        <h3>Module Selection</h3>
                                    </div>
                                    <p className="section-description">Choose the modules you want to include in your portal</p>
                                    <div className="modules-grid">
                                        {modulesArray.map((industry) => (
                                            <div key={industry.title} className="industry-module">
                                                <div className="industry-header">
                                                    <h4>{industry.title}</h4>
                                                    <span className="module-count">{industry.modules.length} modules</span>
                                                </div>
                                                <div className="modules-list">
                                                    {industry.modules.map((module) => {
                                                        const isSelected = portalConfig.selectedModules.some(m => m.id === module.id);
                                                        return (
                                                            <div
                                                                key={module.id}
                                                                className={`module-item ${isSelected ? 'selected' : ''}`}
                                                                onClick={() => handleModuleToggle(module)}
                                                            >
                                                                <div className="module-info">
                                                                    <span className="module-name">{module.title}</span>
                                                                    <span className="module-duration">{module.duration}</span>
                                                                </div>
                                                                <div className="module-action">
                                                                    {isSelected ? (
                                                                        <span className="remove-btn"><span className="btn-icon">✕</span>Remove</span>
                                                                    ) : (
                                                                        <span className="add-btn"><span className="btn-icon">+</span>Add</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Portal Preview */}
                        <div className="portal-preview">
                            <div className="preview-header">
                                <div className="preview-title">
                                    <h3>Live Preview</h3>
                                    <span className="preview-badge">Real-time</span>
                                </div>
                                <p>See your portal as it will appear to users</p>
                            </div>
                            
                            {/* LV App Style Portal Mockup */}
                            <div className="portal-mockup">
                                {/* Top Header Bar */}
                                <div className="mockup-header" style={{ backgroundColor: portalConfig.primaryColor }}>
                                    <div className="header-left">
                                        <div className="brand-section">
                                            {portalConfig.logoPreview && (
                                                <img src={portalConfig.logoPreview} alt="Brand logo" className="header-logo"/>
                                            )}
                                            <span className="brand-name">{portalConfig.brandName || "Your App"}</span>
                                        </div>
                                        <div className="search-section">
                                            <div className="search-bar">
                                                <span className="search-icon">🔍</span>
                                                <input type="text" placeholder="Search the system" className="search-input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="header-right">
                                        <div className="user-profile">
                                            <div className="user-avatar">👤</div>
                                            <div className="user-info">
                                                <span className="user-name">Duncan Meyer</span>
                                                <span className="user-role">Engineer</span>
                                            </div>
                                            <span className="dropdown-icon">▼</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="mockup-content">
                                    {/* Left Sidebar Navigation */}
                                    <div className="mockup-sidebar" style={{ backgroundColor: portalConfig.secondaryColor }}>
                                        <div className="sidebar-nav">
                                            {/* Dynamic Modules Section */}
                                            {portalConfig.selectedModules.length > 0 ? (
                                                <>
                                                    <div className="nav-section-title">Your Modules</div>
                                                    {portalConfig.selectedModules.map((module, index) => (
                                                        <div key={module.id} className="nav-item module-item">
                                                            <span className="nav-icon">📦</span>
                                                            <span className="nav-text">{module.title}</span>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div className="empty-sidebar">
                                                    <div className="empty-icon">📋</div>
                                                    <p>No modules selected</p>
                                                    <span>Select modules from the left panel to see them here</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="mockup-main">
                                        <div className="main-content">
                                            {/* Overview Section */}
                                            <div className="overview-section">
                                                <h2>Check out <span className="highlight">Your Overview</span></h2>
                                            </div>

                                            {/* Top Opportunities */}
                                            <div className="opportunities-section">
                                                <div className="section-header-row">
                                                    <div className="section-title">
                                                        <h3>Top Opportunities</h3>
                                                        <p>Keep an eye on opportunity updates.</p>
                                                    </div>
                                                    <a href="#" className="view-all-link">View All</a>
                                                </div>
                                                <div className="opportunities-grid">
                                                    <div className="opportunity-card">
                                                        <div className="card-logo red">M</div>
                                                        <div className="card-content">
                                                            <h4>McDee's</h4>
                                                            <p>Date Created | Stage</p>
                                                            <div className="savings">
                                                                <span className="label">Total savings</span>
                                                                <span className="amount">ZAR 200 000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="opportunity-card">
                                                        <div className="card-logo green">S</div>
                                                        <div className="card-content">
                                                            <h4>Starbuks</h4>
                                                            <p>Date Created | Stage</p>
                                                            <div className="savings">
                                                                <span className="label">Total savings</span>
                                                                <span className="amount">ZAR 200 000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="opportunity-card">
                                                        <div className="card-logo blue">W</div>
                                                        <div className="card-content">
                                                            <h4>Wallmart</h4>
                                                            <p>Date Created | Stage</p>
                                                            <div className="savings">
                                                                <span className="label">Total savings</span>
                                                                <span className="amount">ZAR 200 000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Companies Section */}
                                            <div className="companies-section">
                                                <div className="section-header-row">
                                                    <div className="section-title">
                                                        <h3>Recently Companies</h3>
                                                        <p>Keep an eye on companies being added.</p>
                                                    </div>
                                                    <a href="#" className="view-all-link">View All</a>
                                                </div>
                                                <div className="companies-table">
                                                    <div className="table-header">
                                                        <span>Company</span>
                                                        <span>Site Count</span>
                                                        <span>Opportunity Count</span>
                                                        <span>Date Added</span>
                                                        <span></span>
                                                    </div>
                                                    <div className="table-row">
                                                        <div className="company-info">
                                                            <div className="company-logo red">M</div>
                                                            <span>McDee's</span>
                                                        </div>
                                                        <span>5</span>
                                                        <span>12</span>
                                                        <span>2024-01-15</span>
                                                        <span className="arrow">▶</span>
                                                    </div>
                                                    <div className="table-row">
                                                        <div className="company-info">
                                                            <div className="company-logo green">S</div>
                                                            <span>Starbuks</span>
                                                        </div>
                                                        <span>8</span>
                                                        <span>15</span>
                                                        <span>2024-01-10</span>
                                                        <span className="arrow">▶</span>
                                                    </div>
                                                    <div className="table-row">
                                                        <div className="company-info">
                                                            <div className="company-logo red">M</div>
                                                            <span>Milers</span>
                                                        </div>
                                                        <span>3</span>
                                                        <span>7</span>
                                                        <span>2024-01-05</span>
                                                        <span className="arrow">▶</span>
                                                    </div>
                                                    <div className="table-row">
                                                        <div className="company-info">
                                                            <div className="company-logo green">B</div>
                                                            <span>BEEPEE</span>
                                                        </div>
                                                        <span>12</span>
                                                        <span>25</span>
                                                        <span>2024-01-01</span>
                                                        <span className="arrow">▶</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Questionnaires Section */}
                                            <div className="questionnaires-section">
                                                <div className="section-header-row">
                                                    <div className="section-title">
                                                        <h3>Questionnaires</h3>
                                                        <p>Edit, create and control App Questionnaires.</p>
                                                    </div>
                                                    <a href="#" className="view-all-link">View All</a>
                                                </div>
                                                <div className="questionnaires-grid">
                                                    <div className="questionnaire-card">
                                                        <div className="card-header">
                                                            <h4>Cooling Tower</h4>
                                                            <span className="status active">Active</span>
                                                            <span className="more-options">⋮</span>
                                                        </div>
                                                        <div className="card-stats">
                                                            <div className="stat">
                                                                <span className="stat-label">Times Used</span>
                                                                <span className="stat-value">105</span>
                                                            </div>
                                                            <div className="stat">
                                                                <span className="stat-label">Questions</span>
                                                                <span className="stat-value">23</span>
                                                            </div>
                                                            <div className="stat">
                                                                <span className="stat-label">Last Updated</span>
                                                                <span className="stat-value">04 Apr</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="questionnaire-card">
                                                        <div className="card-header">
                                                            <h4>Cooling Tower</h4>
                                                            <span className="status active">Active</span>
                                                            <span className="more-options">⋮</span>
                                                        </div>
                                                        <div className="card-stats">
                                                            <div className="stat">
                                                                <span className="stat-label">Times Used</span>
                                                                <span className="stat-value">105</span>
                                                            </div>
                                                            <div className="stat">
                                                                <span className="stat-label">Questions</span>
                                                                <span className="stat-value">23</span>
                                                            </div>
                                                            <div className="stat">
                                                                <span className="stat-label">Last Updated</span>
                                                                <span className="stat-value">04 Apr</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="questionnaire-card">
                                                        <div className="card-header">
                                                            <h4>Cooling Tower</h4>
                                                            <span className="status active">Active</span>
                                                            <span className="more-options">⋮</span>
                                                        </div>
                                                        <div className="card-stats">
                                                            <div className="stat">
                                                                <span className="stat-label">Times Used</span>
                                                                <span className="stat-value">105</span>
                                                            </div>
                                                            <div className="stat">
                                                                <span className="stat-label">Questions</span>
                                                                <span className="stat-value">23</span>
                                                            </div>
                                                            <div className="stat">
                                                                <span className="stat-label">Last Updated</span>
                                                                <span className="stat-value">04 Apr</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-questionnaire">
                                                    <button className="add-btn">Add More Questionnaires</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Action Buttons */}
                    <div className="portal-actions">
                        <div className="action-info">
                            <span className="info-icon">💡</span>
                            <span>Your portal will be created with the selected configuration</span>
                        </div>
                        <div className="action-buttons">
                            <button className="action-btn secondary"><span className="btn-icon">💾</span>Save Draft</button>
                            <button className="action-btn primary"><span className="btn-icon">🚀</span>Create Portal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOwnPortal; 