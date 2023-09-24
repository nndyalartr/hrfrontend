import { Button, Col, DatePicker, Form, Input, Row, Select, Table, message } from "antd";
import TopMenu from "../TopMenu";
import moment from "moment";
import { useState } from "react";
import { JsonToTable } from "react-json-to-table";

const UserLeavesPage = () => {
    const [eventsForm] = Form.useForm()
    const { RangePicker } = DatePicker;
    const [errors, setErrors] = useState<string>("")
    const initialValues = {

    }
    const [apiObj,setApiObj]=useState<{ date: string; session: string; }[]>([])
    const [leaveSummary, setLeaveSummary] = useState<{ reason: string, noOfLeaves: number }>({ reason: "", noOfLeaves: 0 })
    function getDates(startDate: Date, endDate: Date) {
        const dates = [];
        let currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + 1);
        let endDateRev = new Date(endDate)
        endDateRev.setDate(endDate.getDate() - 1)
        while (currentDate < endDateRev) {
            dates.push(moment(currentDate).format("YYYY-MM-DD"));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
    const applyLeave = (values: any) => {
        let leaveArray: { date: string, session: string }[] = []
        let leaveStartDate = moment(values.lsdate.$d).format("YYYY-MM-DD")
        let leaveEndDate = moment(values.ledate.$d).format("YYYY-MM-DD")
        let startSession = values.fromsession
        let endSession = values.tosession
        if (leaveStartDate == leaveEndDate) {
            console.log(endSession.split("-")[1])
            if (endSession == "s-1" && startSession == "s-2") {
                message.error("start session sould not be less than end")
                setLeaveSummary({ reason: "", noOfLeaves: 0 })
                return
            } else {
                let leaveObj = {
                    date: leaveStartDate,
                    session: ""
                }
                if (endSession == startSession) {
                    leaveObj.session = startSession
                } else {
                    leaveObj.session = "fullDay"
                }
                leaveArray.push(leaveObj)

            }
        } else {
            if (startSession == "s-1") {
                leaveArray.push({ date: leaveStartDate, session: "fullDay" })
            } else {
                leaveArray.push({ date: leaveStartDate, session: startSession })
            }
            if (endSession == "s-2") {
                leaveArray.push({ date: leaveEndDate, session: "fullDay" })
            } else {
                leaveArray.push({ date: leaveEndDate, session: endSession })
            }
            let remaininfDates = getDates(values.lsdate.$d, values.ledate.$d)
            remaininfDates.forEach(x => {
                leaveArray.push({ date: x, session: "fullDay" })
            })
        }
        let leaveCount = 0
        leaveArray.forEach(x => {
            if (x.session == "fullDay") {
                leaveCount = leaveCount + 1
            } else {
                leaveCount = leaveCount + 0.5

            }
        })
        setApiObj(leaveArray)
        setLeaveSummary({ reason: values.reason, noOfLeaves: leaveCount })
    }
    const leaveSubmitFn = ()=>{
        console.log("apicall",apiObj)
    }
    const leaveTypes = [
        {
            label: "Casual Leave",
            key: "causalLeave",
            value: "CL"
        }
    ]
    const leaveDuration = [
        {
            label: "Session-1",
            key: "Session-1",
            value: "s-1"
        },
        {
            label: "Session-2",
            key: "Session-2",
            value: "s-2"
        }
    ]
    return (
        <>
            <TopMenu />
            <Form
                className="mt-2"
                form={eventsForm}
                initialValues={initialValues}
                onFinish={applyLeave}
            >
                <Row gutter={8} className="ms-2 me-2">
                    <Col span={6}>
                        <Form.Item name="type" label="Leave Type" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={leaveTypes} />
                        </Form.Item>
                        <Form.Item name="reason" label="Leave Reason" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="lsdate" label="Leave Start Date" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select Leave Date" />
                        </Form.Item>
                        <Form.Item name="fromsession" label="Start Session" rules={[{ required: true }]}>
                            <Select options={leaveDuration} />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item name="ledate" label="Leave End Date" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select Leave Date" />
                        </Form.Item>
                        <Form.Item name="tosession" label="End Session" rules={[{ required: true }]}>
                            <Select options={leaveDuration} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button htmlType="submit" type="primary">Calculate Leave</Button>
                    </Col>
                </Row>
            </Form>
            {leaveSummary.reason !== "" &&
                <>
                    <Row className="ms-2" gutter={8} align="middle">
                        <Col span={8}>
                            <JsonToTable json={leaveSummary} />

                        </Col>
                        <Col>
                            <Button type="primary" onClick={leaveSubmitFn}>Apply Leave</Button>
                        </Col>
                    </Row>
                </>
            }

        </>
    )
}
export default UserLeavesPage;