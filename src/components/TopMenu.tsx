import { Col, Menu, MenuProps, Row, Table } from "antd";
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
            key: '/',
        },
        {
            label: 'User',
            key: '/user',
        },
        {
            label: 'Admin',
            key: '/admin',
            icon: <HomeOutlined />,
        }
        ,]

    return (
        <div >
            <Row align="middle">
                <Col span={12} >
                    <h4 className="ms-2 text-secondary" style={{ textAlign: "left" }}>RC Services</h4>
                </Col>
                <Col span={12}>
                    <Menu theme="light" onClick={onClick} mode="horizontal" items={items || []} />
                </Col>
            </Row>

        </div>
    )
}
