import { useEffect, useState } from "react"
import { UserInfoStore } from "../../utils/useUserInfoStore"
import TopMenu from "../TopMenu"
import useGetMyDetails from "../../QueryApiCalls/useGetMyDetails"
import { Button, Col, DatePicker, Form, Input, Row, Table, message } from "antd"
import moment from "moment"
import { ApplyAdvance, ApplyResignation } from "../../interfaces/types"
import useApplyResignation from "../../QueryApiCalls/useApplyResignation"
import useApplyAdvance from "../../QueryApiCalls/useApplyAdvance"
import useApplyAdvanceGet from "../../QueryApiCalls/useApplyAdvanceGet"
import { AxiosError, AxiosResponse } from "axios"

const AdvanceRequestPage = () => {
    const [advanceForm] = Form.useForm()
    const { TextArea } = Input;
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string }>({ getApiEnabled: false, userEmail: "" })
    const [getOptions, setGetOptions] = useState<{ getApiEnabled: boolean, userEmail: string }>({ getApiEnabled: false, userEmail: "" })
    const [userData, setUserData] = useState<any>({})
    const [tableData, setTableData] = useState<any>([])
    useEffect(() => {
        setGetOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true })
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
        advanceForm.setFieldsValue(initialValues);
    }, [initialValues, advanceForm]);
    const { refetch } = useGetMyDetails(options, onSuccess, onError)

    const [advanceOptions, setAdvanceOptions] = useState<ApplyAdvance>({
        type: "",
        getApiEnabled: false, advance_date: "",
        personal_phone_no: "",
        personal_mail_id: initialValues.personalEmailId,
        advance_reason: "",
        user_email: "",
        address: "",
        advance_amount: ""

    })
    const submitResignation = (values: any) => {
        let resDate = moment(values.advanceDate.$d).format("YYYY-MM-DD")
        setAdvanceOptions({
            type: "",
            getApiEnabled: true, advance_date: resDate,
            personal_phone_no: values.personalPhoneNo,
            personal_mail_id: values.personalEmailId,
            advance_reason: values.advanceReason,
            user_email: initialValues.presentMail,
            address: values.address,
            advance_amount: values.amount
        })
    }

    const onEventSuccess = (res: any) => {
        setAdvanceOptions({ ...advanceOptions, type: "", getApiEnabled: false })
        setGetOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: true })

    }
    const onEventError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        console.log("err")
    }
    const onGetAdvanceSuccess = (res:AxiosResponse)=>{
        setTableData(res.data)
        setGetOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false })
    }
    const onGetAdvanceError = (err:AxiosError)=>{
        setGetOptions({ userEmail: loggedInEmail.user_email, getApiEnabled: false })
    }
    useApplyAdvanceGet(getOptions, onGetAdvanceSuccess, onGetAdvanceError)
    useApplyAdvance(advanceOptions, onEventSuccess, onEventError)
    const columns = [
        {
            title: "Advance Date",
            dataIndex: "advance_date",
            key: "date"
        },
        {
            title: "Approver",
            dataIndex: "approver__first_name",
            key: "approver__first_name",
        },
        {
            title: "Reason for Advance",
            dataIndex: "advance_reason",
            key: "advance_reason"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        }

    ]
    return (
        <>
            <TopMenu />
            <Form
                className=""
                form={advanceForm}
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
                        <Form.Item name="advanceDate" label="Advance Needed On" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Please Select Advance Date" />
                        </Form.Item>
                        <Form.Item name="personalPhoneNo" label="Present Phone Number" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="advanceReason" label="Reason for Advance" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="personalEmailId" label="Personal Email ID" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="address" label="Permanent Address" rules={[{ required: true }]}>
                            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="amount" label="Advance Amount" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button htmlType="submit" type="primary">Submit</Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tableData || []} columns={columns} />
                </Col>
            </Row>
        </>
    )
}
export default AdvanceRequestPage