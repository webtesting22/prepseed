import React, { useContext, useState, useEffect } from "react";
import { 
  Card, 
  Avatar, 
  Tag, 
  Typography, 
  Space, 
  Divider, 
  Row, 
  Col, 
  Button,
  Timeline,
  Progress,
  Empty
} from "antd";
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  UserOutlined,
  BuildOutlined
} from "@ant-design/icons";
import DynamicPortalContext from "../../CommonContext/DynamicPortalContext";
import PortalCreationLoader from "../PortalCreationLoader/PortalCreationLoader";
import "./PreviewDetails.css";

const { Title, Text, Paragraph } = Typography;

const PreviewDetails = () => {
  const {
    currentStep,
    steps,
    // Logo/Brand data
    logoPreview,
    brandName,
    selectedColors,
    uploadedLogoUrl,
    logoUploadSuccess,
    // Industry data
    selectedIndustry,
    // Modules data
    selectedModules,
    modules,
    // Personal data
    personalInfo,
    isPersonalInfoComplete,
    // Data management
    clearAllData,
    // Portal creation
    isCreatingPortal,
    isAllStepsCompleted,
    startPortalCreation,
  } = useContext(DynamicPortalContext);

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    let completed = 0;
    const totalSteps = steps.length;
    
    // Step 0: Logo Upload
    if (logoPreview || uploadedLogoUrl) completed++;
    
    // Step 1: Industry Selection
    if (selectedIndustry) completed++;
    
    // Step 2: Modules Selection
    if (selectedModules && selectedModules.length > 0) completed++;
    
    // Step 3: Identity (check if personal info is complete)
    if (isPersonalInfoComplete()) completed++;
    
    return Math.round((completed / totalSteps) * 100);
  };

  // Get selected modules details
  const getSelectedModulesDetails = () => {
    if (!selectedModules || !modules) return [];
    return modules.filter(module => selectedModules.includes(module._id));
  };

  // Dynamic personal data from context
  const personalData = {
    name: personalInfo.fullName || personalInfo.companyName || brandName || "Your Business Name",
    email: personalInfo.email || "contact@yourbusiness.com",
    phone: personalInfo.phone || "+1 (555) 123-4567",
    location: personalInfo.location || "Business Location",
    companyName: personalInfo.companyName || "Your Company",
    jobTitle: personalInfo.jobTitle || "Position",
    companySize: personalInfo.companySize || "Company Size",
    description: "Transform your business with our comprehensive digital platform solution. We provide end-to-end services tailored to your industry needs.",
  };

  const completionPercentage = getCompletionPercentage();
  const selectedModulesDetails = getSelectedModulesDetails();

    return (
    <>
      <PortalCreationLoader />
      <div className="preview-details-container">
        <Card className="candidate-card" bordered={false}>
        {/* Header Section with Avatar and Basic Info */}
        <div className="card-header">
          <Avatar 
            size={80} 
            src={logoPreview || uploadedLogoUrl}
            className="candidate-avatar"
            style={{
              background: selectedColors?.[0]?.hex || '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!logoPreview && !uploadedLogoUrl && (
              <BuildOutlined style={{ fontSize: '32px', color: 'white' }} />
            )}
          </Avatar>
          <div className="candidate-basic-info">
            <Title level={3} className="candidate-name">
              {personalData.name}
            </Title>
            <Space align="center" className="location-info">
              <GlobalOutlined style={{ color: "#666" }} />
              <Text type="secondary">{selectedIndustry?.name || "Industry Selection Pending"}</Text>
            </Space>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <Text type="secondary">Portal Setup Progress</Text>
          <Progress 
            percent={completionPercentage} 
            strokeColor={{
              '0%': selectedColors?.[0]?.hex || '#4CAF50',
              '100%': selectedColors?.[1]?.hex || '#8BC34A',
            }}
            className="setup-progress"
          />
        </div>

        {/* Stats Section */}
        <Row gutter={16} className="stats-section">
          <Col span={6}>
            <div className="stat-item">
              <Text type="secondary">Current Step</Text>
              <Title level={4} className="stat-value">
                {currentStep + 1}/{steps.length}
              </Title>
            </div>
          </Col>
          <Col span={6}>
            <div className="stat-item">
              <Text type="secondary">Industry</Text>
              <Title level={4} className="stat-value">
                {selectedIndustry ? "✓" : "⏳"}
              </Title>
            </div>
          </Col>
          <Col span={6}>
            <div className="stat-item">
              <Text type="secondary">Modules</Text>
              <Title level={4} className="stat-value">
                {selectedModules?.length || 0}
              </Title>
            </div>
          </Col>
          <Col span={6}>
            <div className="stat-item">
              <Text type="secondary">Logo</Text>
              <Title level={4} className="stat-value">
                {logoPreview || uploadedLogoUrl ? "✓" : "⏳"}
              </Title>
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Description */}
        <div className="description-section">
          <Paragraph className="candidate-description">
            {personalData.description}
          </Paragraph>
        </div>

        {/* Industry Section */}
        {selectedIndustry && (
          <div className="industry-section">
            <Text strong>Selected Industry</Text>
            <div className="industry-info">
              <Tag className="industry-tag" color="blue">
                <GlobalOutlined /> {selectedIndustry.name}
              </Tag>
              {selectedIndustry.description && (
                <Text type="secondary" className="industry-desc">
                  {selectedIndustry.description}
                </Text>
              )}
            </div>
          </div>
        )}

        {/* Modules Section */}
        {selectedModulesDetails.length > 0 && (
          <div className="modules-section">
            <Text strong>Selected Modules ({selectedModulesDetails.length})</Text>
            <div className="modules-tags">
              {selectedModulesDetails.slice(0, 3).map((module, index) => (
                <Tag key={index} className="module-tag">
                  <AppstoreOutlined /> {module.name}
                </Tag>
              ))}
              {selectedModulesDetails.length > 3 && (
                <Tag className="more-modules-tag">
                  +{selectedModulesDetails.length - 3} more
                </Tag>
              )}
            </div>
          </div>
        )}

        {/* Empty State for Modules */}
        {selectedModulesDetails.length === 0 && (
          <div className="modules-section">
            <Text strong>Modules Selection</Text>
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No modules selected yet"
              style={{ margin: '16px 0' }}
            />
          </div>
        )}

        <Divider />

        {/* Contact Details */}
        <div className="contact-section">
          <Title level={5}>Contact Information</Title>
          <Space direction="vertical" size="small" className="contact-info">
            <Space align="center">
              <UserOutlined />
              <Text>{personalData.name}</Text>
            </Space>
            <Space align="center">
              <MailOutlined />
              <Text>{personalData.email}</Text>
            </Space>
            <Space align="center">
              <PhoneOutlined />
              <Text>{personalData.phone}</Text>
            </Space>
            {personalData.jobTitle !== "Position" && (
              <Space align="center">
                <BuildOutlined />
                <Text>{personalData.jobTitle}</Text>
              </Space>
            )}
            {personalData.companySize !== "Company Size" && (
              <Space align="center">
                <GlobalOutlined />
                <Text>{personalData.companySize}</Text>
              </Space>
            )}
          </Space>
        </div>

        <Divider />

        {/* Setup Progress Timeline */}
        <div className="setup-timeline-section">
          <Title level={5}>Setup Progress</Title>
          <div className="timeline-section">
            <Timeline>
              <Timeline.Item 
                dot={logoPreview || uploadedLogoUrl ? 
                  <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
                  <ClockCircleOutlined style={{ color: '#1890ff' }} />
                }
                color={logoPreview || uploadedLogoUrl ? "green" : "blue"}
              >
                <Text>Logo & Branding {logoPreview || uploadedLogoUrl ? "✓" : "⏳"}</Text>
              </Timeline.Item>
              <Timeline.Item 
                dot={selectedIndustry ? 
                  <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
                  <ClockCircleOutlined style={{ color: '#1890ff' }} />
                }
                color={selectedIndustry ? "green" : "blue"}
              >
                <Text>Industry Selection {selectedIndustry ? "✓" : "⏳"}</Text>
              </Timeline.Item>
              <Timeline.Item 
                dot={selectedModules?.length > 0 ? 
                  <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
                  <ClockCircleOutlined style={{ color: '#1890ff' }} />
                }
                color={selectedModules?.length > 0 ? "green" : "blue"}
              >
                <Text>Modules Selection {selectedModules?.length > 0 ? "✓" : "⏳"}</Text>
              </Timeline.Item>
              <Timeline.Item 
                dot={isPersonalInfoComplete() ? 
                  <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
                  <ClockCircleOutlined style={{ color: '#1890ff' }} />
                }
                color={isPersonalInfoComplete() ? "green" : "blue"}
              >
                <Text>Identity Setup {isPersonalInfoComplete() ? "✓" : "⏳"}</Text>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>

        {/* Portal Creation Button */}
        <div className="feedback-section">
          <Button 
            type="primary" 
            size="large" 
            className="feedback-btn"
            disabled={!isAllStepsCompleted()}
            onClick={startPortalCreation}
            loading={isCreatingPortal}
            block
          >
            {isCreatingPortal ? 'Creating Portal...' : 'Create Web Portal'}
          </Button>
          
          {!isAllStepsCompleted() && (
            <Text 
              type="secondary" 
              style={{ 
                fontSize: '12px', 
                marginTop: '8px', 
                display: 'block',
                textAlign: 'center'
              }}
            >
              ⚠️ Complete all steps to enable portal creation
            </Text>
          )}
          
          {/* Debug: Clear Data Button (for testing) */}
          <Button 
            type="default" 
            size="small" 
            onClick={clearAllData}
            style={{ 
              marginTop: '10px', 
              fontSize: '12px',
              height: '32px',
              opacity: 0.7
            }}
            block
          >
            🗑️ Clear All Data (Reset)
          </Button>
        </div>
      </Card>
    </div>
    </>
  );
};

export default PreviewDetails;