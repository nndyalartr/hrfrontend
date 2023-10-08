import { Card, Col, Row } from "antd";
import TopMenu from "./TopMenu";
import { useEffect, useState } from "react";

import useGetLeaveDetails from "../QueryApiCalls/useGetLeaveDetails";
import { UserInfoStore } from "../utils/useUserInfoStore";

const Dashboard = () => {
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions]=useState<{getApiEnabled:boolean,userEmail:string}>({getApiEnabled:false,userEmail:""})
    useEffect(()=>{
            setOptions({userEmail:loggedInEmail.user_email,getApiEnabled:true})
        
    },[])
    const [attendanceData,setAttendanceData] = useState<{present:string,absent:string}>()
    const onSuccess=(res:any)=>{
        setOptions({...options,getApiEnabled:false})
        setAttendanceData({present:res.data.present_days,absent:res.data.absent_days})
    }
    const onError = (err:any)=>{
        console.log("err")
    }
    const {refetch} = useGetLeaveDetails(options,onSuccess,onError)
    return (
        <>
            <TopMenu />
            <Row>
                <Col span={18}>

                </Col>
                <Col>
                    <Card className="mt-3" title="My Details">
                        <Row>
                            <Col>                                
                                <h6 style={{ textAlign: "left" }}><span>Leaves  :<strong>{attendanceData?.absent}</strong></span></h6>
                                <h6 style={{ textAlign: "left" }}><span>Number of days present :<strong>{attendanceData?.present}</strong></span></h6>
                                <h6 style={{ textAlign: "left" }}><span>Leaves remaining :<strong>9</strong></span></h6>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Dashboard;