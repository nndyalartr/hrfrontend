import { Card, Col, Row, Modal, Select } from "antd";
import { Table, Button, Form, Input } from "antd";
import TopMenu from "../TopMenu";
import { useState } from "react";
import UserEditComp from "./UserEditComp";
import moment from "moment";
const EditUserPage = () => {
  const [usersearch] = Form.useForm();
  const [tabledata, settabledata] = useState<any>([]);
 
    
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
        location: "Bangalore",
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
  const hhhh = (rec: any) => {
    console.log(rec);

    setRecord({...rec,date_of_joining:moment(rec.date_of_joining),date_of_birth:moment(rec.date_of_birth)});
    console.log("gfgdfr",record)
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
            <Form className="" form={usersearch} onFinish={loginFn}>
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
        <Modal   style={{minWidth: '900px' }}
          open={modelOpen}
          onCancel={() => {
            setModelOpen(false);
          }}
          bodyStyle={{overflow: "auto", maxHeight: "calc(100vh - 200px"}}
          title="Edit User"
        >
          <UserEditComp props={record} />
          
        </Modal>

        
      )}
    </>
  );
};
export default EditUserPage;
