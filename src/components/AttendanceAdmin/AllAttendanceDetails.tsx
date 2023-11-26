import { useEffect, useState } from "react"
import useGetAllAttendance from "../../QueryApiCalls/useGetAllAttendance"
import TopMenu from "../TopMenu"
import { Button, Col, DatePicker, Form, Input, Row, Table, message } from "antd"
import moment from "moment"

const AllAttendanceDetails = () => {
    const [loginForm] = Form.useForm()
    const [options, setOptions] = useState({ type: "", getApiEnabled: false,fromDate:"",toDate:"" })
    const onSuccess = (response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendance_data.xlsx'); // Set the desired file name here
        document.body.appendChild(link);
        link.click();
        setOptions({ ...options, getApiEnabled: false })
        message.success("Successfully Downloaded records")
    }
    const onError = () => {
        setOptions({ ...options, getApiEnabled: false })
    }
    const { data } = useGetAllAttendance(options, onSuccess, onError)
    const generateReport = (values:any) => {
        let fromDate = moment(values.fromDate.$d).format("YYYY-MM-DD")
        let toDate = moment(values.toDate.$d).format("YYYY-MM-DD")
        if (moment(toDate).isBefore(fromDate)) {
            message.error("End Date cannot be before than From Date")
        } else {
            // 'toDate' is greater than or equal to 'fromDate', perform further actions here
            setOptions({ ...options, getApiEnabled: true,fromDate:fromDate,toDate:toDate })
        }
    }
    return <>
        <TopMenu />
        <h2>Attendance Summary Report</h2>
        <Row gutter={16} className="m-2">
            <Col>
                <Form
                    className=""
                    form={loginForm}
                    onFinish={generateReport}
                >
                    <Form.Item name="fromDate" label="Select Start Date">
                        <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select Start Date" />
                    </Form.Item>
                    <Form.Item name="toDate" label="Select End Date">
                        <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select End Date" />
                    </Form.Item>
                    <Button htmlType="submit" type="primary">Generate Attendance Report</Button>

                </Form>
            </Col>
        </Row>
    </>
}
export default AllAttendanceDetails