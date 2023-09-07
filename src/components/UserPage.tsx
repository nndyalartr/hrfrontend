import { Col, Row, Table } from "antd";
import axios from "axios";
import TopMenu from "./TopMenu";
import { useEffect, useState } from "react";

const UserPage =()=>{
    const [userData, setUserData] = useState([])    
    useEffect(() => {
        axios({
            url: "http://127.0.0.1:8000/attendance-details/?email_id=raviteja@gmail.com",
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
                    let str = loginTime.split("T")
                    str = str[1].split(".")
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
                    let str = logOutTime.split("T")
                    str = str[1].split(".")
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
            render:(isPresent:boolean)=>{
                if(isPresent == true){
                    return("Present")
                }else{
                    return("Absent")
                }
                
            }
        }
    ];
    return(
        <>
        <TopMenu/> 
            <Row>
                <Col span={18}>

                </Col>
                <Col>
                    <span>Name : <strong>N. Ravi Teja Reddy</strong></span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Attendance Logs of Month</h4>
                    <Table rowKey={(record: any) => record.id} dataSource={userData||[]} columns={columns} />

                </Col>
            </Row>
        </>
    )
}
export default UserPage;