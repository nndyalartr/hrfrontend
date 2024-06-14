import { Button, Col, DatePicker, Form, Input, Row, Select, Table, message } from "antd";
import TopMenu from "../TopMenu";
import moment from "moment";
import { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { UserInfoStore } from "../../utils/useUserInfoStore";
import useCreateLeave from "../../QueryApiCalls/useApplyLeave";
import { ApplyLeave } from "../../interfaces/types";

const UserLeavesPage = () => {
    const [eventsForm] = Form.useForm()
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const { RangePicker } = DatePicker;
    const [errors, setErrors] = useState<string>("")
    const initialValues = {

    }
    const [apiObj, setApiObj] = useState<{ date: string; session: string; }[]>([])
    const [leaveSummary, setLeaveSummary] = useState<{ reason: string, noOfLeaves: number, leaveType: string }>({ reason: "", noOfLeaves: 0, leaveType: "" })
    const [options, setOptions] = useState<ApplyLeave>({ leaveReason: "", leaveType: "", userEmail: loggedInEmail.user_email, leave_count: 0, leaves: [], getApiEnabled: false, type: "" })
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setOptions({ leaveReason: "", leaveType: "", userEmail: loggedInEmail.user_email, leave_count: 0, leaves: [], getApiEnabled: true, type: "GET" })
    }, [])
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
    const onEventSuccess = (res: any) => {
        if (options.type == "GET") {
            setTableData(res.data)

        } else {
            if (res.status === 200){
                message.success(res.data.message)
            }else{
                message.error(res.response.data.message)
            }
        }
        setOptions({ leaveReason: "", leave_count: 0, leaveType: "", userEmail: loggedInEmail.user_email, leaves: [], getApiEnabled: false, type: "" })

    }
    const onEventError = (err: any) => {
        setOptions({ leaveReason: "", leave_count: 0, leaveType: "", userEmail: loggedInEmail.user_email, leaves: [], getApiEnabled: false, type: "" })
    }
    const { refetch } = useCreateLeave(options, onEventSuccess, onEventError)
    const applyLeave = (values: any) => {
        let leaveArray: { date: string, session: string }[] = []
        let leaveStartDate = moment(values.lsdate.$d).format("YYYY-MM-DD")
        let leaveEndDate = moment(values.ledate.$d).format("YYYY-MM-DD")
        let startSession = values.fromsession
        let endSession = values.tosession
        if (leaveStartDate == leaveEndDate) {
            if (endSession == "s-1" && startSession == "s-2") {
                message.error("start session sould not be less than end")
                setLeaveSummary({ reason: "", noOfLeaves: 0, leaveType: "" })
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
        setLeaveSummary({ reason: values.reason, leaveType: values.type, noOfLeaves: leaveCount })
    }
    const leaveSubmitFn = () => {
        setOptions({ leaveReason: leaveSummary.reason, leaveType: leaveSummary.leaveType, userEmail: loggedInEmail.user_email, leaves: apiObj, getApiEnabled: true, type: "POST", leave_count: leaveSummary.noOfLeaves })
        setTimeout(() => {
            setOptions({ ...options, type: "GET", getApiEnabled: true })
        }, 300)
    }
    const leaveTypes = [
        {
            label: "Casual Leave",
            key: "causalLeave",
            value: "CasualLeave"
        },
        {
            label: "Comp Off",
            key: "CompOff",
            value: "CompOff"
        },
        {
            label: "Sick Leave",
            key: "sickLeave",
            value: "sickLeave"
        },
        {
            label: "Paternity Leave",
            key: "paternityLeave",
            value: "paternityLeave"
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
    const columns = [{
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate"
    },
    {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
    },
    {
        title: "Leave Type",
        dataIndex: "type",
        key: "type"
    },
    {
        title: "Leave Count",
        dataIndex: "leaveCount",
        key: "leaveCount"
    },
    {
        title: "Approval Person",
        dataIndex: "approver",
        key: "approver"
    },
    {
        title: "Reason",
        dataIndex: "reason",
        key: "reason"
    },
    {
        title: "Leave Status",
        dataIndex: "status",
        key: "status"
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
                    <Col xs={24} sm={12} md={12} lg={6}>
                        <Form.Item name="type" label="Leave Type" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={leaveTypes} />
                        </Form.Item>
                        <Form.Item name="reason" label="Leave Reason" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6}>
                        <Form.Item name="lsdate" label="Leave Start Date" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Please Select Leave Date" />
                        </Form.Item>
                        <Form.Item name="fromsession" label="Start Session" rules={[{ required: true }]}>
                            <Select options={leaveDuration} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6}>
                        <Form.Item name="ledate" label="Leave End Date" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Please Select Leave Date" />
                        </Form.Item>
                        <Form.Item name="tosession" label="End Session" rules={[{ required: true }]}>
                            <Select options={leaveDuration} />
                        </Form.Item>
                    </Col>
                    <Col >
                        <Form.Item>
                            <Button htmlType="submit" type="primary" className="w-100">
                                Calculate Leave
                            </Button>
                        </Form.Item>
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
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} scroll={{ x: 'max-content' }} />
                </Col>

            </Row>

        </>
    )
}
export default UserLeavesPage;