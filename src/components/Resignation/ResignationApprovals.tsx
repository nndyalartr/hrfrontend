import { Button, Col, DatePicker, Row, Table, message } from "antd"
import useLeaveApproval from "../../QueryApiCalls/useLeaveApproval"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { useEffect, useState } from "react"
import { GetAllRegnations, LeaveApproval } from "../../interfaces/types"
import TopMenu from "../TopMenu"
import useAttendanceApproval from "../../QueryApiCalls/useAttendanceApproval"
import useApplyResignation from "../../QueryApiCalls/useApplyResignation"
import useGetAllResignations from "../../QueryApiCalls/useGetAllResignations"
import moment from "moment"

const ResignationApprovals = () => {

    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [allResignations, setallResignations] = useState<GetAllRegnations>({
        type: "", getApiEnabled: false,
        user_email: ""
    })
    const [exitDate, setExitDate] = useState<string>()
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setallResignations({ ...allResignations, type: "GET", getApiEnabled: true, user_email: loggedInEmail.user_email })
    }, [])
    const onEventSuccess = (res: any) => {
        setallResignations({ ...allResignations, type: "", getApiEnabled: false })
        setTableData(res.data.data)

    }
    const onEventError = (err: any) => {
        console.log("err")
    }
    const { } = useGetAllResignations(allResignations, onEventSuccess, onEventError)
    const approveFn = (id: string) => {
        if (exitDate) {
            setallResignations({ ...allResignations, type: "POST", getApiEnabled: true, status: "Approved", record_id: id, exit_date: exitDate })
        } else {
            message.error("Please Select Exit Date")
        }

    }
    const rejectFn = (id: string) => {
            setallResignations({ ...allResignations, type: "POST", getApiEnabled: true, status: "Rejected", record_id: id, exit_date: "" })


    }
    const columns = [
        {
            title: "Applied Date",
            dataIndex: "resignation_date",
            key: "date"
        },
        {
            title: "Applied By",
            dataIndex: "applied_by",
            key: "applied_by",
        },
        {
            title: "Reason for Resignation",
            dataIndex: "resignation_reason",
            key: "resignation_reason"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        },
        {
            title: "Date of Exit",
            dataIndex: "",
            key: "DateOfExit",
            render: () => {
                return (
                    <>
                        <DatePicker onSelect={(e) => { setExitDate(moment(e.toDate()).format("YYYY-MM-DD")) }} format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select Event Date" />
                    </>
                )
            }
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
                        <Button onClick={() => rejectFn(ids)} type="primary" danger>Reject</Button>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <TopMenu />
            <h3>Pending Resignation Approvals of your Team</h3>
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} scroll={{ x: 'max-content' }}/>
                </Col>

            </Row>
        </>
    )
}
export default ResignationApprovals

function setResignationOptions(arg0: any) {
    throw new Error("Function not implemented.")
}
