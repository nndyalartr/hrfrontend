import { Col, Menu, MenuProps, Row, Table } from "antd";
import axios from "axios";
import { useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined,HomeOutlined } from '@ant-design/icons';
import TopMenu from "./TopMenu";
export default function HomePage() {
    const [userData, setUserData] = useState([])    
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
            <TopMenu/>           
            <Table rowKey={(record: any) => record.id} dataSource={userData} columns={columns} />

        </div>
    )
}
