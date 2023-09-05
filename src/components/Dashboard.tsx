import { Card, Col, Row } from "antd";
import TopMenu from "./TopMenu";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [attendanceData,setAttendanceData] = useState<{present:string,absent:string}>()
    useEffect(()=>{
        axios({
            url: "http://127.0.0.1:8000/leave-details/?email_id=raviteja@gmail.com",
            method: "GET"
        }).then((res) => {
            console.log(res)
            setAttendanceData({present:res.data.present_days,absent:res.data.absent_days})
        }).catch((err) => {
            console.log(err)
        })
    })
    return (
        <>
            <TopMenu />
            <Row>
                <Col span={18}>

                </Col>
                <Col>
                    <span>Hi <strong>N. Ravi Teja Reddy</strong></span>
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