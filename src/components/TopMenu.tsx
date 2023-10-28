import { Button, Col, Menu, MenuProps, Row, message } from "antd";
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
        label:"Attendance Regularize",
        key:"/attendance-reg"
    }])
    useEffect(()=>{
        if(loggedInUserDetails.user_role==="Manager"){            
            setMySelfRoles([...mySelfRoles,{label:"Pending Leave Approvals",key:"/leave-approvals"},{label:"Pending Attendance Approvals","key":"/attendance-approvals"}])
        }
    },[])
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
    if (loggedInUserDetails.user_role==="Manager"){
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
                    label:"Add User",
                    key:"/add-user"
                }
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
        },
    ]
    return (
        <div className={loggedInUserDetails.user_role == "Executive"?"menu_executive":loggedInUserDetails.user_role == "Manager"?"menu_manager":"menu"}>
            <Row align="middle" >
                <Col span={12} >
                    <h4 className="ms-2" style={{ textAlign: "left", color:"white" }}>RC Services</h4>
                </Col>
                <Col span={8}>
                    <Menu className={loggedInUserDetails.user_role == "Executive"?"menu_executive":loggedInUserDetails.user_role == "Manager"?"menu_manager":"menu"}  theme="light" onClick={onClick} mode="horizontal" items={items || []} />

                </Col>
                <Col span={4} >

                    <Menu className={loggedInUserDetails.user_role == "Executive"?"menu_executive":loggedInUserDetails.user_role == "Manager"?"menu_manager":"menu"} theme="light" onClick={onSiningClick} mode="horizontal" items={signInOptions || []} />
                </Col>

            </Row>

        </div>
    )
}
