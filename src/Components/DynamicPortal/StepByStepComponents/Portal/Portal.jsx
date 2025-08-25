import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend
} from 'recharts';
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
    Divider,
    Form,
    Input,
    DatePicker,
    TimePicker,
    Select,
    message,
    Popover,
    Tooltip,
    Alert
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
    MenuUnfoldOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    PhoneOutlined,
    CloudOutlined,
    FolderOutlined,
    FileOutlined,
    UploadOutlined,
    DownloadOutlined,
    EyeOutlined
} from '@ant-design/icons';
import "./Portal.css";
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Dashboard data similar to the image
const dashboardStats = [
    { title: 'Transaction Total', value: '$570.7', prefix: <UserOutlined />, color: '#10b981', growth: '+40%', period: 'vs last month', status: 'up' },
    { title: 'Upcoming Payment', value: '$221.0', prefix: <TeamOutlined />, color: '#3b82f6', growth: '0', period: 'payment due on not set', status: 'neutral' },
    { title: 'Outstanding Balance', value: '$410.0', prefix: <CheckSquareOutlined />, color: '#f59e0b', growth: '0', period: 'past-due items across 0 leases', status: 'neutral' },
    { title: 'Leases Expiring', value: '$340.0', prefix: <CustomerServiceOutlined />, color: '#ef4444', growth: '60 days', period: 'Leases duration is 60 days', status: 'warning' }
];

// Chart data for Income Summary
const incomeData = [
    { month: 'Jan', income: 15000, expense: 8000 },
    { month: 'Feb', income: 25000, expense: 12000 },
    { month: 'Mar', income: 35000, expense: 18000 },
    { month: 'Apr', income: 45000, expense: 22000 },
    { month: 'May', income: 30000, expense: 20000 },
    { month: 'Jun', income: 20000, expense: 15000 },
    { month: 'Jul', income: 25000, expense: 18000 },
    { month: 'Aug', income: 120000, expense: 85000 },
    { month: 'Sep', income: 140000, expense: 95000 },
    { month: 'Oct', income: 160000, expense: 110000 },
    { month: 'Nov', income: 180000, expense: 120000 },
    { month: 'Dec', income: 200000, expense: 130000 }
];

// Transaction data for table
const transactionData = [
    {
        key: '1',
        propertyName: 'Nexus Advisory',
        propertyAddress: '4140 Parker Rd. Allentown, New Mexico 31134',
        amount: '$1500.00',
        date: '26 Mar 2025',
        transactionType: 'Stripe',
        status: 'Completed'
    },
    {
        key: '2',
        propertyName: 'Manhattan View Lofts',
        propertyAddress: '3891 Ranchview Dr. Richardson, California 62639',
        amount: '$2500.00',
        date: '26 June 2025',
        transactionType: 'Stripe',
        status: 'Completed'
    },
    {
        key: '3',
        propertyName: 'Skyline Properties',
        propertyAddress: '2715 Ash Dr. San Jose, South Dakota 83475',
        amount: '$1800.00',
        date: '15 Apr 2025',
        transactionType: 'PayPal',
        status: 'Pending'
    },
    {
        key: '4',
        propertyName: 'Urban Heights',
        propertyAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
        amount: '$3200.00',
        date: '08 May 2025',
        transactionType: 'Bank Transfer',
        status: 'Failed'
    }
];

// Colors for charts
const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];
const INCOME_COLORS = {
    income: '#10b981',
    expense: '#ef4444'
};

// Drive/Media data
const driveData = [
    {
        key: '1',
        name: 'Project Documents',
        type: 'folder',
        size: '2.3 GB',
        modified: '2025-01-15',
        items: 45,
        icon: <FolderOutlined style={{ color: '#f59e0b' }} />
    },
    {
        key: '2',
        name: 'Marketing Materials',
        type: 'folder',
        size: '856 MB',
        modified: '2025-01-10',
        items: 23,
        icon: <FolderOutlined style={{ color: '#3b82f6' }} />
    },
    {
        key: '3',
        name: 'Brand Guidelines.pdf',
        type: 'pdf',
        size: '12.5 MB',
        modified: '2025-01-12',
        items: null,
        icon: <FileOutlined style={{ color: '#ef4444' }} />
    },
    {
        key: '4',
        name: 'Logo Assets.zip',
        type: 'zip',
        size: '45.2 MB',
        modified: '2025-01-08',
        items: null,
        icon: <FileOutlined style={{ color: '#8b5cf6' }} />
    },
    {
        key: '5',
        name: 'Product Images',
        type: 'folder',
        size: '1.2 GB',
        modified: '2025-01-05',
        items: 87,
        icon: <FolderOutlined style={{ color: '#10b981' }} />
    }
];

