import { Button, Col, Row, Table, message } from "antd"
import useLeaveApproval from "../../QueryApiCalls/useLeaveApproval"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import { useEffect, useState } from "react"
import { LeaveApproval } from "../../interfaces/types"
import TopMenu from "../TopMenu"

const LeaveApprovalPage = () => {

    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<LeaveApproval>({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setOptions({ ...options, type: "GET", getApiEnabled: true })
    }, [])
    const onEventSuccess = (res: any) => {

        if (options.type == "GET") {
            setTableData(res.data)

        } else if(options.type == "PATCH"){
            message.success(res.data.message)
        }
         else {
            // message.success(res.data.message)
        }
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })

    }
    const onEventError = (err: any) => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false, type: "" })
        
    }
    const { refetch } = useLeaveApproval(options, onEventSuccess, onEventError)
    const approveFn =(id:string)=>{
        console.log(id)
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true, type: "PATCH",id:id,action:"approved" })
        setTimeout(()=>{
            setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true, type: "GET",id:"",action:"" })
        },300)
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
        title:"Action",
        dataIndex:"id",
        key:"id",
        render:(id:string)=>{
            let ids = id
            return(
                <>
            <Button onClick={()=>approveFn(ids)} className="me-2" type="primary">Approve</Button>
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
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} />
                </Col>

            </Row>
        </>
    )
}
export default LeaveApprovalPage