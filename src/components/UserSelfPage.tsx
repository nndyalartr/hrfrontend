import { Col, Row, Table } from "antd";
import axios from "axios";
import TopMenu from "./TopMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import useGetAttendanceDetails from "../QueryApiCalls/useGetAttendanceDetails";
import { UserInfoStore } from "../utils/useUserInfoStore";
import useGetMyDetails from "../QueryApiCalls/useGetMyDetails";
import { JsonToTable } from "react-json-to-table";

const UserSelfPage =()=>{
    const [userData, setUserData] = useState({})  
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions]=useState<{getApiEnabled:boolean,userEmail:string}>({getApiEnabled:false,userEmail:""})
    useEffect(()=>{
            setOptions({userEmail:loggedInEmail,getApiEnabled:true})
        
    },[])
    const onSuccess=(res:any)=>{
        setOptions({...options,getApiEnabled:false})
        // setUserData(res.data)
        setUserData(res.data)
        console.log(res.data)
    }
    const onError = (err:any)=>{
        console.log("err")
    }
    const {refetch} = useGetMyDetails(options,onSuccess,onError)

  
    return(
        <>
        <TopMenu/> 
            <Row>
                <Col>
                    <h4>User Details</h4>
                    <JsonToTable json={userData} />
                    {/* <Table rowKey={(record: any) => record.id} dataSource={userData||[]} columns={columns} /> */}

                </Col>
                
                <Col>
                </Col>
            </Row>
        </>
    )
}
export default UserSelfPage;