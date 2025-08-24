import React, { useState } from 'react';
import {
    Layout,
    Menu,
    Avatar,
    Dropdown,
    Button,
    Modal,
    Typography,
    theme,
    Space,
    Badge,
    Card,
    Row,
    Col,
    Statistic,
    List,
    Tag,
    Table,
    Calendar,
    Divider
} from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    CheckSquareOutlined,
    CalendarOutlined,
    CustomerServiceOutlined,
    // ListOutlined,
    LogoutOutlined,
    SettingOutlined,
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import "./Portal.css";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Dummy data
const dashboardStats = [
    { title: 'Total Clients', value: 1234, prefix: <UserOutlined />, color: '#1890ff' },
    { title: 'Active Leads', value: 89, prefix: <TeamOutlined />, color: '#52c41a' },
    { title: 'Pending Tasks', value: 23, prefix: <CheckSquareOutlined />, color: '#faad14' },
    { title: 'Support Tickets', value: 12, prefix: <CustomerServiceOutlined />, color: '#f5222d' }
];

const recentActivities = [
    { id: 1, action: 'New client registration', user: 'John Doe', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Task completed', user: 'Jane Smith', time: '4 hours ago', type: 'info' },
    { id: 3, action: 'Support ticket resolved', user: 'Mike Johnson', time: '6 hours ago', type: 'success' },
    { id: 4, action: 'Lead status updated', user: 'Sarah Wilson', time: '8 hours ago', type: 'warning' }
];

const clientsData = [
    { key: '1', name: 'ABC Corp', email: 'contact@abc.com', status: 'Active', joinDate: '2024-01-15' },
    { key: '2', name: 'XYZ Ltd', email: 'info@xyz.com', status: 'Inactive', joinDate: '2024-02-20' },
    { key: '3', name: 'Tech Solutions', email: 'hello@tech.com', status: 'Active', joinDate: '2024-03-10' },
    { key: '4', name: 'Digital Agency', email: 'contact@digital.com', status: 'Pending', joinDate: '2024-03-25' }
];

const leadsData = [
    { key: '1', name: 'Robert Brown', company: 'Innovation Inc', status: 'Hot', source: 'Website' },
    { key: '2', name: 'Emma Davis', company: 'StartupCo', status: 'Warm', source: 'Referral' },
    { key: '3', name: 'Michael Wilson', company: 'Enterprise LLC', status: 'Cold', source: 'LinkedIn' },
    { key: '4', name: 'Lisa Anderson', company: 'Growth Partners', status: 'Hot', source: 'Email Campaign' }
];

const tasksData = [
    { key: '1', title: 'Follow up with ABC Corp', priority: 'High', dueDate: '2024-01-30', assignee: 'John Doe' },
    { key: '2', title: 'Prepare proposal for XYZ Ltd', priority: 'Medium', dueDate: '2024-02-05', assignee: 'Jane Smith' },
    { key: '3', title: 'Client onboarding call', priority: 'High', dueDate: '2024-02-01', assignee: 'Mike Johnson' },
    { key: '4', title: 'Update CRM database', priority: 'Low', dueDate: '2024-02-10', assignee: 'Sarah Wilson' }
];

const Portal = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('dashboard');
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard'
        },
        {
            key: 'clients',
            icon: <UserOutlined />,
            label: 'Clients'
        },
        {
            key: 'leads',
            icon: <TeamOutlined />,
            label: 'Leads'
        },
        {
            key: 'tasks',
            icon: <CheckSquareOutlined />,
            label: 'Tasks'
        },
        {
            key: 'calendar',
            icon: <CalendarOutlined />,
            label: 'Calendar'
        },
        {
            key: 'support',
            icon: <CustomerServiceOutlined />,
            label: 'Support Center'
        }
    ];

    const profileMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile'
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings'
        },
        {
            type: 'divider'
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => setLogoutModalVisible(true)
        }
    ];

    const handleLogout = () => {
        setLogoutModalVisible(false);
        // Add logout logic here
        console.log('User logged out');
    };

    const renderDashboard = () => (
        <div className="portal-dashboard">
            <Title level={2}>Dashboard</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                {dashboardStats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.prefix}
                                valueStyle={{ color: stat.color }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Recent Activities">
                        <List
                            dataSource={recentActivities}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.action}
                                        description={`${item.user} • ${item.time}`}
                                    />
                                    <Tag color={item.type === 'success' ? 'green' : item.type === 'warning' ? 'orange' : 'blue'}>
                                        {item.type}
                                    </Tag>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Quick Actions">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button type="primary" block icon={<UserOutlined />}>
                                Add New Client
                            </Button>
                            <Button block icon={<TeamOutlined />}>
                                Create Lead
                            </Button>
                            <Button block icon={<CheckSquareOutlined />}>
                                Add Task
                            </Button>
                            <Button block icon={<CustomerServiceOutlined />}>
                                Support Ticket
                            </Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderClients = () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <Tag color={status === 'Active' ? 'green' : status === 'Inactive' ? 'red' : 'orange'}>
                        {status}
                    </Tag>
                )
            },
            {
                title: 'Join Date',
                dataIndex: 'joinDate',
                key: 'joinDate'
            }
        ];

        return (
            <div className="portal-clients">
                <Title level={2}>Clients</Title>
                <Card>
                    <Table
                        dataSource={clientsData}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: true }}
                    />
                </Card>
            </div>
        );
    };

    const renderLeads = () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Company',
                dataIndex: 'company',
                key: 'company'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <Tag color={status === 'Hot' ? 'red' : status === 'Warm' ? 'orange' : 'blue'}>
                        {status}
                    </Tag>
                )
            },
            {
                title: 'Source',
                dataIndex: 'source',
                key: 'source'
            }
        ];

        return (
            <div className="portal-leads">
                <Title level={2}>Leads</Title>
                <Card>
                    <Table
                        dataSource={leadsData}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: true }}
                    />
                </Card>
            </div>
        );
    };

    const renderTasks = () => {
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                key: 'priority',
                render: (priority) => (
                    <Tag color={priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green'}>
                        {priority}
                    </Tag>
                )
            },
            {
                title: 'Due Date',
                dataIndex: 'dueDate',
                key: 'dueDate'
            },
            {
                title: 'Assignee',
                dataIndex: 'assignee',
                key: 'assignee'
            }
        ];

        return (
            <div className="portal-tasks">
                <Title level={2}>Tasks</Title>
                <Card>
                    <Table
                        dataSource={tasksData}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: true }}
                    />
                </Card>
            </div>
        );
    };

    const renderCalendar = () => (
        <div className="portal-calendar">
            <Title level={2}>Calendar</Title>
            <Card>
                <Calendar
                    onPanelChange={(value, mode) => {
                        console.log(value.format('YYYY-MM-DD'), mode);
                    }}
                />
            </Card>
        </div>
    );

    const renderSupport = () => (
        <div className="portal-support">
            <Title level={2}>Support Center</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Recent Tickets">
                        <List
                            dataSource={[
                                { id: 254, subject: 'iPhone 13 Pro features inquiry', status: 'Open', user: 'Dustin Rivest' },
                                { id: 253, subject: 'Payment gateway integration', status: 'Resolved', user: 'Sarah Johnson' },
                                { id: 252, subject: 'API documentation request', status: 'In Progress', user: 'Mike Chen' }
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`Ticket #${item.id}: ${item.subject}`}
                                        description={`${item.user} • Status: ${item.status}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Support Stats">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Open Tickets" value={12} valueStyle={{ color: '#cf1322' }} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Resolved Today" value={8} valueStyle={{ color: '#3f8600' }} />
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic title="Avg Response" value="2.4h" valueStyle={{ color: '#1890ff' }} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Satisfaction" value={94} suffix="%" valueStyle={{ color: '#3f8600' }} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderContent = () => {
        switch (selectedKey) {
            case 'dashboard':
                return renderDashboard();
            case 'clients':
                return renderClients();
            case 'leads':
                return renderLeads();
            case 'tasks':
                return renderTasks();
            case 'calendar':
                return renderCalendar();
            case 'support':
                return renderSupport();
            default:
                return renderDashboard();
        }
    };

    return (
        <Layout className="portal-layout">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="portal-sider"
                width={250}
                collapsedWidth={80}
            >
                <div className="portal-logo">
                    {!collapsed ? (
                        <>
                            <div className="logo-icon">CX</div>
                            <span className="brand-name">Craxinno</span>
                        </>
                    ) : (
                        <div className="logo-icon">CX</div>
                    )}
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={({ key }) => setSelectedKey(key)}
                    className="portal-menu"
                />
            </Sider>

            <Layout>
                <Header className="portal-header">
                    <div className="header-left">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="trigger-btn"
                        />
                    </div>

                    <div className="header-right">
                        <Space size="middle">
                            <Badge count={5}>
                                <Button
                                    type="text"
                                    icon={<BellOutlined />}
                                    className="notification-btn"
                                />
                            </Badge>

                            <Dropdown
                                menu={{
                                    items: profileMenuItems,
                                    onClick: ({ key }) => {
                                        if (key === 'logout') {
                                            setLogoutModalVisible(true);
                                        }
                                    }
                                }}
                                placement="bottomRight"
                            >
                                <Space className="profile-dropdown">
                                    <Avatar size="small" icon={<UserOutlined />} />
                                    <Text strong>John Doe</Text>
                                </Space>
                            </Dropdown>
                        </Space>
                    </div>
                </Header>

                <Content className="portal-content">
                    <div
                        className="content-wrapper"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        {renderContent()}
                    </div>
                </Content>
            </Layout>

            <Modal
                title="Confirm Logout"
                open={logoutModalVisible}
                onOk={handleLogout}
                onCancel={() => setLogoutModalVisible(false)}
                okText="Logout"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to logout? You will need to sign in again to access the portal.</p>
            </Modal>
        </Layout>
    );
};

export default Portal;   