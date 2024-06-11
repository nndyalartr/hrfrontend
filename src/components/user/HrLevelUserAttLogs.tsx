import { Button, Col, DatePicker, Form, Input, Row, Table, message } from "antd";
import axios from "axios";
import TopMenu from "../TopMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import Cookies from "js-cookie";
import useGetAttendanceDetails from "../../QueryApiCalls/useGetAttendanceDetails";
import { UserInfoStore } from "../../utils/useUserInfoStore";

const HrLevelAttLogs = (props: any) => {
    console.log(props.props)
    const [filterForm] = Form.useForm()
    const [userData, setUserData] = useState([])
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, fromDate?: string, toDate?: string }>({ getApiEnabled: false, userEmail: "", fromDate: "", toDate: "" })
    useEffect(() => {
        setOptions({ ...options, userEmail: props.props.userId.email, getApiEnabled: true })

    }, [])
    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        setUserData(res.data)
    }
    const onError = (err: any) => {
        console.log("err")
    }
    const { refetch } = useGetAttendanceDetails(options, onSuccess, onError)

    const columns = [
        {
            title: "Date",
            dataIndex: "created_at",
            key: "Date",
            render: (date: string) => {
                return (
                    <span>{moment(date).format('Do MMMM, YYYY')}</span>
                )
            }
        },
        {
            title: "Week",
            dataIndex: "week_day",
            key: "week_day"
        },
        {
            title: 'Login Time',
            dataIndex: 'login_time',
            key: 'login_time',
            render: (loginTime: string) => {
                if (loginTime) {
                    let local = moment.utc(loginTime).local().format()
                    let str = local.split("T")
                    str = str[1].split(".")
                    str = str[0].split("+")
                    return (str[0])
                } else {
                    return ("Not Available")
                }
            }
        },
        {
            title: 'Logout Time',
            dataIndex: 'logout_time',
            key: 'logout_time',
            render: (logOutTime: string) => {
                if (logOutTime) {
                    let local = moment.utc(logOutTime).local().format()
                    let str = local.split("T")
                    str = str[1].split(".")
                    str = str[0].split("+")
                    return (str[0])
                } else {
                    return ("Not Available")
                }
            }
        },
        {
            title: 'Work Hours',
            dataIndex: 'work_hours',
            key: 'work_hours',
            render: (rec: string) => {
                if (rec) {
                    let hrs = rec.split(".")
                    let str = hrs[0].split(":")
                    return (
                        `${str[0]}hrs ${str[1]} min`
                    )
                } else {
                    return ("Not Available")
                }

            }
        },

        {
            title: 'Remarks',
            dataIndex: 'remarks',
            key: 'remarks',
            render: (remarks: string, item: any) => {
                if (remarks != "") {
                    return (remarks)
                }
                else if (item.is_present) {
                    return ("Present")
                }
                else {
                    return ("Absent")
                }
            }
        }
    ];
    const filterSearch = (values: any) => {
        let startDate = moment(values.fromDate.$d).format("YYYY-MM-DD")
        let endDate = moment(values.toDate.$d).format("YYYY-MM-DD")
        if (moment(values.toDate.$d).isBefore(moment(values.fromDate.$d))) {
            message.error("End date should not be greater than start date")
        } else {

            setOptions({ ...options, getApiEnabled: true, fromDate: startDate, toDate: endDate })
        }
    }
    return (
        <>
            <Form
                form={filterForm}
                className=""
                initialValues={{ remember: true }}
                onFinish={filterSearch}
            >
                <Row gutter={16} className="m-4">
                    <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                        <Form.Item
                            name="fromDate"
                            rules={[{ required: true, message: 'Start date is missing' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Start Date" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8}>

                        <Form.Item
                            name="toDate"
                            rules={[{ required: true, message: 'End Date is missing' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="End Date" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-100">
                                Search
                            </Button>
                        </Form.Item>
                    </Col>


                </Row>
            </Form>
            <Row>
                <Col span={24}>
                    <h4>Attendance Logs</h4>
                    <Table rowKey={(record: any) => record.id} dataSource={userData || []} columns={columns} scroll={{ x: 'max-content' }} />

                </Col>
            </Row>
        </>
    )
}
export default HrLevelAttLogs;