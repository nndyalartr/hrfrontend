import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd"
import TopMenu from "../TopMenu"
import moment from "moment";
import { useState } from "react";
import useUserRegistration from "../../QueryApiCalls/useUserRegistration";

const AddUserPage = () => {
    const [userAddForm] = Form.useForm()
    const { TextArea } = Input;
    const [options , setOptions] = useState<any>({getApiEnabled:false})
    const addUser = (values: any) => {
        let apiObj = {...values}
        let DOB =moment(values.date_of_birth.$d).format("YYYY-MM-DD")
        let DOJ = moment(values.date_of_joining.$d).format("YYYY-MM-DD")
        delete apiObj.date_of_birth
        delete apiObj.date_of_joining
        apiObj = {...apiObj,date_of_birth:DOB,date_of_joining:DOJ,getApiEnabled:true}
        console.log(apiObj)
        setOptions(apiObj)
    }
    const onSuccess = (res: any) => {
       
        setOptions({ ...options, getApiEnabled: false })

    }
    const onError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        console.log("err")
    }
    const { refetch } = useUserRegistration(options, onSuccess, onError)
    const designationOptions = [
        {
            label: "Executive",
            key: "executive",
            value: "Executive"
        },
        {
            label: "Manager",
            key: "manager",
            value: "Manager"
        }
    ]
    const genderOptions = [
        {
            label: "Male",
            key: "male",
            value: "Male"
        },
        {
            label: "Female",
            key: "female",
            value: "Female"
        },
        {
            label: "Others",
            key: "others",
            value: "Others"
        }]
    const mariatialStatusOptions = [
        {
            label: "Married",
            key: "married",
            value: "Married"
        },
        {
            label: "Single",
            key: "single",
            value: "Single"
        },
        {
            label: "Divorced",
            key: "divorced",
            value: "Divorced"
        }
    ]
    const departmentOptions = [
        {
            label: "HR",
            key: "hr",
            value: "HR"
        },
        {
            label: "SoftWare",
            key: "software",
            value: "Software"
        },
        {
            label: "Operations",
            key: "operations",
            value: "Operations"
        },
        {
            label: "Admin",
            key: "admin",
            value: "Admin"
        },
        {
            label: "IT",
            key: "it",
            value: "IT"
        },
        {
            label: "Financce",
            key: "finance",
            value: "Finance"
        }
    ]
    return (
        <>
            <TopMenu />
            <Form
                className=""
                form={userAddForm}
                onFinish={addUser}
            >
                <Row gutter={16} className="m-2">
                    <Col span={4}>
                        <Form.Item name="emp_id" label="Employee ID" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="emp_name" label="Employee Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="is_esi_eligible" valuePropName="checked" label="Is ESI Eligible" rules={[{ required: true }]}>
                            <Checkbox ></Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={8}>
                        <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="email" label="Email ID" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="father_name" label="Father Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={8}>
                        <Form.Item name="name_as_aadhar" label="Name as per Aadhar" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="emergency_contact_name" label="Emrg Contact Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="emergency_contact" label="Emrg Contact No" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={8}>
                        <Form.Item name="aadhar_number" label="AADHAR No" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="mobile_number" label="Mobile No" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={designationOptions} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={6}>
                        <Form.Item name="location" label="Location">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={departmentOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="date_of_birth" label="D.O.B" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select DOB" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={genderOptions} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={6}>
                        <Form.Item name="date_of_joining" label="Date Of Joining" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select DOJ" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="pan" label="P.A.N">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="martial_status" label="Martial Status">
                            <Select placeholder="Please Select Type" options={mariatialStatusOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="cts" label="CTC">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="m-2">
                    <Col span={12}>
                        <Form.Item name="permanent_address" label="Permanant Address" rules={[{ required: true }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit" type="primary">Submit</Button>

            </Form>
        </>
    )
}
export default AddUserPage