// Drive storage stats
const driveStats = [
    { label: 'Total Storage', value: '100 GB', used: '45.8 GB', color: '#3b82f6' },
    { label: 'Documents', value: '12.3 GB', percentage: 27, color: '#f59e0b' },
    { label: 'Images', value: '18.9 GB', percentage: 41, color: '#10b981' },
    { label: 'Videos', value: '14.6 GB', percentage: 32, color: '#ef4444' }
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
    const [cookieNoticeVisible, setCookieNoticeVisible] = useState(true);
    const [driveTab, setDriveTab] = useState('dashboard');

    // Load user data from localStorage
    const [userData, setUserData] = useState({
        logoPreview: null,
        uploadedLogoUrl: null,
        brandName: '',
        selectedIndustry: null,
        selectedModules: [],
        selectedColors: []
    });

    // Calendar and Event Management State
    const [events, setEvents] = useState([]);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    // Load user data from localStorage on component mount
    useEffect(() => {
        try {
            // Load from created portal data first (latest)
            const createdPortalData = localStorage.getItem('createdPortalData');
            if (createdPortalData) {
                const parsedData = JSON.parse(createdPortalData);
                console.log('Loaded created portal data:', parsedData); // Debug log
                setUserData({
                    logoPreview: parsedData.branding?.logo || null,
                    uploadedLogoUrl: null,
                    brandName: parsedData.branding?.name || '',
                    selectedIndustry: parsedData.industry || null,
                    selectedModules: parsedData.modules || [],
                    selectedColors: parsedData.branding?.colors || []
                });
                return;
            }

            // Fallback to dynamic portal data
            const dynamicPortalData = localStorage.getItem('dynamicPortalData');
            if (dynamicPortalData) {
                const parsedData = JSON.parse(dynamicPortalData);
                console.log('Loaded dynamic portal data:', parsedData); // Debug log
                setUserData({
                    logoPreview: parsedData.logoPreview || null,
                    uploadedLogoUrl: parsedData.uploadedLogoUrl || null,
                    brandName: parsedData.brandName || '',
                    selectedIndustry: parsedData.selectedIndustry || null,
                    selectedModules: parsedData.selectedModules || [],
                    selectedColors: parsedData.selectedColors || []
                });
            }
        } catch (error) {
            console.error('Error loading user data from localStorage:', error);
        }
    }, []);

    // Debug log for userData state
    useEffect(() => {
        console.log('Current userData state:', userData);
    }, [userData]);

    // Helper function to determine if a color is light or dark
    const isLightColor = (hexColor) => {
        if (!hexColor) return true;
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return brightness > 128;
    };

    // Get dynamic colors from user's selected colors
    const primaryColor = userData.selectedColors?.[0]?.hex || '#1890ff';
    const secondaryColor = userData.selectedColors?.[1]?.hex || '#096dd9';
    const primaryTextColor = isLightColor(primaryColor) ? '#000000' : 'black';
    const secondaryTextColor = isLightColor(secondaryColor) ? '#000000' : '#ffffff';
    const [selectedDate, setSelectedDate] = useState(null);
    const [form] = Form.useForm();

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    // Load events from localStorage on component mount
    useEffect(() => {
        const savedEvents = localStorage.getItem('portalEvents');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);

    // Save events to localStorage whenever events change
    useEffect(() => {
        localStorage.setItem('portalEvents', JSON.stringify(events));
    }, [events]);

    // Event Management Functions
    const addEvent = (eventData) => {
        const newEvent = {
            id: Date.now().toString(),
            ...eventData,
            date: eventData.date.format('YYYY-MM-DD'),
            time: eventData.time ? eventData.time.format('HH:mm') : null,
            createdAt: new Date().toISOString()
        };
        setEvents([...events, newEvent]);
        message.success('Event created successfully!');
    };

    const updateEvent = (eventId, eventData) => {
        setEvents(events.map(event =>
            event.id === eventId
                ? {
                    ...event,
                    ...eventData,
                    date: eventData.date.format('YYYY-MM-DD'),
                    time: eventData.time ? eventData.time.format('HH:mm') : null,
                    updatedAt: new Date().toISOString()
                }
                : event
        ));
        message.success('Event updated successfully!');
    };

    const deleteEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
        message.success('Event deleted successfully!');
    };

    const getEventsForDate = (date) => {
        const dateStr = date.format('YYYY-MM-DD');
        return events.filter(event => event.date === dateStr);
    };

    const handleEventSubmit = (values) => {
        if (editingEvent) {
            updateEvent(editingEvent.id, values);
        } else {
            addEvent(values);
        }
        setEventModalVisible(false);
        setEditingEvent(null);
        form.resetFields();
    };

    const openEventModal = (date = null) => {
        setSelectedDate(date);
        setEditingEvent(null);
        form.resetFields();
        if (date) {
            form.setFieldsValue({ date: date });
        }
        setEventModalVisible(true);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        form.setFieldsValue({
            title: event.title,
            description: event.description,
            date: dayjs(event.date),
            time: event.time ? dayjs(event.time, 'HH:mm') : null,
            priority: event.priority,
            category: event.category
        });
        setEventModalVisible(true);
    };

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard'
        },
        {
            key: 'drive',
            icon: <CloudOutlined />,
            label: 'Drive'
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Owner Dashboard</Title>
                <Button type="primary" style={{ background: primaryColor, borderColor: primaryColor }}>
                    Export Report
                </Button>
            </div>

            {/* Stats Cards */}
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {dashboardStats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card
                            bodyStyle={{ padding: '24px' }}
                            style={{
                                borderRadius: '16px',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <Text style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>
                                        {stat.title}
                                    </Text>
                                    <div style={{ margin: '8px 0' }}>
                                        <Text style={{
                                            fontSize: '32px',
                                            fontWeight: '700',
                                            color: '#1f2937',
                                            lineHeight: 1
                                        }}>
                                            {stat.value}
                                        </Text>
                                    </div>
                                    {stat.status === 'up' && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 600 }}>
                                                ↗ {stat.growth}
                                            </span>
                                            <Text style={{ color: '#64748b', fontSize: '12px' }}>
                                                {stat.period}
                                            </Text>
                                        </div>
                                    )}
                                    {stat.status === 'neutral' && (
                                        <Text style={{ color: '#64748b', fontSize: '12px' }}>
                                            {stat.period}
                                        </Text>
                                    )}
                                    {stat.status === 'warning' && (
                                        <Text style={{ color: '#64748b', fontSize: '12px' }}>
                                            {stat.period}
                                        </Text>
                                    )}
                                </div>
                                <Button
                                    type="text"
                                    icon={<div style={{ fontSize: '16px' }}>⋯</div>}
                                    style={{ padding: 0, minWidth: 'auto' }}
                                />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Income Summary Chart */}
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                <Col xs={24}>
                    <Card
                        title={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Title level={4} style={{ margin: 0, color: '#1f2937' }}>Income Summary</Title>
                                    <Text style={{ color: '#64748b', fontSize: '14px' }}>
                                        Overview of total rental income received over a period.
                                    </Text>
                                </div>
                                <Select defaultValue="1 Mar 2025" style={{ width: 120 }}>
                                    <Select.Option value="1 Mar 2025">1 Mar 2025</Select.Option>
                                    <Select.Option value="1 Apr 2025">1 Apr 2025</Select.Option>
                                    <Select.Option value="1 May 2025">1 May 2025</Select.Option>
                                </Select>
                            </div>
                        }
                        bodyStyle={{ padding: '24px' }}
                        style={{
                            borderRadius: '16px',
                            border: '1px solid #f1f5f9',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <div style={{ height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={incomeData}>
                                    <defs>
                                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={INCOME_COLORS.income} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={INCOME_COLORS.income} stopOpacity={0.05} />
                                        </linearGradient>
                                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={INCOME_COLORS.expense} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={INCOME_COLORS.expense} stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <RechartsTooltip
                                        formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                                        labelStyle={{ color: '#1f2937' }}
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stroke={INCOME_COLORS.income}
                                        strokeWidth={3}
                                        fill="url(#incomeGradient)"
                                        name="Income"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="expense"
                                        stroke={INCOME_COLORS.expense}
                                        strokeWidth={3}
                                        fill="url(#expenseGradient)"
                                        name="Expense"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Chart Annotations */}
                        <div style={{
                            position: 'absolute',
                            top: '140px',
                            right: '120px',
                            background: 'white',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>Aug, 2025</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: INCOME_COLORS.income }}>
                                ● Income: $12,34
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: INCOME_COLORS.expense }}>
                                ● Expense: $2,34
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Last Transactions Table */}
            <Row gutter={[24, 24]}>
                <Col xs={24}>
                    <Card
                        title={
                            <Title level={4} style={{ margin: 0, color: '#1f2937' }}>Last Transactions</Title>
                        }
                        bodyStyle={{ padding: 0 }}
                        style={{
                            borderRadius: '16px',
                            border: '1px solid #f1f5f9',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Table
                            dataSource={transactionData}
                            pagination={false}
                            columns={[
                                {
                                    title: 'Property Name',
                                    dataIndex: 'propertyName',
                                    key: 'propertyName',
                                    render: (text) => (
                                        <Text strong style={{ color: '#1f2937' }}>{text}</Text>
                                    )
                                },
                                {
                                    title: 'Property Address',
                                    dataIndex: 'propertyAddress',
                                    key: 'propertyAddress',
                                    render: (text) => (
                                        <Text style={{ color: '#64748b', fontSize: '14px' }}>{text}</Text>
                                    )
                                },
                                {
                                    title: 'Amount',
                                    dataIndex: 'amount',
                                    key: 'amount',
                                    render: (text) => (
                                        <Text strong style={{ color: '#1f2937' }}>{text}</Text>
                                    )
                                },
                                {
                                    title: 'Date',
                                    dataIndex: 'date',
                                    key: 'date',
                                    render: (text) => (
                                        <Text style={{ color: '#64748b' }}>{text}</Text>
                                    )
                                },
                                {
                                    title: 'Transaction Type',
                                    dataIndex: 'transactionType',
                                    key: 'transactionType',
                                    render: (text) => (
                                        <Tag color="blue" style={{ borderRadius: '6px' }}>{text}</Tag>
                                    )
                                },
                                {
                                    title: 'Status',
                                    dataIndex: 'status',
                                    key: 'status',
                                    render: (status) => (
                                        <Tag
                                            color={
                                                status === 'Completed' ? 'green' :
                                                    status === 'Pending' ? 'orange' : 'red'
                                            }
                                            style={{ borderRadius: '6px' }}
                                        >
                                            {status}
                                        </Tag>
                                    )
                                }
                            ]}
                            style={{
                                borderRadius: '0 0 16px 16px',
                                overflow: 'hidden'
                            }}
                        />
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

    const renderCalendar = () => {
        // Custom date cell renderer to show events
        const dateCellRender = (value) => {
            const dayEvents = getEventsForDate(value);
            return (
                <div className="calendar-events">
                    {dayEvents.map(event => (
                        <Popover
                            key={event.id}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{event.title}</span>
                                    <Space>
                                        <Tooltip title="Edit Event">
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<EditOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditModal(event);
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete Event">
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteEvent(event.id);
                                                }}
                                            />
                                        </Tooltip>
                                    </Space>
                                </div>
                            }
                            content={
                                <div style={{ maxWidth: 300 }}>
                                    {event.description && <p><strong>Description:</strong> {event.description}</p>}
                                    {event.time && <p><strong>Time:</strong> {event.time}</p>}
                                    {event.category && <p><strong>Category:</strong> {event.category}</p>}
                                    {event.priority && (
                                        <p>
                                            <strong>Priority:</strong>
                                            <Tag color={event.priority === 'High' ? 'red' : event.priority === 'Medium' ? 'orange' : 'green'}>
                                                {event.priority}
                                            </Tag>
                                        </p>
                                    )}
                                </div>
                            }
                            trigger="hover"
                        >
                            <div
                                className={`calendar-event priority-${event.priority?.toLowerCase()}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="event-title">{event.title}</span>
                                {event.time && (
                                    <span className="event-time">
                                        <ClockCircleOutlined style={{ fontSize: '10px', marginRight: 2 }} />
                                        {event.time}
                                    </span>
                                )}
                            </div>
                        </Popover>
                    ))}
                </div>
            );
        };

        return (
            <div className="portal-calendar">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Title level={2} style={{ margin: 0 }}>Calendar</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openEventModal()}
                    >
                        Add Event
                    </Button>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={18}>
                        <Card>
                            <Calendar
                                dateCellRender={dateCellRender}
                                onSelect={(date) => {
                                    setSelectedDate(date);
                                }}
                                onPanelChange={(value, mode) => {
                                    console.log(value.format('YYYY-MM-DD'), mode);
                                }}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} lg={6}>
                        <Card title="Quick Actions" style={{ marginBottom: 16 }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Button
                                    type="primary"
                                    block
                                    icon={<PlusOutlined />}
                                    onClick={() => openEventModal(selectedDate)}
                                >
                                    Add Event
                                </Button>
                                <Button
                                    block
                                    icon={<CalendarOutlined />}
                                    onClick={() => openEventModal(dayjs())}
                                >
                                    Add Today's Event
                                </Button>
                            </Space>
                        </Card>

                        <Card title="Upcoming Events">
                            <List
                                size="small"
                                dataSource={events
                                    .filter(event => dayjs(event.date).isAfter(dayjs(), 'day') || dayjs(event.date).isSame(dayjs(), 'day'))
                                    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
                                    .slice(0, 5)
                                }
                                renderItem={(event) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<EditOutlined />}
                                                onClick={() => openEditModal(event)}
                                            />,
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => deleteEvent(event.id)}
                                            />
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={event.title}
                                            description={
                                                <div>
                                                    <div>{dayjs(event.date).format('MMM DD, YYYY')}</div>
                                                    {event.time && <div>{event.time}</div>}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    const renderDrive = () => (
        <div className="portal-drive">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Media Drive</Title>
                <Button type="primary" icon={<UploadOutlined />} style={{ background: primaryColor, borderColor: primaryColor }}>
                    Upload Files
                </Button>
            </div>

            {/* Drive Navigation Tabs */}
            <div style={{ marginBottom: 24 }}>
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    background: '#f8fafc',
                    padding: '4px',
                    borderRadius: '12px',
                    width: 'fit-content'
                }}>
                    {[
                        { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
                        { key: 'drive', label: 'Drive', icon: <CloudOutlined /> },
                        { key: 'calendar', label: 'Calendar', icon: <CalendarOutlined /> }
                    ].map(tab => (
                        <Button
                            key={tab.key}
                            type={driveTab === tab.key ? 'primary' : 'text'}
                            icon={tab.icon}
                            onClick={() => setDriveTab(tab.key)}
                            style={{
                                background: driveTab === tab.key ? primaryColor : 'transparent',
                                borderColor: driveTab === tab.key ? primaryColor : 'transparent',
                                color: driveTab === tab.key ? 'white' : '#64748b',
                                borderRadius: '8px'
                            }}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Drive Tab Content */}
            {driveTab === 'dashboard' && (
                <Row gutter={[24, 24]}>
                    {/* Storage Overview */}
                    <Col xs={24} lg={8}>
                        <Card
                            title="Storage Overview"
                            style={{
                                borderRadius: '16px',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                <div style={{
                                    width: 120,
                                    height: 120,
                                    margin: '0 auto',
                                    position: 'relative'
                                }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Used', value: 45.8 },
                                                    { name: 'Free', value: 54.2 }
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={35}
                                                outerRadius={55}
                                                dataKey="value"
                                            >
                                                <Cell fill={primaryColor} />
                                                <Cell fill="#f1f5f9" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>45.8GB</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>of 100GB</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ space: 16 }}>
                                {driveStats.slice(1).map((stat, index) => (
                                    <div key={index} style={{ marginBottom: 16 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <Text style={{ color: '#64748b' }}>{stat.label}</Text>
                                            <Text strong>{stat.value}</Text>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: 6,
                                            background: '#f1f5f9',
                                            borderRadius: 3,
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${stat.percentage}%`,
                                                height: '100%',
                                                background: stat.color,
                                                borderRadius: 3
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>

                    {/* Recent Files */}
                    <Col xs={24} lg={16}>
                        <Card
                            title="Recent Files"
                            extra={<Button type="link" style={{ color: primaryColor }}>View All</Button>}
                            style={{
                                borderRadius: '16px',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <List
                                dataSource={driveData.slice(0, 5)}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <Button type="text" icon={<EyeOutlined />} size="small" />,
                                            <Button type="text" icon={<DownloadOutlined />} size="small" />
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={item.icon}
                                            title={<Text strong>{item.name}</Text>}
                                            description={
                                                <div style={{ color: '#64748b' }}>
                                                    {item.size} • Modified {item.modified}
                                                    {item.items && ` • ${item.items} items`}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            )}

            {driveTab === 'drive' && (
                <Card
                    title="All Files"
                    extra={
                        <Space>
                            <Button type="text" icon={<FolderOutlined />}>New Folder</Button>
                            <Button type="primary" icon={<UploadOutlined />} style={{ background: primaryColor, borderColor: primaryColor }}>
                                Upload
                            </Button>
                        </Space>
                    }
                    style={{
                        borderRadius: '16px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Table
                        dataSource={driveData}
                        pagination={false}
                        columns={[
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                                render: (text, record) => (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        {record.icon}
                                        <Text strong>{text}</Text>
                                    </div>
                                )
                            },
                            {
                                title: 'Size',
                                dataIndex: 'size',
                                key: 'size',
                                render: (text) => <Text>{text}</Text>
                            },
                            {
                                title: 'Modified',
                                dataIndex: 'modified',
                                key: 'modified',
                                render: (text) => <Text style={{ color: '#64748b' }}>{text}</Text>
                            },
                            {
                                title: 'Actions',
                                key: 'actions',
                                render: () => (
                                    <Space>
                                        <Button type="text" icon={<EyeOutlined />} size="small" />
                                        <Button type="text" icon={<DownloadOutlined />} size="small" />
                                        <Button type="text" icon={<EditOutlined />} size="small" />
                                    </Space>
                                )
                            }
                        ]}
                    />
                </Card>
            )}

            {driveTab === 'calendar' && (
                <Card
                    title="Calendar View"
                    style={{
                        borderRadius: '16px',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <CalendarOutlined style={{ fontSize: 48, color: primaryColor, marginBottom: 16 }} />
                        <Title level={4} style={{ color: '#64748b' }}>Calendar Integration</Title>
                        <Text style={{ color: '#64748b' }}>
                            Schedule and manage your file sharing sessions, deadlines, and collaboration events.
                        </Text>
                        <br />
                        <Button
                            type="primary"
                            style={{ background: primaryColor, borderColor: primaryColor, marginTop: 16 }}
                        >
                            Go to Main Calendar
                        </Button>
                    </div>
                </Card>
            )}
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
            case 'drive':
                return renderDrive();
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
                style={{
                    background: primaryColor,
                    borderRight: `1px solid ${secondaryColor}`
                }}
            >
                <div className="portal-logo">
                    {!collapsed ? (
                        <>
                            <div className="logo-icon" style={{
                                background: secondaryColor,
                                color: secondaryTextColor
                            }}>
                                {userData.logoPreview || userData.uploadedLogoUrl ? (
                                    <img
                                        src={userData.logoPreview || userData.uploadedLogoUrl}
                                        alt="Brand Logo"
                                        className="brand-logo-img"
                                    />
                                ) : (
                                    userData.brandName ? userData.brandName.substring(0, 2).toUpperCase() : 'CX'
                                )}
                            </div>
                            <span className="brand-name" style={{
                                color: primaryTextColor
                            }}>
                                {userData.brandName || 'Craxinno'}
                            </span>
                        </>
                    ) : (
                        <div className="logo-icon" style={{
                            background: secondaryColor,
                            color: secondaryTextColor
                        }}>
                            {userData.logoPreview || userData.uploadedLogoUrl ? (
                                <img
                                    src={userData.logoPreview || userData.uploadedLogoUrl}
                                    alt="Brand Logo"
                                    className="brand-logo-img"
                                />
                            ) : (
                                userData.brandName ? userData.brandName.substring(0, 2).toUpperCase() : 'CX'
                            )}
                        </div>
                    )}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={({ key }) => setSelectedKey(key)}
                    className="portal-menu"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: primaryTextColor
                    }}
                />
            </Sider>

            <Layout>
                <Header className="portal-header" style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    borderBottom: `1px solid ${secondaryColor}`
                }}>
                    <div className="header-left">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined style={{ color: "white" }} /> : <MenuFoldOutlined style={{ color: "white" }} />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="trigger-btn"
                            style={{
                                color: primaryTextColor
                            }}
                        />
                    </div>

                    <div className="header-right">
                        <Space size="middle">
                            <Badge count={5}>
                                <Button
                                    type="text"
                                    icon={<BellOutlined />}
                                    className="notification-btn"
                                    style={{
                                        color: primaryTextColor
                                    }}
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
                                    <Avatar size="small" icon={<UserOutlined />} style={{
                                        background: secondaryColor,
                                        color: secondaryTextColor
                                    }} />
                                    <Text strong style={{
                                        color: primaryTextColor
                                    }}>John Doe</Text>
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

            {/* Event Creation/Edit Modal */}
            <Modal
                title={editingEvent ? 'Edit Event' : 'Create New Event'}
                open={eventModalVisible}
                onCancel={() => {
                    setEventModalVisible(false);
                    setEditingEvent(null);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEventSubmit}
                    initialValues={{
                        priority: 'Medium',
                        category: 'General'
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Event Title"
                                rules={[{ required: true, message: 'Please enter event title' }]}
                            >
                                <Input placeholder="Enter event title" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: 'Please select date' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="time"
                                label="Time (Optional)"
                            >
                                <TimePicker style={{ width: '100%' }} format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="priority"
                                label="Priority"
                                rules={[{ required: true, message: 'Please select priority' }]}
                            >
                                <Select>
                                    <Select.Option value="Low">Low</Select.Option>
                                    <Select.Option value="Medium">Medium</Select.Option>
                                    <Select.Option value="High">High</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[{ required: true, message: 'Please select category' }]}
                            >
                                <Select>
                                    <Select.Option value="General">General</Select.Option>
                                    <Select.Option value="Meeting">Meeting</Select.Option>
                                    <Select.Option value="Task">Task</Select.Option>
                                    <Select.Option value="Reminder">Reminder</Select.Option>
                                    <Select.Option value="Appointment">Appointment</Select.Option>
                                    <Select.Option value="Deadline">Deadline</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="description"
                        label="Description (Optional)"
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Enter event description..."
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button
                                onClick={() => {
                                    setEventModalVisible(false);
                                    setEditingEvent(null);
                                    form.resetFields();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingEvent ? 'Update Event' : 'Create Event'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Cookie-style Notice Bar */}
            {cookieNoticeVisible && (
                <div className={`cookie-notice-container ${cookieNoticeVisible ? 'fade-in' : 'fade-out'}`}>
                    <div className="cookie-notice-content">
                        <div className="cookie-notice-text">
                            <strong>🍪 Demo Portal Experience</strong>
                            <span className="cookie-description">
                                This is a preview of our dynamic portal system. Get full access with all features and customizations.
                            </span>
                        </div>
                        <div className="cookie-notice-actions">
                            <Button
                                type="default"
                                icon={<PhoneOutlined />}
                                onClick={() => {
                                    const phoneNumber = '919913382221'; // +91 99133 82221
                                    const message = 'Hi! I am interested in getting full access to the dynamic portal system. Could you please provide me with the credentials and pricing details?';
                                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                    window.open(whatsappUrl, '_blank');
                                }}
                                className="contact-btn"
                            >
                                Contact Us
                            </Button>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => setCookieNoticeVisible(false)}
                                className="close-btn"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Portal;   