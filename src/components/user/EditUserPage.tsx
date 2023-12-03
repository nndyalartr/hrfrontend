import { Card, Col, Row, Modal, Select, Tag } from "antd";
import { Table, Button, Form, Input, } from "antd";
import { EditOutlined } from '@ant-design/icons';
import TopMenu from "../TopMenu";
import { useEffect, useState } from "react";
import useSearchUser from "../../QueryApiCalls/useSearchUser";
import { UserInfoStore } from "../../utils/useUserInfoStore";
import UserEditComp from "./UserEditComp";
import moment from "moment";
const EditUserPage = () => {
    const [Usersearch] = Form.useForm();
    const [tabledata, settabledata] = useState<any>([]);
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<{ getApiEnabled: boolean, userEmail: string, project: string }>({ getApiEnabled: false, userEmail: "", project: "" })
    const [count,setCount] = useState<number>(0)
    useEffect(()=>{
        setOptions({...options,getApiEnabled:true})
    },[])
    const loginFn = (values: any) => {
        setOptions({ getApiEnabled: true, userEmail: values.text, project: values.project })

    };
    const [modelOpen, setModelOpen] = useState<boolean>(false);
    const [record, setRecord] = useState<any>({});
    const searchUserFn = (rec: any) => {
        setRecord({ ...rec, date_of_joining: moment(rec.date_of_joining), date_of_birth: moment(rec.date_of_birth) });
        setModelOpen(true);
        Usersearch.resetFields()
        settabledata([])
    };
    const columns: any = [
        {
            title: "Employe ID",
            dataIndex: "emp_no",
            key: "emp_no",
            width: 100
        },

        {
            title: "Employe Name",
            dataIndex: "emp_name",
            key: "emp_name",
            width: 150
        },
        {
            title: "Date Of Joining",
            dataIndex: "date_of_joining",
            key: "date_of_joining",
            width: 150,
            render: (date_of_joining: string) => {
                if (date_of_joining) {
                    const formattedDate = moment(date_of_joining, 'YYYY MM DD').format('Do MMMM YYYY');
                    return (formattedDate)
                } else {
                    return ("Not Available")
                }
            }
        },
        {
            title: "Date Of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
            width: 150,
            render: (date_of_birth: string) => {
                if (date_of_birth) {
                    const formattedDate = moment(date_of_birth, 'YYYY MM DD').format('Do MMMM YYYY');
                    return (formattedDate)
                } else {
                    return ("Not Available")
                }
            }
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
            width: 130
        },
        {
            title: "Email Id",
            dataIndex: "email_id",
            key: "email_id",
            width: 150
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            width: 100
        },
        {
            title: "Phone No",
            dataIndex: "mobile_number",
            key: "mobile_number",
            width: 120
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            width: 100
        },
        {
            title: "Project",
            dataIndex: "project_name",
            key: "project_name",
            width: 100
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            width: 100,
            render: (loc: string) => {
                if (loc !== "") {
                    return (<span>{loc}</span>)
                } else {
                    return (<span>N/A</span>)
                }
            }
        },
        {
            title: "Name as AADHAR",
            dataIndex: "name_as_aadhar",
            key: "name_as_aadhar",
            width: 150
        },
        {
            title: "AADHAR No",
            dataIndex: "aadhar_number",
            key: "aadhar_number",
            width: 150
        },
        {
            title: "PAN No",
            dataIndex: "pan",
            key: "pan",
            width: 100
        },
        {
            title: "Martial Status",
            dataIndex: "maritial_status",
            key: "maritial_status",
            width: 100
        },
        {
            title: "Emergency Contact No",
            dataIndex: "emergency_contact",
            key: "emergency_contact",
            width: 150
        },
        {
            title: "Emergency Contact Person",
            dataIndex: "emergency_contact_name",
            key: "emergency_contact_name",
            width: 150
        },
        {
            title: "Blood Group",
            dataIndex: "blood_group",
            key: "blood_group",
            width: 120
        },
        {
            title: "Is ESI Eligible",
            dataIndex: "is_esi_eligible",
            key: "is_esi_eligible",
            width: 150,
            render: (isAvailable: boolean) => {
                if (isAvailable) {
                    return (<span>Yes</span>)
                } else {
                    return (<span>NO</span>)
                }
            }
        },
        {
            title: "Is PF Eligible",
            dataIndex: "is_pf_eligible",
            key: "is_pf_eligible",
            width: 150,
            render: (isAvailable: boolean) => {
                if (isAvailable) {
                    return (<span>Yes</span>)
                } else {
                    return (<span>NO</span>)
                }
            }
        },
        {
            title: "Shift",
            dataIndex: "is_night_shift",
            key: "is_night_shift",
            width: 120,
            render: (shift: boolean) => {
                if (shift) {
                    return (<span>Day Shift</span>)
                } else {
                    return (<span>Night Shift</span>)
                }
            }
        },
        {
            title: "CTC",
            dataIndex: "ctc",
            key: "ctc",
            width: 120,
        },
        {
            title: "Present Address",
            dataIndex: "permanent_address",
            key: "permanent_address",
            width: 300
        },
        {
            title: "Permanent Address",
            dataIndex: "temporary_address",
            key: "temporary_address",
            width: 300
        },
        {
            title: "Action",
            dataIndex: "",
            key: "actionn",
            fixed: "right",
            width: 100,
            render: (record: any, item: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            searchUserFn(record);
                        }} type="primary" icon={<EditOutlined />}></Button>

                    </>
                );
            },
        },
    ];
    const onSuccess = (res: any) => {
        setOptions({ ...options, getApiEnabled: false })
        settabledata(res.data)
        setCount(res.data.length)
    }
    const onError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
    }
    const { refetch } = useSearchUser(options, onSuccess, onError)
    const onClear =()=>{
        Usersearch.resetFields()
        setOptions({ ...options,userEmail:"",project:"", getApiEnabled: true })
    }
    return (
        <>
            <TopMenu />

            <Form className="" form={Usersearch} onFinish={loginFn}>
                <Row className="me-5 m-3" justify="space-between" gutter={16}>
                    <Col span={6}>

                        <Form.Item name="text" label="Search User">
                            <Input placeholder="enter name / ID" />
                        </Form.Item>


                    </Col>
                    <Col span={6}>
                        <Form.Item name="project" label="Search By Project">
                            <Input placeholder="enter project" />

                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                        <Button className="ms-3" type="primary" onClick={()=>{onClear()}}>
                            Clear
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Tag color="green">User Count : {count}</Tag>
                    </Col>
                </Row >
            </Form >

            <Row>
                <Col span={24}>
                    <Table
                        scroll={{ x: 800 }}
                        rowKey={(record: any) => record.id}
                        dataSource={tabledata || []}
                        columns={columns}
                    />
                </Col>
            </Row>
            {
                modelOpen && (
                    <Modal
                        style={{ minWidth: '900px' }}
                        open={modelOpen}
                        onCancel={() => {
                            setModelOpen(false);
                        }}
                        footer={null}
                        bodyStyle={{ overflow: "auto", maxHeight: "calc(100vh - 200px" }}
                        title="User Edit"
                    >
                        <UserEditComp props={{ record, setModelOpen }} />
                    </Modal>


                )
            }
        </>
    );
};
export default EditUserPage;
