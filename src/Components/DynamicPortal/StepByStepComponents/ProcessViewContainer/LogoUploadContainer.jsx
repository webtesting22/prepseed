import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';

const LogoUploadContainer = () => {
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [brandName, setBrandName] = useState('');
    const [extractedColors, setExtractedColors] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select a valid image file');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setUploadError('File size should be less than 5MB');
                return;
            }

            setLogoFile(file);
            setUploadError('');

            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
                extractColorsFromImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const extractColorsFromImage = (imageSrc) => {
        setIsUploading(true);
        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = function () {
            try {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(img, 6);
                const dominantColor = colorThief.getColor(img);

                const colorsWithHex = [
                    { rgb: dominantColor, hex: rgbToHex(dominantColor), percentage: 35, label: 'Primary' },
                    ...palette.slice(0, 5).map((color, index) => ({
                        rgb: color,
                        hex: rgbToHex(color),
                        percentage: Math.max(15 - index * 2, 5),
                        label: ['Secondary', 'Accent', 'Tertiary', 'Quaternary', 'Quinary'][index] || `Color ${index + 2}`
                    }))
                ];

                setExtractedColors(colorsWithHex);
            } catch (error) {
                console.error('Error extracting colors:', error);
                setUploadError('Failed to extract colors from image');
            } finally {
                setIsUploading(false);
            }
        };

        img.onerror = () => {
            setUploadError('Failed to load image for color extraction');
            setIsUploading(false);
        };

        img.src = imageSrc;
    };

    const rgbToHex = (rgb) => {
        return '#' + rgb.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#3b82f6';
        e.currentTarget.style.backgroundColor = '#f0f9ff';
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.backgroundColor = 'white';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.backgroundColor = 'white';

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                setLogoFile(file);
                setUploadError('');

                const reader = new FileReader();
                reader.onload = (e) => {
                    setLogoPreview(e.target.result);
                    extractColorsFromImage(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                setUploadError('Please drop a valid image file');
            }
        }
    };

    const removeLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
        setExtractedColors([]);
        setBrandName('');
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="step-content">
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>
                Welcome to Process View
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                This is where you can overview your project setup and configure your portal step by step.
            </p>

            <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    🎨 Logo & Branding
                </h3>

                <div
                    style={{
                        border: '2px dashed #e2e8f0',
                        borderRadius: '12px',
                        padding: '32px',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {!logoPreview ? (
                        <div>
                            <div style={{
                                fontSize: '48px',
                                marginBottom: '16px',
                                color: '#94a3b8'
                            }}>
                                📁
                            </div>
                            <h4 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1e293b',
                                marginBottom: '8px'
                            }}>
                                Upload your logo
                            </h4>
                            <p style={{
                                fontSize: '14px',
                                color: '#64748b',
                                marginBottom: '16px'
                            }}>
                                Drag and drop your logo here, or click to browse
                            </p>
                            <p style={{
                                fontSize: '12px',
                                color: '#94a3b8'
                            }}>
                                Supports: PNG, JPG, SVG (Max: 5MB)
                            </p>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto 16px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '2px solid #e2e8f0'
                            }}>
                                <img
                                    src={logoPreview}
                                    alt="Logo preview"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                            <p style={{
                                fontSize: '14px',
                                color: '#64748b',
                                marginBottom: '8px'
                            }}>
                                {logoFile?.name}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeLogo();
                                }}
                                style={{
                                    padding: '8px 16px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                            >
                                Remove Logo
                            </button>
                        </div>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                {uploadError && (
                    <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        color: '#dc2626',
                        fontSize: '14px'
                    }}>
                        {uploadError}
                    </div>
                )}

                {isUploading && (
                    <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '6px',
                        color: '#0369a1',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid #0369a1',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        Extracting colors from logo...
                    </div>
                )}
            </div>

            <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    🏷️ Brand Name
                </h3>
                <input
                    type="text"
                    placeholder="Enter your brand/company name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                        transition: 'border-color 0.2s',
                        backgroundColor: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
            </div>

            {extractedColors.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        🎨 Color Palette
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        {extractedColors.map((color, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '16px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    background: 'white'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: color.hex,
                                        borderRadius: '4px',
                                        border: '1px solid #e2e8f0'
                                    }}></div>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e293b'
                                    }}>
                                        {color.label}
                                    </span>
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#64748b',
                                    marginBottom: '8px'
                                }}>
                                    {color.hex}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#64748b',
                                    fontWeight: '500'
                                }}>
                                    {color.percentage}% presence
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
            }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
                    <strong>Current Progress:</strong> Step {1} of {4}
                </p>
            </div>
        </div>
    );
};

export default LogoUploadContainer; 