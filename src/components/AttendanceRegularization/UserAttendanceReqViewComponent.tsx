import { useEffect, useState } from "react"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { ListAttendanceRequest } from "../../interfaces/types"
import useListAttendanceReg from "../../QueryApiCalls/useListAttendanceReg"
import { Table } from "antd"

const UserAttendanceReqViewComponent = () => {
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<ListAttendanceRequest>({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })
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
    const { refetch } = useListAttendanceReg(options, onSuccess, onError)
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Login Time",
            dataIndex: "login_time",
            key: "login_time"
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
            title: "Approver",
            dataIndex: "approver",
            key: "approver"
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        }
    ]
    return (
        <>
            <h2>View Pending Regularizations</h2>
            <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} scroll={{ x: 'max-content' }}/>

        </>
    )
}
export default UserAttendanceReqViewComponent