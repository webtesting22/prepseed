import React, { useContext, useEffect, useState } from 'react';
import { Progress, Typography, Modal, List, Button } from 'antd';
import {
    CheckCircleOutlined,
    LoadingOutlined,
    GlobalOutlined,
    AppstoreOutlined,
    UserOutlined,
    BuildOutlined,
    DownOutlined,
    RightOutlined
} from '@ant-design/icons';
import DynamicPortalContext from '../../CommonContext/DynamicPortalContext';
import './PortalCreationLoader.css';

const { Title, Text } = Typography;

const PortalCreationLoader = () => {
    const {
        isCreatingPortal,
        portalCreationProgress,
        personalInfo,
        selectedIndustry,
        selectedModules,
        modules,
        brandName,
        logoPreview,
        uploadedLogoUrl
    } = useContext(DynamicPortalContext);

    const [currentStep, setCurrentStep] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const creationSteps = [
        {
            id: 0,
            title: "Setting up your workspace",
            icon: <BuildOutlined />,
            progress: 0
        },
        {
            id: 1,
            title: "Configuring industry settings",
            icon: <GlobalOutlined />,
            progress: 25
        },
        {
            id: 2,
            title: "Installing selected modules",
            icon: <AppstoreOutlined />,
            progress: 50
        },
        {
            id: 3,
            title: "Finalizing your portal",
            icon: <UserOutlined />,
            progress: 75
        }
    ];

    useEffect(() => {
        const newStep = Math.floor(portalCreationProgress / 25);
        setCurrentStep(Math.min(newStep, creationSteps.length - 1));
    }, [portalCreationProgress]);

    const getStepStatus = (stepId) => {
        if (stepId < currentStep) return 'completed';
        if (stepId === currentStep && portalCreationProgress < 100) return 'active';
        if (portalCreationProgress >= 100) return 'completed';
        return 'pending';
    };

    return (
        <Modal
            open={isCreatingPortal}
            closable={false}
            maskClosable={false}
            keyboard={false}
            footer={null}
            width={600}
            centered
            className="portal-creation-modal"
            styles={{
                body: { padding: 0 },
                content: { borderRadius: 20 }
            }}
            destroyOnClose={true}
        >
            <div className="confirm-modal-container">
                {/* Header */}
                <div className="confirm-header">
                    <Title level={3} className="confirm-title">Confirm</Title>
                </div>

                {/* Brand Section */}
                <div className="brand-section">
                    <div className="brand-info">
                        <div className="brand-logo">
                            {logoPreview || uploadedLogoUrl ? (
                                <img src={logoPreview || uploadedLogoUrl} alt="Brand Logo" className="logo-image" />
                            ) : (
                                <div className="logo-placeholder">
                                    <BuildOutlined />
                                </div>
                            )}
                        </div>
                        <div className="brand-details">
                            <Text strong className="brand-name">
                                {personalInfo.companyName || brandName || 'Your Portal'}
                            </Text>
                            <Text type="secondary" className="brand-subtitle">
                                {selectedIndustry?.name || 'Portal Creation'}
                            </Text>
                        </div>
                    </div>
                    <div className="brand-meta">
                        <Text type="secondary">Progress</Text>
                        <Text strong>{Math.round(portalCreationProgress)}%</Text>
                    </div>
                </div>

                {/* Modules Grid */}
                {selectedModules && selectedModules.length > 0 && (
                    <div className="modules-grid">
                        {selectedModules.slice(0, 6).map((moduleId, index) => {
                            const module = modules.find(m => m._id === moduleId);
                            return (
                                <div key={moduleId} className="module-card">
                                    <div className="module-icon">
                                        <AppstoreOutlined />
                                    </div>
                                    <Text className="module-name">{module?.name || `Module ${index + 1}`}</Text>
                                </div>
                            );
                        })}
                        {selectedModules.length > 6 && (
                            <div className="module-card more-modules">
                                <div className="module-icon">+</div>
                                <Text className="module-name">{selectedModules.length - 6} more</Text>
                            </div>
                        )}
                    </div>
                )}

                {/* Steps Timeline */}
                <div className="steps-timeline">
                    {creationSteps.map((step, index) => {
                        const status = getStepStatus(step.id);
                        return (
                            <div key={step.id} className={`timeline-step ${status}`}>
                                <div className="timeline-connector">
                                    <div className="timeline-dot">
                                        {status === 'completed' ? (
                                            <CheckCircleOutlined />
                                        ) : status === 'active' ? (
                                            <LoadingOutlined />
                                        ) : (
                                            <div className="empty-dot"></div>
                                        )}
                                    </div>
                                    {index < creationSteps.length - 1 && <div className="timeline-line"></div>}
                                </div>
                                <div className="timeline-content">
                                    <Text className={`step-text ${status}`}>{step.title}</Text>
                                    {status === 'active' && (
                                        <Text type="secondary" className="step-status">in progress</Text>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action Button */}
                <div className="action-section">
                    <Button
                        type="primary"
                        size="large"
                        block
                        loading={portalCreationProgress > 0 && portalCreationProgress < 100}
                        className="action-button"
                    >
                        {portalCreationProgress > 0 && portalCreationProgress < 100 ? (
                            <>
                                <LoadingOutlined /> Creating Portal
                            </>
                        ) : portalCreationProgress >= 100 ? (
                            'Portal Created!'
                        ) : (
                            'Create Portal'
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default PortalCreationLoader;
