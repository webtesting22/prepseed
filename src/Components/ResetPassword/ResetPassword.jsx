"use client";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Form,
    Input,
    Button,
    Card,
    Typography,
    Alert,
    Space,
    Row,
    Col,
    notification
} from "antd";
import { LockOutlined, CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// API function to reset password
const resetPassword = async (password, token) => {
    const response = await fetch('https://napi.prepseed.com/users/resetPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw { status: response.status, json: error };
    }

    return response.json();
};

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(null);

    // Get token and redirect URL from search params
    const token = searchParams.get('token');
    const redirectUrl = searchParams.get('r');

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            await resetPassword(values.password, token);
            setIsUpdated(true);

            notification.success({
                message: 'Success!',
                description: 'Your password has been updated successfully.',
                icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
            });

            // Redirect after 3 seconds
            setTimeout(() => {
                if (typeof redirectUrl !== "string" || !redirectUrl) {
                    navigate("/");
                } else if (redirectUrl.indexOf("://") === -1) {
                    navigate(redirectUrl);
                } else {
                    window.location.href = redirectUrl;
                }
            }, 3000);

        } catch (err) {
            let errorMessage = "An unexpected error occurred. Please try again.";

            if (err.status === 422) {
                if (err.json?.error?.code === "auth/token-expired") {
                    errorMessage = "This link is either invalid or the token has expired.";
                } else {
                    errorMessage = "Unknown error occurred. Please try again.";
                }
            } else if (err.status === 500) {
                errorMessage = "Internal Server Error. Please try again.";
            } else {
                errorMessage = "Network error occurred. Please try again.";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (isUpdated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <Row justify="center" style={{ width: '100%' }}>
                    <Col xs={22} sm={18} md={12} lg={8} xl={6}>
                        <Card
                            style={{
                                textAlign: 'center',
                                borderRadius: '12px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            }}
                            bodyStyle={{ padding: '40px 30px' }}
                        >
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <img
                                        src="https://static.prepseed.com/brand/prepseed/landscape.svg"
                                        height="48"
                                        width="163"
                                        alt="Prepseed Logo"
                                        style={{ height: "48px" }}
                                    />
                                </div>

                                <CheckCircleOutlined
                                    style={{
                                        fontSize: '48px',
                                        color: '#52c41a',
                                        marginBottom: '16px'
                                    }}
                                />

                                <Title level={3} style={{ color: '#52c41a', margin: 0 }}>
                                    Password Updated Successfully!
                                </Title>

                                <Text type="secondary">
                                    You will be redirected automatically in a few seconds...
                                </Text>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Row justify="center" style={{ width: '100%' }}>
                <Col xs={22} sm={18} md={12} lg={8} xl={6}>
                    <Card
                        style={{
                            borderRadius: '12px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        }}
                        bodyStyle={{ padding: '40px 30px' }}
                    >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <img
                                    src="https://static.prepseed.com/brand/prepseed/landscape.svg"
                                    height="48"
                                    width="163"
                                    alt="Prepseed Logo"
                                    style={{ height: "48px" }}
                                />
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <Title level={2} style={{ marginBottom: '8px' }}>
                                    Reset Your Password
                                </Title>
                                <Text type="secondary">
                                    Enter your new password below
                                </Text>
                            </div>

                            {error && (
                                <Alert
                                    message="Error"
                                    description={error}
                                    type="error"
                                    showIcon
                                    style={{ marginBottom: '16px' }}
                                />
                            )}

                            <Form
                                form={form}
                                name="reset-password"
                                onFinish={onFinish}
                                layout="vertical"
                                size="large"
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="password"
                                    label="New Password"
                                    rules={[
                                        { required: true, message: 'Please enter your new password!' },
                                        { min: 6, message: 'Password should be at least 6 characters' },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Enter new password"
                                        autoComplete="new-password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 0 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        block
                                        style={{
                                            height: '45px',
                                            fontSize: '16px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            border: 'none',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        {loading ? 'Updating Password...' : 'Update Password'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
