import { Col, Menu, MenuProps, Row, Table } from "antd";
import axios from "axios";
import { useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined,HomeOutlined } from '@ant-design/icons';
import TopMenu from "./TopMenu";
import useGetAllUserDetails from "../QueryApiCalls/useGetAllUsers";
import { UserInfoStore } from "../utils/useUserInfoStore";
export default function HomePage() {
    const [userData, setUserData] = useState([])  
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value 
    const [options, setOptions]=useState<{getApiEnabled:boolean,userEmail:string}>({getApiEnabled:false,userEmail:""})
    useEffect(()=>{
        setOptions({userEmail:loggedInEmail,getApiEnabled:true})
    
},[])
    const onSuccess=(res:any)=>{
        setOptions({...options,getApiEnabled:false})
        setUserData(res.data)
    }
    const onError = (err:any)=>{
        console.log("err")
    }
    const {refetch} = useGetAllUserDetails(options,onSuccess,onError) 
    
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
