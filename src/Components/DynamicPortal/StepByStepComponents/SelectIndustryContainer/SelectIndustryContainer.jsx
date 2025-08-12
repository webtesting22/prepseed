import React from "react";

const SelectIndustryContainer = () => {
    const industries = [
        { id: 1, name: "Technology", description: "Software, IT services, and digital solutions", icon: "💻" },
        { id: 2, name: "Healthcare", description: "Medical, pharmaceutical, and wellness services", icon: "🏥" },
        { id: 3, name: "Finance", description: "Banking, insurance, and financial services", icon: "💰" },
        { id: 4, name: "Education", description: "Schools, training, and educational platforms", icon: "🎓" },
        { id: 5, name: "E-commerce", description: "Online retail and marketplace platforms", icon: "🛒" },
        { id: 6, name: "Manufacturing", description: "Industrial production and manufacturing", icon: "🏭" }
    ];

    return (
        <div className="step-content">
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                Select Your Industry
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
                Choose the industry that best represents your business. This will help us customize your portal experience.
            </p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '16px' 
            }}>
                {industries.map((industry) => (
                    <div
                        key={industry.id}
                        style={{
                            padding: '20px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: 'white'
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '24px' }}>{industry.icon}</span>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                color: '#1e293b', 
                                margin: '0' 
                            }}>
                                {industry.name}
                            </h3>
                        </div>
                        <p style={{ 
                            fontSize: '14px', 
                            color: '#64748b', 
                            margin: '0', 
                            lineHeight: '1.5' 
                        }}>
                            {industry.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectIndustryContainer; 