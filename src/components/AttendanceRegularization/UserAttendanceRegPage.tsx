import { useEffect, useState } from "react"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { AttendanceReg, AttendanceRegRequst } from "../../interfaces/types"
import useGetAttendanceRegDet from "../../QueryApiCalls/useGetAttendanceRegDet"
import TopMenu from "../TopMenu"
import { Button, Col, Input, Row, Table, message } from "antd"
import useCreateAttendanceRegRequest from "../../QueryApiCalls/useCreateAttendanceRegRequest"
import UserAttendanceReqViewComponent from "./UserAttendanceReqViewComponent"

const UserAttendanceRegPage = () => {
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<AttendanceReg>({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })
    const [regOptions, setRegOptions] = useState<AttendanceRegRequst>(
        {
            userEmail: loggedInEmail.user_email,
            getApiEnabled: false, type: "",
            attendance_id: "",
            date: "",
            login_time: "",
            logout_time: "",
            working_hours: "",
            reason: "",
            status: ""
        })
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setOptions({ ...options, type: "GET", getApiEnabled: true })
    }, [])
    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        setTableData(res.data)
    }
    const onError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
    }
    const [reason, setReason] = useState<string>("")
    const submitRegularize = (record: any) => {
        if (reason.length === 0) {
            message.error("Please give reason")
        } else {
            setRegOptions({
                userEmail: loggedInEmail.user_email,
                getApiEnabled: true, type: "POST",
                attendance_id: record.id,
                date: record.created_at,
                login_time: record.login_time,
                logout_time: record.logout_time,
                working_hours: record.working_hours,
                reason: reason,
                status: ""
            })
        }
    }
    const onRegSuccess = (res: any) => {
        setOptions({ ...options, type: "GET", getApiEnabled: true })
        message.success(res.data.message)
        setRegOptions({
            userEmail: loggedInEmail.user_email,
            getApiEnabled: false, type: "",
            attendance_id: "",
            date: "",
            login_time: "",
            logout_time: "",
            working_hours: "",
            reason: "",
            status: ""
        })
    }
    const onRegError = (res: any) => {
        setRegOptions({
            userEmail: loggedInEmail.user_email,
            getApiEnabled: false, type: "",
            attendance_id: "",
            date: "",
            login_time: "",
            logout_time: "",
            working_hours: "",
            reason: "",
            status: ""
        })
    }
    const { refetch } = useGetAttendanceRegDet(options, onSuccess, onError)
    const { data } = useCreateAttendanceRegRequest(regOptions, onRegSuccess, onRegError)
    const columns = [
        {
            title: "Date",
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: "Week Day",
            dataIndex: "week_day",
            key: "week_day"
        },
        {
            title: "log-in time",
            dataIndex: "login_time",
            key: "login_time",
            render: (login_time: any) => {
                if (!login_time) {
                    return ("Did not Login")
                } else {
                    return login_time
                }
            }
        },
        {
            title: "log-off time",
            dataIndex: "logout_time",
            key: "logout_time",
            render: (logout_time: any) => {
                if (!logout_time) {
                    return ("Did not Log-out")
                } else {
                    return logout_time
                }
            }
        },
        {
            title: "work hours",
            dataIndex: "work_hours",
            key: "work_hours",
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
            title: "Remarks",
            dataIndex: "is_present",
            key: "is_present",
            render: (is_present: boolean) => {
                if (is_present) {
                    return ("Present")
                } else {
                    return ("Absent")
                }
            }
        },
        {
            title: "Regularize",
            dataIndex: "noindex",
            key: "Regularize",
            render: (_: any, record: any) => {
                return (<>
                    <Row>
                        <Col className="me-2">
                            <Input onChange={e => { setReason(e.target.value) }} />
                        </Col>
                        <Col>
                            <Button onClick={() => submitRegularize(record)}>Submit</Button>
                        </Col>
                    </Row>
                </>)
            }
        },


    ]
    return (
        <>
            <TopMenu />
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} scroll={{ x: 'max-content' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <UserAttendanceReqViewComponent/>
                </Col>
            </Row>

        </>
    )
}

export default UserAttendanceRegPage;