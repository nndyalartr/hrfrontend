import { Card, Col, Row, Modal, Select } from "antd";
import { Table, Button, Form, Input,Checkbox,DatePicker } from "antd";
import TopMenu from "../TopMenu";
import { useState } from "react";
import UserEditComp from "./UserEditComp";
import useUserRegistration from "../../QueryApiCalls/useUserRegistration";
const EditUserPage = (props:any) => {
  const [Usersearch] = Form.useForm();
  const [tabledata, settabledata] = useState<any>([]);
  const { TextArea } = Input;
  const [options , setOptions] = useState<any>({getApiEnabled:false})
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
  const loginFn = (values: any) => {
    console.log(values);
    settabledata([
      {
        id: "5c752592-3959-4b96-bd8e-81e1a334414g",
        emp_no: "T3352",
        emp_name: "rohit sharma",
        first_name: "rohit",
        last_name: "sharma",
        email_id: "dummy2@tharworx.com",
        father_name: "Dhoni",
        name_as_aadhar: "test name 2",
        emergency_contact_name: "Dummy",
        emergency_contact: "Dummy",
        aadhar_number: "353463",
        mobile_number: "7090089470",
        designation: "Exe AR",
        location: "",
        department: "Holiday Calendar - Bangalore Night Shift",
        permanent_address:
          "#607,Head Bandar Road,kumta, Uttara kannada, Karnataka -581343",
        temporary_address:
          "#607,Head Bandar Road,kumta, Uttara kannada, Karnataka -581343",
        date_of_joining: "2023-08-15",
        date_of_birth: "1999-06-09",
        gender: "Male",
        pan: "Dummy",
        maritial_status: "Single",
        ctc: "Dummy",
        is_pf_eligible: true,
        is_esi_eligible: true,
        is_night_shift: false,
        blood_group: "O+ve",
        project_name: "Xifin",
        role: "Employee",
        user_id: "0c561422-617b-482d-b9e1-4005654c7f5g",
      },
      {
        id: "5c752592-3959-4b96-bd8e-81e1a334414g",
        emp_no: "T3352",
        emp_name: "rohit sharma",
        first_name: "rohit",
        last_name: "sharma",
        email_id: "dummy2@tharworx.com",
        father_name: "Dhoni",
        name_as_aadhar: "test name 2",
        emergency_contact_name: "Dummy",
        emergency_contact: "Dummy",
        aadhar_number: "353463",
        mobile_number: "7090089470",
        designation: "Exe AR",
        location: "",
        department: "Holiday Calendar - Bangalore Night Shift",
        permanent_address:
          "#607,Head Bandar Road,kumta, Uttara kannada, Karnataka -581343",
        temporary_address:
          "#607,Head Bandar Road,kumta, Uttara kannada, Karnataka -581343",
        date_of_joining: "2023-08-15",
        date_of_birth: "1999-06-09",
        gender: "Male",
        pan: "Dummy",
        maritial_status: "Single",
        ctc: "Dummy",
        is_pf_eligible: true,
        is_esi_eligible: true,
        is_night_shift: false,
        blood_group: "O+ve",
        project_name: "Xifin",
        role: "Employee",
        user_id: "0c561422-617b-482d-b9e1-4005654c7f5g",
      },
    ]);
  };
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [record, setRecord] = useState<any>({});
  const hhhh = (record: any) => {
    console.log(record);
    setRecord(record);
    setModelOpen(true);
  };
  console.log(modelOpen);
  const columns: any = [
    {
      title: "Start Date",
      dataIndex: "email_id",
      key: "startDate",
    },
    {
      title: "action",
      dataIndex: "",
      key: "actionn",
      render: (record: any, item: any) => {
        console.log(record);
        return (
          <>
            <Button
              onClick={() => {
                hhhh(record);
              }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <TopMenu />
      <Row className="me-5 mt-3" justify="start">
        <Col span={6}>
          <Card size="small" title="">
            <Form className="" form={Usersearch} onFinish={loginFn}>
              <Form.Item name="Text" label="Email">
                <Input placeholder="enter Email Id" />
              </Form.Item>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            rowKey={(record: any) => record.id}
            dataSource={tabledata || []}
            columns={columns}
          />
        </Col>
      </Row>
      {modelOpen && (
        <Modal
          open={modelOpen}
          onCancel={() => {
            setModelOpen(false);
          }}
        //   bodyStyle={{ overflow: "auto", maxHeight: "calc(100vh - 200px" }}
          title="User search"
        >
          <UserEditComp props={record} />
          <Form
                className=""
                form={Usersearch}
                onFinish={loginFn}
                initialValues={props.props}
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
        </Modal>

        
      )}
    </>
  );
};
export default EditUserPage;
