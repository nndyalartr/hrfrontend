import { Col, Row, Table } from "antd";
import React from 'react';
import axios from "axios";
import TopMenu from "../TopMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import useGetAttendanceDetails from "../../QueryApiCalls/useGetAttendanceDetails";
import { UserInfoStore } from "../../utils/useUserInfoStore";
import useGetMyDetails from "../../QueryApiCalls/useGetMyDetails";
import { JsonToTable } from "react-json-to-table";
import "./UserStyles.css"
const UserSelfPage =()=>{
    const [userData, setUserData] = useState<any>({})  
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions]=useState<{getApiEnabled:boolean,userEmail:string}>({getApiEnabled:false,userEmail:""})
    useEffect(()=>{
            // setOptions({userEmail:loggedInEmail.user_email,getApiEnabled:true})
            setUserData({"id": "5c752592-3959-4b96-bd8e-81e1a334414a",
            "emp_no": "T3334",
            "emp_name": "Prajwal PathronFernandes",
            "first_name": "Prajwal Pathron",
            "last_name": "Fernandes",
            "email_id": "dummy2@tharworx.com",
            "father_name": "Pathron Fernades",
            "name_as_aadhar": "test name 2",
            "emergency_contact_name": "Dummy",
            "emergency_contact": "Dummy",
            "aadhar_number": "353453",
            "mobile_number": "7090049470",
            "designation": "Exe AR",
            "location": "",
            "department": "Holiday Calendar - Bangalore Night Shift",
            "permanent_address": "#606,Head Bandar Road,kumta, Uttara kannada, Karnataka -581343",
            "temporary_address": "#606,Head Bandar Road,kumta, Uttara kannada, Karnataka -581343",
            "date_of_joining": "2023-08-17",
            "date_of_birth": "1999-06-03",
            "gender": "Male",
            "pan": "Dummy",
            "maritial_status": "Single",
            "ctc": "Dummy",
            "is_pf_eligible": true,
            "is_esi_eligible": true,
            "is_night_shift": false,
            "blood_group": "O+ve",
            "project_name": "Xifin",
            "role": "Employee",
            "user_id": "0c561422-617b-482d-b9e1-4005654c7f5b"
        })
        
    },[])
    // const onSuccess=(res:any)=>{
    //     setOptions({...options,getApiEnabled:false})
    //     const pp = {

    //         "nsme":"iusdgf",
    //         "kirn":"udisgf"
    //     }
    //     setUserData(res.pp)
    // }
    // const onError = (err:any)=>{
    //     const pp = {

    //         "nsme":"iusdgf",
    //         "kirn":"udisgf"
    //     }
    //     setUserData(pp)
    //     console.log("errcameeee")
    // }
    // const {refetch} = useGetMyDetails(options,onSuccess,onError)

    
      
    return(
        <>
        <TopMenu/> 
            <Row>
                <Col>
                    <h4 className="m-4">User Details</h4>
                    {/*<JsonToTable json={userData}/>*/}
                    {/* <Table rowKey={(record: any) => record.id} dataSource={userData||[]} columns={columns} /> */}

                </Col>

            </Row>
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
                <span className="keyValueBlock m-3"><span className="keyValue me-2">Pan :</span><span className="valueStyle">{userData.Pan} </span></span>
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