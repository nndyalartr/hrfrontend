import { Button, Menu, MenuProps, message } from "antd";
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { HomeOutlined, SmileOutlined, UserAddOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import useCreateAttendance from "../QueryApiCalls/usePunchIn";
import { UserInfoStore } from "../utils/useUserInfoStore";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useSignOut } from "react-auth-kit";
import axios from "axios";
import useCreateDailyLogs from "../QueryApiCalls/useCreateDailyLogs";
export default function TopMenu() {

    const navigate = useNavigate()
    const [current, setCurrent] = useState<string>("")
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string }>({ getApiEnabled: false, userEmail: "", type: "" })
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };
    const cookieAllData = Cookies.get()
    const signOut = useSignOut()
    const [apioptions, setapioptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string, data: any }>({ getApiEnabled: false, userEmail: "", type: "", data: {} })
    const extractUserData = () => {
        const bucketIdRemote = `aw-watcher-window_DESKTOP-M3VRFSN`;
        const todayDate = new Date();
        const yesterday = new Date(todayDate);
        yesterday.setDate(todayDate.getDate() - 1);
        const dayStart = new Date(todayDate);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(todayDate);
        dayEnd.setHours(23, 59, 59, 999);

        const formattedDayStart = dayStart.toISOString();
        const formattedDayEnd = dayEnd.toISOString();

        const url = 'http://172.20.10.2:5600/api/0/buckets/aw-watcher-window_DESKTOP-M3VRFSN/events';
        const params = new URLSearchParams({ start: formattedDayStart, end: formattedDayEnd });
        const timeout = 10000;

        axios.get(`${url}?${params}`).then((res) => {
            const events = res.data;

            // Initialize objects to store durations
            const durationsByApplication = new Map();
            const lockTime = new Map();
            let totalActiveTime = 0; // Duration in seconds
            let totalLockTime = 0; // Duration in seconds
            const totalDurations: any = {};
            events.forEach((entry: any) => {
                if (!totalDurations.hasOwnProperty(entry.data.app)) {
                    totalDurations[entry.data.app] = 0;
                }
                totalDurations[entry.data.app] += (entry.duration);
            });
            const result = Object.keys(totalDurations).map((app) => ({
                application: app,
                duration: totalDurations[app],
            }));
            setapioptions({ ...apioptions, getApiEnabled: true, type: "POST", data: { "logs_data": result, "user_email": loggedInUserDetails.user_email } })
        }).catch((err) => {
            console.log(err)
        })
    }
    const onSiningClick: MenuProps['onClick'] = (e) => {
        // extractUserData()
        if (e.key == "PunchIn") {
            setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "POST" })
        } else if (e.key == "Logout") {
            for (let key in cookieAllData) {
                Cookies.remove(key)
            }
            localStorage.clear();
            signOut()
            navigate('/')

        }
        else if (e.key == "PunchOut") {
            setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "PATCH" })
        }
    };
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value

    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        if (!res.message) {
            message.success(res.data.message)
        } else {
            message.error("First Punch In")
        }

    }
    const onError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        message.success(err.data.message)
    }
    const onLogsSuccess = (res: any) => {
        setapioptions({ ...apioptions, getApiEnabled: false })
    }
    const onLogsError = (err: any) => {
        console.log(err)
        setapioptions({ ...apioptions, getApiEnabled: false })
    }
    const { data } = useCreateDailyLogs(apioptions, onLogsSuccess, onLogsError)
    const { refetch } = useCreateAttendance(options, onSuccess, onError)
    const nameOfUser = loggedInUserDetails.user_name
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
    useEffect(() => {
        if (loggedInUserDetails.user_role === "Manager") {
            setMySelfRoles([...mySelfRoles,])
        }
    }, [])
    const items: MenuProps['items'] = [
        {
            label: 'Home',
            key: '/dashboard',
        },
        {
            label: 'My Self',
            key: 'self',
            children: mySelfRoles
        },


    ]
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
                { label: "User Logs", key: "/user-logs" }
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
                icon: <SolutionOutlined />,
                children: [
                    { label: "Production Reports", key: "/reports" }
                ]
            }
        )
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
    }
    const oo = <>Hi. {nameOfUser} <SettingOutlined className="ms-2" /></>
    const signInOptions: MenuProps['items'] = [
        // {
        //     key: '',
        //     label: nameOfUser[0],
        // },
        {

            key: 'sigin',
            // icon: <SettingOutlined />,
            label: oo,
            children: [
                {
                    label: "Punch In",
                    key: "PunchIn",
                    icon: <UserAddOutlined />

                },
                {
                    label: "Punch Out",
                    key: "PunchOut",
                    icon: <SmileOutlined />
                },
                {
                    label: "Log Out",
                    key: "Logout"
                }
            ]
        }]
    return (
        <div className={loggedInUserDetails.user_role == "Employee" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" || "HR" ? "menu_manager" : "menu"}>
            <Container fluid>
                <Row align="middle" justify="space-between" className="justify-content-between">
                    <Col xs={12} sm={8} md={6} lg={4} xl={3} className="float-start">
                        <h4 className="ms-2" style={{ textAlign: "left", color: "white" }}>RC Services</h4>
                    </Col>
                    <Col xs={12} sm={10} md={12} lg={4} xl={6} className="float-end">
                        <Menu className={loggedInUserDetails.user_role == "Employee" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" || "HR" ? "menu_manager" : "menu"} theme="light" onClick={onClick} mode="horizontal" items={items || []} />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={2} xl={3} className="text-end ms-auto me-0" >
                        <Menu style={{ textAlign: 'right' }} className={loggedInUserDetails.user_role == "Employee" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" || "HR" ? "menu_manager" : "menu"} theme="light" onClick={onSiningClick} mode="horizontal" items={signInOptions || []} />

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
