import { Button, Menu, MenuProps, message } from "antd";
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { HomeOutlined, SmileOutlined, UserAddOutlined, SettingOutlined, SolutionOutlined, UserSwitchOutlined, BarChartOutlined } from '@ant-design/icons';
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

    useEffect(() => {
        if (loggedInUserDetails.user_role === "Manager") {
            setMySelfRoles([...mySelfRoles,])
        }
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
                { label: "On Board", key: "/on-board" },
                { label: "Offer Initiation", key: "/offer-initiation" }
            ]
        },)
        items.push(
            {
                label: 'My Team',
                key: 'approvals',
                icon: <SolutionOutlined />,
                children: [
                    { label: "Team Attendance", key: "/team-attendance" },{ label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }
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
                label: 'My Team',
                key: 'approvals',
                icon: <SolutionOutlined />,
                children: [
                    { label: "Team Attendance", key: "/team-attendance" }, { label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }
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
