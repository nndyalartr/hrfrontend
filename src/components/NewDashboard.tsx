import { Col, Menu, MenuProps, Row, Avatar, message, Card, Calendar } from "antd";
import { UserInfoStore } from "../utils/useUserInfoStore";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import moment from 'moment';
import Cookies from "js-cookie";
import { useSignOut } from "react-auth-kit";
import "./dashboard.css"
import Calender from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { HomeOutlined, UserOutlined, NotificationOutlined, LogoutOutlined, SettingOutlined, SolutionOutlined, UserSwitchOutlined, BarChartOutlined } from '@ant-design/icons';
import useGetMeDetails from "../QueryApiCalls/useGetMeDetails";
import { AxiosError, AxiosResponse } from "axios";
import useCreateAttendance from "../QueryApiCalls/usePunchIn";
import { Events } from "../interfaces/types";
import useCreateorGetEvents from "../QueryApiCalls/useEventDetails";
const NewDashBoard = () => {
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value
    const [mySelfOptions, setMySelfOptions] = useState<{ email: string, getApiEnabled: boolean }>({ email: loggedInUserDetails.user_email, getApiEnabled: false })
    const [userBasicDetails, setUserBasicDetails] = useState<any>({})
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string }>({ getApiEnabled: false, userEmail: "", type: "" })
    const [eventOptions, setEventOptions] = useState<Events>({ date: "", type: "", getApiEnabled: false, name: "", shift: "", eventType: "" })
    const [events, setEvents] = useState<any>([])
    const onEventSuccess = (res: any) => {

        if (eventOptions.type == "GET") {
            setEvents(res.data)
        }
    }
    useEffect(() => {
        setMySelfOptions({ ...mySelfOptions, getApiEnabled: true })
    }, [])
    const navigate = useNavigate()
    const signOut = useSignOut()
    const [current, setCurrent] = useState<string>("")
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };
    const currentDate = moment().format('dddd Do MMMM, YYYY');
    const [mySelfRoles, setMySelfRoles] = useState([{
        label: "My Attendance",
        key: "/user-attendance"
    },
    {
        label: "My Details",
        key: "/user-self"
    },
    {
        label: "My Leave Management",
        key: "/user-leaves"
    },
    {
        label: "Attendance Regularize",
        key: "/attendance-reg"
    },
    {
        label: "Advance",
        key: "/advance"
    },
    {
        label: "Resignation",
        key: "/resignation"
    }
    ])
    const myApplyFor: MenuProps['items'] = [
        {
            label: 'Apply For',
            key: 'self',
            children: [
                {
                    label: "My Leave Management",
                    key: "/user-leaves"
                },
                {
                    label: "Attendance Regularize",
                    key: "/attendance-reg"
                },
                {
                    label: "Advance",
                    key: "/advance"
                },
                {
                    label: "Resignation",
                    key: "/resignation"
                }
            ],
            icon: <UserOutlined />
        }
    ]
    const items: MenuProps['items'] = [
        {
            label: 'My Self',
            key: 'self',
            children: mySelfRoles,
            icon: <UserOutlined />
        },


    ]
    useEffect(() => {
        if (loggedInUserDetails.user_role === "Manager") {
            setMySelfRoles([...mySelfRoles,])
        }
        setEventOptions({ ...eventOptions, type: "GET", getApiEnabled: true })
    }, [])
    if (loggedInUserDetails.user_role === "HR") {
        items.push({
            label: 'Admin',
            key: 'admin',
            icon: <HomeOutlined />,
            children: [
                {
                    label: "User Details",
                    key: "/user-edit"
                },
                {
                    label: "Events",
                    key: "/events"
                },
                {
                    label: "Add User",
                    key: "/add-user"
                }, { label: "Attendance Summary Report", key: "/attendance-all" },
                { label: "User Logs", key: "/user-logs" },
                { label: "Offer Initiation", key: "/offer-initiation" }
            ]
        },)
        items.push(
            {
                label: 'Approvals',
                key: 'approvals',
                icon: <SolutionOutlined />,
                children: [
                    { label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }
                ]
            }
        )
        items.push(
            {
                label: 'Reports',
                key: 'reports',
                icon: <BarChartOutlined />,
                children: [
                    { label: "Production Reports", key: "/reports" }
                ]
            }
        )
        items.push({
            label: 'IT Support',
            key: '/it-ticket',
            icon: <UserSwitchOutlined />
        })
    }
    if (loggedInUserDetails.user_role === "Manager") {
        items.push(
            {
                label: 'Approvals',
                key: 'approvals',
                icon: <SolutionOutlined />,
                children: [
                    { label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }
                ]
            }
        )
        items.push({
            label: 'IT Support',
            key: '/it-ticket',
            icon: <UserSwitchOutlined />
        })
    }
    if (loggedInUserDetails.user_role === "IT") {
        items.push({
            label: 'IT Support',
            key: '/it-ticket',
            icon: <UserSwitchOutlined />
        })
    }
    const cookieAllData = Cookies.get()
    const logoutFunction = () => {
        for (let key in cookieAllData) {
            Cookies.remove(key)
        }
        localStorage.clear();
        signOut()
        navigate('/')
    }
    const onSuccess = (res: AxiosResponse) => {
        setMySelfOptions({ ...mySelfOptions, getApiEnabled: false })
        if (res.status === 200) {
            setUserBasicDetails(res.data)
        } else {
            message.success("Invalid User Login")
        }
    }
    const onError = (err: AxiosError) => {
        setMySelfOptions({ ...mySelfOptions, getApiEnabled: false })
    }
    const loginFunction = () => {
        setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "POST" })
    }
    useGetMeDetails(mySelfOptions, onSuccess, onError)
    const onLoginSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        if (!res.message) {
            message.success(res.data.message)
        } else {
            message.error("First Punch In")
        }

    }
    const onLoginError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        message.success(err.data.message)
    }
    const getListData = (value: any) => {
        const dateStr = value.format('YYYY-MM-DD');
        return events.filter((event: any) => event.date === dateStr);
    };
    const { refetch } = useCreateAttendance(options, onLoginSuccess, onLoginError)
    const cellRender = (current: any, info: any) => {
        if (info.type === 'date') {
            const listData = getListData(current);
            return (
                <ul className="events">
                    {listData.map((item: any) => (
                        <li key={item.id}>
                            <span className={`event-dot ${item.event_type.toLowerCase()}`} />
                            <span className="event-text">{item.name}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return info.originNode;
    };
    const onEventError = (err: any) => {
        setEventOptions({ ...eventOptions, getApiEnabled: false })
        console.log("err")
    }
    const { } = useCreateorGetEvents(eventOptions, onEventSuccess, onEventError)
    return (
        <>
            <Row gutter={16} className="mt-2 mb-3">
                <Col span={2}>
                    Logo
                </Col>
                <Col span={14}>
                    Optimize RCM
                </Col>
                <Col span={4}>
                    <span className="me-2">{userBasicDetails.location}</span>
                    <span>{currentDate}</span>
                </Col>
                <Col span={2}>
                    <span><NotificationOutlined /> Notifications</span>
                </Col>
                <Col span={2}>
                    <span className="logout" onClick={logoutFunction}><LogoutOutlined className="me-1" />Logout</span>
                </Col>
            </Row>
            <Row gutter={16} className="mt-4">
                <Col span={4}>
                    <Menu className={loggedInUserDetails.user_role == "Employee" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" || "HR" ? "new_menu" : "menu"} theme="light" onClick={onClick} mode="inline" items={items || []} />
                    {/* <Calendar fullscreen={false} className="custom-calendar" cellRender={cellRender} /> */}
                </Col>
                <Col span={10} className="grey_bg">
                    User Analytics Related Tabs
                </Col>
                <Col span={5} className="grey_bg">
                    <Card title="User Calender">
                        <Calender></Calender>
                        <hr />
                        <span className="green"></span><span className="me-4">Present</span><span className="orange"></span><span className="me-4">Abscent</span><span className="brown"></span><span>Leave</span><br></br>
                        <span className="red"></span><span className="me-4">Holiday</span><span className="blue"></span><span className="me-4"> Event</span>
                    </Card>
                    <Card className="upcomming_events" title="Upcomming Events">
                        <h4>Annual Day</h4>
                        <h6>July 06<sup>th</sup> 2024, Saturday</h6>
                    </Card>
                </Col>
                <Col span={5}>
                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="mb-4" /><br></br>
                    <span className="user_det"><span>{userBasicDetails.user_name}</span></span>
                    <span className="user_det"><span>{userBasicDetails.designation}</span></span>
                    <span className="user_det"><span><strong>My Profile / </strong><strong className="login_button" onClick={loginFunction}>Check-In</strong></span></span>
                    <hr />
                    <Row style={{ textAlign: 'left' }}>
                        <Col span={8}>
                            <span className="user_det">Employe ID :</span>
                            <span className="user_det">Department :</span>
                            <span className="user_det">Designation :</span>
                            <span className="user_det">Location :</span>
                            <span className="user_det">Reporting To :</span>
                            <span className="user_det">Shift :</span>
                            <span className="user_det">Leave Balence :</span>
                        </Col>
                        <Col span={16}>
                            <strong className="user_det">{userBasicDetails.empl_id}</strong>
                            <strong className="user_det">{userBasicDetails.department}</strong>
                            <strong className="user_det">{userBasicDetails.designation}</strong>
                            <strong className="user_det">{userBasicDetails.location}</strong>
                            <strong className="user_det">{userBasicDetails.reporting_to}</strong>
                            <strong className="user_det">{userBasicDetails.shift}</strong>
                            <strong className="user_det">{userBasicDetails.leaves_remaining}</strong>
                        </Col>
                    </Row>
                    <Col>
                        <Menu className={loggedInUserDetails.user_role == "Employee" ? "apply_for_menu" : loggedInUserDetails.user_role == "Manager" || "HR" ? "apply_for_menu" : "apply_for_menu"} theme="light" onClick={onClick} mode="inline" items={myApplyFor || []} />
                    </Col>

                </Col>
            </Row>
        </>
    )
}
export default NewDashBoard;