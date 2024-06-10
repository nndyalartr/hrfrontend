import { Button, Col, Row, Table, message } from "antd"
import useLeaveApproval from "../../QueryApiCalls/useLeaveApproval"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { useEffect, useState } from "react"
import { LeaveApproval } from "../../interfaces/types"
import TopMenu from "../TopMenu"
import useLeaveApprovalGet from "../../QueryApiCalls/useLeaveApprovalGet"
import { AxiosError, AxiosResponse } from "axios"

const LeaveApprovalPage = () => {

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
        setGetOptions({ ...options, type: "GET", getApiEnabled: true })
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })

    }
    const onEventError = (err: any) => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })

    }
    const onSuccess = (res:AxiosResponse)=>{
        setGetOptions({ ...options, type: "GET", getApiEnabled: false })
        setTableData(res.data)
    }
    const onError = (err:AxiosError)=>{
        setGetOptions({ ...options, type: "GET", getApiEnabled: false })
    }
    useLeaveApprovalGet(getOptions, onSuccess, onError)
    const { refetch } = useLeaveApproval(options, onEventSuccess, onEventError)
    const approveFn = (id: string) => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true, type: "PATCH", id: id, action: "approved" })
    }
    const columns = [{
        title: "Applied By",
        dataIndex: "applied_by",
        key: "applied_by"
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
    },
    {
        title: "Start Session",
        dataIndex: "start_session",
        key: "start_session"
    },
    {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate"
    },
    {
        title: "End Session",
        dataIndex: "end_session",
        key: "end_session"
    },
    {
        title: "Leave Count",
        dataIndex: "leave_count",
        key: "leave_count"
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
                    <Button type="primary" danger>Reject</Button>
                </>
            )
        }
    }
    ]
    return (
        <>
            <TopMenu />
            <h3>Pending Leave Request of your Team</h3>
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} scroll={{ x: 'max-content' }}/>
                </Col>

            </Row>
        </>
    )
}
export default LeaveApprovalPage