import { useEffect, useState } from "react"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import TopMenu from "../TopMenu"
import useGetMyDetails from "../../QueryApiCalls/useGetMyDetails"
import { Button, Col, DatePicker, Form, Input, Row, Table, message } from "antd"
import moment from "moment"
import { ApplyResignation } from "../../interfaces/types"
import useApplyResignation from "../../QueryApiCalls/useApplyResignation"

const UserResignation = () => {
    const [resignationForm] = Form.useForm()
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string }>({ getApiEnabled: false, userEmail: "" })
    const [userData, setUserData] = useState<any>({})
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true })

    }, [])
    const [initialValues, setInitialValues] = useState<any>({
        DOJ: "",
        empName: "",
        DOB: "",
        presentMail: "",
        resignationDate: "",
        resignationReason: "",
        personalEmailId: "",
        personalPhoneNo: ""

    })
    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        setUserData(res.data)
        setInitialValues({
            DOJ: res.data.date_of_joining,
            empName: res.data.emp_name,
            DOB: res.data.date_of_birth,
            presentMail: res.data.email_id,
            resignationDate: "",
            resignationReason: "",
            personalEmailId: "",
            personalPhoneNo: ""

        })
    }
    const onError = (err: any) => {
        console.log("err")
    }
    useEffect(() => {
        resignationForm.setFieldsValue(initialValues);
    }, [initialValues, resignationForm]);
    const { refetch } = useGetMyDetails(options, onSuccess, onError)

    const [resignationOptions, setResignationOptions] = useState<ApplyResignation>({
        type: "", getApiEnabled: false, resignation_date: "",
        personal_phone_no: "",
        personal_mail_id: initialValues.personalEmailId,
        resignation_reason: "",
        user_email: ""
    })
    useEffect(() => {
        setResignationOptions({ ...resignationOptions, type: 'GET',getApiEnabled:true,user_email:loggedInEmail.user_email })
    }, [])
    const submitResignation = (values: any) => {
        let resDate = moment(values.resignationDate.$d).format("YYYY-MM-DD")
        setResignationOptions({
            type: "POST", getApiEnabled: true, resignation_date: resDate,
            personal_phone_no: values.personalPhoneNo,
            personal_mail_id: values.personalEmailId,
            resignation_reason: values.resignationReason,
            user_email: values.presentMail
        })
    }

    const onEventSuccess = (res: any) => {
        if (resignationOptions.type === 'GET') {
            setTableData(res.data.data)
        } else {
            message.success("Resignation applied successfully")
        }
        setResignationOptions({ ...resignationOptions, type: "", getApiEnabled: false })

    }
    const onEventError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        console.log("err")
    }
    const { } = useApplyResignation(resignationOptions, onEventSuccess, onEventError)
    const columns = [
        {
            title: "Applied Date",
            dataIndex: "resignation_date",
            key: "date"
        },
        {
            title: "Approver",
            dataIndex: "approver",
            key: "approver",
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
            dataIndex: "exit_date",
            key: "DateOfExit",
        },

    ]
    return (
        <>
            <TopMenu />
            <Form
                className=""
                form={resignationForm}
                onFinish={submitResignation}
                initialValues={initialValues}
            >
                <Row className="m-3" gutter={16}>
                    <Col span={12}>
                        <Form.Item name="DOJ" label="Date of Joining">
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item name="empName" label="Name">
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item name="DOB" label="Date Of Birth">
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item name="presentMail" label="Present mail ID">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="resignationDate" label="Resignation Date" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Please Select Resignationt Date" />
                        </Form.Item>
                        <Form.Item name="personalPhoneNo" label="Present Phone Number" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="resignationReason" label="Reason for Resignation" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="personalEmailId" label="Personal Email ID" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit" type="primary">Submit</Button>
            </Form>
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} />
                </Col>
            </Row>
        </>
    )
}
export default UserResignation