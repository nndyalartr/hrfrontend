import { Button, Col, Row, Table, message } from "antd"
import useLeaveApproval from "../../QueryApiCalls/useLeaveApproval"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { useEffect, useState } from "react"
import { LeaveApproval } from "../../interfaces/types"
import TopMenu from "../TopMenu"
import useAttendanceApproval from "../../QueryApiCalls/useAttendanceApproval"
import useAttendanceApprovalGetList from "../../QueryApiCalls/useAttendaceReqApprovalGetList"
import { AxiosError, AxiosResponse } from "axios"

const UserAttendanceRequestApprove = () => {

    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<LeaveApproval>({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })
    const [getOptions, setGetOptions] = useState<LeaveApproval>({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setGetOptions({ ...options, type: "GET", getApiEnabled: true })
    }, [])
    const onEventSuccess = (res: any) => {
        if (options.type == "PATCH") {
            message.success(res.data.message)
        }
        else {
            // message.success(res.data.message)
        }
        setGetOptions({ ...getOptions, type: "GET", getApiEnabled: true })
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })

    }
    const onEventError = (err: any) => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })

    }
    const onSuccess = (res: AxiosResponse) => {
        setGetOptions({ ...getOptions, type: "GET", getApiEnabled: false })
        setTableData(res.data)
    }
    const onError = (err: AxiosError) => {
        setGetOptions({ ...getOptions, type: "GET", getApiEnabled: false })
    }
    useAttendanceApprovalGetList(getOptions, onSuccess, onError)
    const { refetch } = useAttendanceApproval(options, onEventSuccess, onEventError)
    const approveFn = (id: string) => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true, type: "PATCH", id: id, action: "approved" })

    }
    const rejectFn = (id: string) => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true, type: "PATCH", id: id, action: "rejected" })
    }
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Login Time",
            dataIndex: "login_time",
            key: "login_time",
        },
        {
            title: "Logout Time",
            dataIndex: "logout_time",
            key: "logout_time"
        },
        {
            title: "Working Hours",
            dataIndex: "working_hours",
            key: "working_hours"
        },
        {
            title: "Applied By",
            dataIndex: "applied_by",
            key: "applied_by"
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason"
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (id: string) => {
                let ids = id
                return (
                    <>
                        <Button onClick={() => approveFn(ids)} className="me-2" type="primary">Approve</Button>
                        <Button type="primary" onClick={() => rejectFn(ids)} danger>Reject</Button>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <TopMenu />
            <h3>Pending Attendance Request of your Team</h3>
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} />
                </Col>

            </Row>
        </>
    )
}
export default UserAttendanceRequestApprove