import { Col, Row, Table } from "antd";
import axios from "axios";
import TopMenu from "../TopMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import useGetAttendanceDetails from "../../QueryApiCalls/useGetAttendanceDetails";
import { UserInfoStore } from "../../utils/useUserInfoStore";
import useGetMyDetails from "../../QueryApiCalls/useGetMyDetails";
import './UserStyle.css'

const UserSelfPage =()=>{
    const [userData, setUserData] = useState<any>({})  
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
    const {refetch} = useGetMyDetails(options,onSuccess,onError)

  
    return(
        <>
        <TopMenu/> 
        <Row>
                <Col span={8}>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Employe Number :  </span><span className="valueStyle">{userData.emp_no} </span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Employe Name :</span><span className="valueStyle">{userData.emp_name}</span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">First Name :</span><span className="valueStyle">{userData.first_name} </span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">last Name :</span><span className="valueStyle">{userData.last_name} </span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Email id :</span><span className="valueStyle">{userData.email_id} </span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Name as Aadhar :</span><span className="valueStyle">{userData.name_as_aadhar} </span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Aadhar Number :</span><span className="valueStyle">{userData.aadhar_number} </span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Mobile Number :</span><span className="valueStyle">{userData.mobile_number}</span></span>
                    <span className="keyValueBlock m-3"><span className="keyValue me-2">Designation :</span><span className="valueStyle">{userData.designation} </span></span>
                    
                </Col>
                <Col span={8}>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Father Name :</span><span className="valueStyle">{userData.father_name} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Date Of Joining :</span><span className="valueStyle">{userData.date_of_joining} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Pan :</span><span className="valueStyle">{userData.pan} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Project Name :</span><span className="valueStyle">{userData.project_name} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Role :</span><span className="valueStyle">{userData.role} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Ctc :</span><span className="valueStyle">{userData.ctc} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Gender :</span><span className="valueStyle">{userData.gender} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Date Of Birth :</span><span className="valueStyle">{userData.date_of_birth} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Maritial Status : </span><span className="valueStyle">{userData.maritial_status} </span></span>
                </Col>

                <Col span={8}>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Blood Group :</span><span className="valueStyle">{userData.blood_group} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Department :</span><span className="valueStyle">{userData.department} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Is Pf Eligible :</span><span className="valueStyle">{userData.is_pf_eligible} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Is Esi Eligible :</span><span className="valueStyle">{userData.is_esi_eligible} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Is Night Shift :</span><span className="valueStyle">{userData.is_night_shift} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Permanent Address :</span><span className="valueStyle">{userData.permanent_address} </span></span>
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Temporary Address :</span><span className="valueStyle">{userData.temporary_address} </span></span>
            
                </Col>
            </Row>
        </>
    )
}
export default UserSelfPage;