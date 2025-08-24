import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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
    PhoneOutlined
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
    const [cookieNoticeVisible, setCookieNoticeVisible] = useState(true);

    // Load user data from localStorage
    const [userData, setUserData] = useState({
        logoPreview: null,
        uploadedLogoUrl: null,
        brandName: '',
        selectedIndustry: null,
        selectedModules: []
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
                    selectedModules: parsedData.modules || []
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
                    selectedModules: parsedData.selectedModules || []
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
                            <div className="logo-icon">
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
                            <span className="brand-name">
                                {userData.brandName || 'Craxinno'}
                            </span>
                        </>
                    ) : (
                        <div className="logo-icon">
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