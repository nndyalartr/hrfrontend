import { Button, Menu, MenuProps, message } from "antd";
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { HomeOutlined, SmileOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import useCreateAttendance from "../QueryApiCalls/usePunchIn";
import { UserInfoStore } from "../utils/useUserInfoStore";

export default function TopMenu() {

    const navigate = useNavigate()
    const [current, setCurrent] = useState<string>("")
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, type: string }>({ getApiEnabled: false, userEmail: "", type: "" })
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };
    const onSiningClick: MenuProps['onClick'] = (e) => {
        if (e.key == "PunchIn") {
            setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "POST" })
        } else if (e.key == "PunchOut") {
            setOptions({ getApiEnabled: true, userEmail: loggedInUserDetails.user_email, type: "PATCH" })
        }
    };
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value

    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        message.success(res.data.message)
    }
    const onError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
    }
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
        label: "Resignation",
        key: "/resignation"
    }
    ])
    useEffect(() => {
        if (loggedInUserDetails.user_role === "Manager") {
            setMySelfRoles([...mySelfRoles, { label: "Pending Leave Approvals", key: "/leave-approvals" }, { label: "Pending Attendance Approvals", "key": "/attendance-approvals" }, { label: "Pending Resignation Approvals", "key": "/resignation-approvals" }])
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
    if (loggedInUserDetails.user_role === "Manager") {
        items.push({
            label: 'Admin',
            key: 'admin',
            icon: <HomeOutlined />,
            children: [
                {
                    label: "User Details",
                    key: "/admin"
                },
                {
                    label: "Events",
                    key: "/events"
                },
                {
                    label: "Add User",
                    key: "/add-user"
                }, { label: "Attendance Summary Report", key: "/attendance-all" }
            ]
        },)
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
                }
            ]
        }]
    return (
        <div className={loggedInUserDetails.user_role == "Executive" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" ? "menu_manager" : "menu"}>
            <Container fluid>
                <Row align="middle" justify="space-between" className="justify-content-between">
                    <Col xs={12} sm={8} md={6} lg={4} xl={3} className="float-start">
                        <h4 className="ms-2" style={{ textAlign: "left", color: "white" }}>RC Services</h4>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={2} xl={3} className="float-end">
                        <Menu className={loggedInUserDetails.user_role == "Executive" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" ? "menu_manager" : "menu"} theme="light" onClick={onClick} mode="horizontal" items={items || []} />
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={2} xl={3} className="text-end ms-auto me-0" >
                        <Menu style={{ textAlign: 'right' }} className={loggedInUserDetails.user_role == "Executive" ? "menu_executive" : loggedInUserDetails.user_role == "Manager" ? "menu_manager" : "menu"} theme="light" onClick={onSiningClick} mode="horizontal" items={signInOptions || []} />

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
