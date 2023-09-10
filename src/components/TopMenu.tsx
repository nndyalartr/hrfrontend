import { Button, Col, Menu, MenuProps, Row, Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
export default function TopMenu() {

    const navigate = useNavigate()
    const [current, setCurrent] = useState<string>("")
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
        setCurrent(e.key)
    };

    const items: MenuProps['items'] = [
        {
            label: 'Home',
            key: '/dashboard',
        },
        {
            label: 'User',
            key: '/user',
        },
        {
            label: 'Admin',
            key: '/admin',
            icon: <HomeOutlined />,
        }]
    const punchin = () => {
        axios({
            url: "http://127.0.0.1:8000/login/",
            method: "POST",
            data: {
                "email_id": "raviteja@gmail.com"
            }

        }).then((res) => {
            console.log(res)

        }).catch((err) => {
            message.error(err.response.data.message)
            // console.log(err.response.data.message)

        })
    }
    const punchOut = () => {
        axios({
            url: "http://127.0.0.1:8000/login/",
            method: "PATCH",
            data: {
                "email_id": "raviteja@gmail.com"
            }

        }).then((res) => {
            console.log(res)
            message.success(`successfully loggedout at ${res.data.loggoff_time}`)

        }).catch((err) => {
            message.error(err.response.data.message)
            // console.log(err.response.data.message)

        })
    }
    return (
        <div >
            <Row align="middle">
                <Col span={12} >
                    <h4 className="ms-2 text-secondary" style={{ textAlign: "left" }}>RC Services</h4>
                </Col>
                <Col span={8}>
                    <Menu theme="light" onClick={onClick} mode="horizontal" items={items || []} />

                </Col>
                <Col span={4} ><Button className="me-2" onClick={punchin}>Punch In</Button>
                    <Button onClick={punchOut}>Punch Out</Button></Col>
            </Row>

        </div>
    )
}
