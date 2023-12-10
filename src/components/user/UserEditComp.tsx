
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react";
import { departmentOptions, designationOptions, genderOptions, mariatialStatusOptions } from "./AddUserPage";
import useEditUser from "../../QueryApiCalls/useUserEdit";
import moment from "moment";
import useLeaderList from "../../QueryApiCalls/useLeaderList";
const UserEditComp = (props: any) => {
    const [usersearch] = Form.useForm();
    const [options, setOptions] = useState<{ getApiEnabled: boolean, data:any ,id:string}>({ getApiEnabled: false, data:{},id:"" })
    const [leaderOptions, setleaderOptions] = useState<{ getApiEnabled: boolean}>({ getApiEnabled: false })
    const { TextArea } = Input;
    const [reportingToOptions , setreportingToOptions] = useState([])
    const [editUserData, setEditUserData] = useState<any>({})
    const editUser = (values: any) => {
        const userData = {...values}
        userData['date_of_birth'] = moment(values.date_of_birth.$d).format("YYYY-MM-DD")
        userData['date_of_joining'] = moment(values.date_of_joining.$d).format("YYYY-MM-DD")
        userData['id'] = props.props.record.user_id
        setEditUserData(userData)
        setOptions({getApiEnabled:true,data:userData,id:props.props.record.user_id})
    }
    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        props.props.setModelOpen(false)
        props.props.setOptions({ getApiEnabled: true, userEmail: "", project: "" })
    }
    const onError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
    }
    useEffect(()=>{
        setleaderOptions({...leaderOptions,getApiEnabled:true})
    },[])
    const onLeaderSuccess = (res: any) => {
        setreportingToOptions(res.data)
        setleaderOptions({...leaderOptions,getApiEnabled:true})
    }
    const onLeaderError = (err: any) => {
        setleaderOptions({...leaderOptions,getApiEnabled:true})
    }
    const {data} = useLeaderList(leaderOptions, onLeaderSuccess,onLeaderError)
    const { refetch } = useEditUser(options, onSuccess, onError)
    return (
        <>
            <Form
                className=""
                form={usersearch}
                onFinish={editUser}
                initialValues={props.props.record}
            >
                <Row gutter={16} className="m-2">
                    <Col span={8}>
                        <Form.Item name="emp_no" label="Employee ID" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item name="emp_name" label="Employee Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">

                    <Col span={16}>
                        <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="is_esi_eligible" valuePropName="checked" label="Is ESI Eligible" rules={[{ required: true }]}>
                            <Checkbox ></Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="email_id" label="Email ID" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="father_name" label="Father Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="name_as_aadhar" label="Name as per Aadhar" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="emergency_contact_name" label="Emrg Contact Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="emergency_contact" label="Emrg Contact No" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="aadhar_number" label="AADHAR No" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="mobile_number" label="Mobile No" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={designationOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="location" label="Location">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={departmentOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="date_of_birth" label="D.O.B" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select DOB" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">

                    <Col span={12}>
                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={genderOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="date_of_joining" label="Date Of Joining" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select DOJ" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="pan" label="P.A.N">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="maritial_status" label="Martial Status">
                            <Select placeholder="Please Select Type" options={mariatialStatusOptions} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="ctc" label="CTC">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="reporting_to" label="Reporting To">
                            <Select placeholder="Please Select Type" options={reportingToOptions} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={24}>
                        <Form.Item name="permanent_address" label="Permanant Address" rules={[{ required: true }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>

                <Button htmlType="submit" type="primary">Save</Button>

            </Form>

        </>

    );
}
export default UserEditComp;