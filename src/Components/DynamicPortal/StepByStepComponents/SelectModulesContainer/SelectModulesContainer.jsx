import React from "react";

const SelectModulesContainer = () => {
    const modules = [
        { 
            id: 1, 
            name: "User Management", 
            description: "Complete user authentication, roles, and permissions system",
            icon: "👥",
            category: "Core"
        },
        { 
            id: 2, 
            name: "Payment System", 
            description: "Secure payment processing with multiple gateway support",
            icon: "💳",
            category: "Core"
        },
        { 
            id: 3, 
            name: "Analytics Dashboard", 
            description: "Comprehensive reporting and data visualization tools",
            icon: "📊",
            category: "Analytics"
        },
        { 
            id: 4, 
            name: "Notification System", 
            description: "Email, SMS, and push notification management",
            icon: "🔔",
            category: "Communication"
        },
        { 
            id: 5, 
            name: "File Management", 
            description: "Secure file upload, storage, and sharing capabilities",
            icon: "📁",
            category: "Storage"
        },
        { 
            id: 6, 
            name: "API Integration", 
            description: "RESTful API endpoints for third-party integrations",
            icon: "🔌",
            category: "Development"
        }
    ];

    return (
        <div className="step-content">
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                Select Modules
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
                Choose the modules and features you need for your portal. You can always add more later.
            </p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '16px' 
            }}>
                {modules.map((module) => (
                    <div
                        key={module.id}
                        style={{
                            padding: '20px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: 'white',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ 
                            position: 'absolute', 
                            top: '12px', 
                            right: '12px',
                            background: '#f1f5f9',
                            color: '#64748b',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                        }}>
                            {module.category}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '24px' }}>{module.icon}</span>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                color: '#1e293b', 
                                margin: '0' 
                            }}>
                                {module.name}
                            </h3>
                        </div>
                        
                        <p style={{ 
                            fontSize: '14px', 
                            color: '#64748b', 
                            margin: '0 0 16px 0', 
                            lineHeight: '1.5' 
                        }}>
                            {module.description}
                        </p>
                        
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            color: '#3b82f6',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            <input 
                                type="checkbox" 
                                id={`module-${module.id}`}
                                style={{ 
                                    width: '16px', 
                                    height: '16px',
                                    accentColor: '#3b82f6'
                                }}
                            />
                            <label 
                                htmlFor={`module-${module.id}`}
                                style={{ cursor: 'pointer' }}
                            >
                                Include this module
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectModulesContainer; 