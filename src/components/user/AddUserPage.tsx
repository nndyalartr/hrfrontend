import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, message } from "antd"
import TopMenu from "../TopMenu"
import moment from "moment";
import { useState } from "react";
import useUserRegistration from "../../QueryApiCalls/useUserRegistration";
export const designationOptions =[
    {
        label: "Accounts Executive",
        key: "AccountsExecutive",
        value: "AccountsExecutive"
    },
    {
        label: "Assistant Ligtning Designer",
        key: "AsstLigtningDesigner",
        value: "AsstLigtningDesigner"
    },
    {
        label: "Assistant Manager - Design",
        key: "A.MDesign",
        value: "A.MDesign"
    },
    {
        label: "Assistant Manager - Finanace",
        key: "A.MFinance",
        value: "A.MFinance"
    },
    {
        label: "Assosiate Director",
        key: "A.D",
        value: "A.D"
    },
    {
        label: "Assistant Manager - Logistics",
        key: "A.MLogistics",
        value: "A.MLogistics"
    },
    {
        label: "Design Lead",
        key: "Design Lead",
        value: "Design Lead"
    },
    {
        label: "Executive - Store",
        key: "ExecutiveStore",
        value: "ExecutiveStore"
    },
    {
        label: "Manager - Design",
        key: "ManagerDesign",
        value: "ManagerDesign"
    },
    {
        label: "Manager - HR",
        key: "ManagerHR",
        value: "ManagerHR"
    },
    {
        label: "Purchase - Executive",
        key: "PurchaseExe",
        value: "PurchaseExe"
    },
    {
        label: "Sales - Executive",
        key: "SalesExecutive",
        value: "SalesExecutive"
    },
    {
        label: "Sales - Manager",
        key: "SalesManager",
        value: "SalesManager"
    },
    {
        label: "Service - Technician",
        key: "ServiceTech",
        value: "ServiceTech"
    },
    {
        label: "Technician",
        key: "Technician",
        value: "Technician"
    },
    {
        label: "Office - Assistant",
        key: "OfficeAsst",
        value: "OfficeAsst"
    },
    {
        label: "CEO",
        key: "CEO",
        value: "CEO"
    },
    {
        label: "COO",
        key: "COO",
        value: "COO"
    }
]
export const roleOptions = [
    {
        label: "Employee",
        key: "Employee",
        value: "Employee"
    },
    {
        label: "Manager",
        key: "manager",
        value: "Manager"
    },
    {
        label: "HR",
        key: "HR",
        value: "HR"
    }
]
export const genderOptions = [
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
export const mariatialStatusOptions = [
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
export const departmentOptions = [
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
        setOptions(apiObj)
    }
    const onSuccess = (res: any) => {
        userAddForm.resetFields()
        message.success("Successfully Added USer")
        setOptions({ ...options, getApiEnabled: false })

    }
    const onError = (err: any) => {
        message.error("Something Went Wrong")
        setOptions({ ...options, getApiEnabled: false })
        console.log("err")
    }
    const { refetch } = useUserRegistration(options, onSuccess, onError)

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
                        <Form.Item name="maritial_status" label="Martial Status">
                            <Select placeholder="Please Select Type" options={mariatialStatusOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="ctc" label="CTC">
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