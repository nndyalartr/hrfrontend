import { Col, Row, Table } from "antd";
import axios from "axios";
import TopMenu from "../TopMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import useGetAttendanceDetails from "../../QueryApiCalls/useGetAttendanceDetails";
import { UserInfoStore } from "../../utils/useUserInfoStore";

const UserPage =()=>{
    const [userData, setUserData] = useState([])  
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions]=useState<{getApiEnabled:boolean,userEmail:string}>({getApiEnabled:false,userEmail:""})
    useEffect(()=>{
            setOptions({userEmail:loggedInEmail.user_email,getApiEnabled:true})
        
    },[])
    const onSuccess=(res:any)=>{
        setOptions({...options,getApiEnabled:false})
        setUserData(res.data)
    }
    const onError = (err:any)=>{
        console.log("err")
    }
    const {refetch} = useGetAttendanceDetails(options,onSuccess,onError)

    const columns = [
        {
            title:"Date",
            dataIndex:"created_at",
            key:"Date",
        },
        {
            title:"Week",
            dataIndex:"week_day",
            key:"week_day"
        },
        {
            title: 'Login Time',
            dataIndex: 'login_time',
            key: 'login_time',
            render:(loginTime:string)=>{
                if(loginTime){
                    let local = moment.utc(loginTime).local().format()
                    let str = local.split("T")
                    str = str[1].split(".")
                    str = str[0].split("+")
                    return(str[0])
                }else{
                    return("Not Available")
                }
            }
        },
        {
            title: 'Logout Time',
            dataIndex: 'logout_time',
            key: 'logout_time',
            render:(logOutTime:string)=>{
                if(logOutTime){
                    let local = moment.utc(logOutTime).local().format()
                    let str = local.split("T")
                    str = str[1].split(".")
                    str = str[0].split("+")
                    return(str[0])
                }else{
                    return("Not Available")
                }
            }
        },
        {
            title: 'Work Hours',
            dataIndex: 'work_hours',
            key: 'work_hours',
            render:(rec:string)=>{
                if(rec){
                    let hrs = rec.split(".")
                let str = hrs[0].split(":")
                return(
                    `${str[0]}hrs ${str[1]} min`
                )
                }else{
                    return("Not Available")
                }
                
            }
        },
        {
            title: 'Remarks',
            dataIndex: 'is_present',
            key: 'is_present',
            render:(isPresent:boolean,item:any)=>{
                if(item.week_day == "Saturday"||item.week_day == "Sunday"){
                    return("Week Off")
                }
                else if(isPresent == true){
                    return("Present")
                }else{
                    return("Absent")
                }
                
            }
        },
        {
            title: 'Leave Details',
            dataIndex: 'leave_details',
            key: 'leave_details',
        }
    ];
    return(
        <>
        <TopMenu/> 
            <Row>
                <Col span={24}>
                    <h4>Attendance Logs of Month</h4>
                    <Table rowKey={(record: any) => record.id} dataSource={userData||[]} columns={columns} />

                </Col>
            </Row>
        </>
    )
}
export default UserPage;