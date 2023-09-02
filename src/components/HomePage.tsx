import { Col, Menu, MenuProps, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
export default function HomePage() {
    const [userData, setUserData] = useState([])
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const login =()=>{

    }
    const items: MenuProps['items'] = [
        {
          label: 'Navigation One',
          key: 'mail',
          icon: <MailOutlined onClick={()=>login()} />,
        },]
    useEffect(() => {
        axios({
            url: "http://127.0.0.1:8000/test",
            method: "GET"
        }).then((res) => {
            console.log(res)
            setUserData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const columns = [
        {
            title: 'Employ Name',
            dataIndex: 'emp_name',
            key: 'emp_name',
        },
        {
            title: 'Emp No',
            dataIndex: 'emp_no',
            key: 'emp_no',
        },
        {
            title: 'Email Address',
            dataIndex: 'email_id',
            key: 'email_id',
        },
    ];
    return (
        <div >
            <Row justify="space-around">
                <Col span={6}>
                    <h5>HR Portal</h5>
                </Col>
                <Col span={6}></Col>
                <Col span={6}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                </Col>
            </Row>
           
            <Table rowKey={(record: any) => record.id} dataSource={userData} columns={columns} />

        </div>
    )
}
