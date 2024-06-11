import { Col, Row, Table, Form, message, DatePicker, Button } from "antd"
import TopMenu from "../TopMenu"
import useListTeamAttendanceList from "../../QueryApiCalls/useGetTeamAttendance"
import { useEffect, useState } from "react"
import { TeamAttendanceType } from "../../interfaces/types"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { AxiosError, AxiosResponse } from "axios"
import moment from "moment"

const TeamAttendance = () => {
    const [filterForm] = Form.useForm()
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<TeamAttendanceType>({ type: "GET", getApiEnabled: false, userEmail: loggedInEmail.user_email })
    const [attendanceData, setAttendanceData] = useState<any>([])
    useEffect(() => {
        setOptions({ ...options, getApiEnabled: true })
    }, [])
    const onSuccess = (res: AxiosResponse) => {
        setOptions({ ...options, getApiEnabled: false, date: undefined })
        if (res.status == 200) {
            setAttendanceData(res.data)
        }
    }
    const onError = (err: AxiosError) => {
        setOptions({ ...options, getApiEnabled: false, date: undefined })
    }
    useListTeamAttendanceList(options, onSuccess, onError)
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "User Name",
            dataIndex: "user_name",
            key: "user_name"
        },
        {
            title: 'Login Time',
            dataIndex: 'login',
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
            dataIndex: 'logout',
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
    ]
    const filterSearch = (values: any) => {
        let startDate = moment(values.date.$d).format("YYYY-MM-DD")
        setOptions({ ...options, userEmail: loggedInEmail.user_email, getApiEnabled: true, date: startDate })

    }
    return (<>
        <TopMenu />
        <Form
            form={filterForm}
            className=""
            initialValues={{ remember: true }}
            onFinish={filterSearch}
        >
            <Row gutter={16} className="m-4">
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Form.Item
                        name="date"
                        rules={[{ required: true, message: 'Please Select Date' }]}
                    >
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Select Date" />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6} xl={4}>

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
                <Table rowKey={(record: any) => record.id} dataSource={attendanceData || []} columns={columns} scroll={{ x: 'max-content' }} />
            </Col>
        </Row>
    </>)
}
export default TeamAttendance