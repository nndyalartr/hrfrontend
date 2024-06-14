import TopMenu from "../TopMenu"
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Table, Tag, Typography } from 'antd';
import moment from "moment";
import useCreatePreOnBoard from "../../QueryApiCalls/useCreatePreOnBoardUser";
import { PreOnBoard } from "../../interfaces/types";
import { AxiosError, AxiosResponse } from "axios";
import { stat } from "fs";
const OnBoardingInitiation = () => {
    const { Text } = Typography;
    const [filterForm] = Form.useForm()
    const [options, setOptions] = useState<PreOnBoard>({ type: "POST", getApiEnabled: false, email: "", name: "", designation: "", mobile: "", doj: "", dob: "" })
    const [data, setData] = useState<any>([])
    const filterSearch = (values: any) => {
        let dob = moment(values.dob.$d).format("YYYY-MM-DD")
        let doj = moment(values.doj.$d).format("YYYY-MM-DD")
        setOptions({ ...options, type: "POST", email: values.email, getApiEnabled: true, name: values.name, designation: values.designation, mobile: values.mobile, doj: doj, dob: dob })

    }
    useEffect(() => {
        setOptions({ type: "GET", getApiEnabled: true, email: "", name: "", designation: "", mobile: "", doj: "", dob: "" })
    }, [])
    const onSuccess = (res: AxiosResponse) => {
        filterForm.resetFields()
        if (options.type == "POST") {
            setOptions({ type: "GET", getApiEnabled: true, email: "", name: "", designation: "", mobile: "", doj: "", dob: "" })
        }
        if (options.type == "GET") {
            setData(res.data)
        }
        setOptions({ type: "", getApiEnabled: false, email: "", name: "", designation: "", mobile: "", doj: "", dob: "" })
    }
    const onError = (err: AxiosError) => {
        filterForm.resetFields()
        setOptions({ type: "", getApiEnabled: false, email: "", name: "", designation: "", mobile: "", doj: "", dob: "" })
    }
    useCreatePreOnBoard(options, onSuccess, onError)
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Date Of Birth",
            dataIndex: "dob",
            key: "dob",
            render: (date: string) => {
                return (
                    <span>{moment(date).format('Do MMMM, YYYY')}</span>
                )
            }
        },
        {
            title: "Date Of Joining",
            dataIndex: "doj",
            key: "doj",
            render: (date: string) => {
                return (
                    <span>{moment(date).format('Do MMMM, YYYY')}</span>
                )
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation"
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status:string) => {
                if (status ) {
                    let statusArray = status.split("|").filter(x => x.trim() !== '');
                    return (
                        <>
                            {statusArray.map((x:string, index) => (
                                <Tag key={index}>{x.trim()}</Tag>
                            ))}
                        </>
                    );
                } else {
                    return <span>Not Initiated</span>;
                }
            }
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
            render: (text: string) => <Text copyable>{text}</Text>
        },
    ]
    return (
        <>
            <TopMenu />
            <Form
                form={filterForm}
                className=""
                initialValues={{ remember: true }}
                onFinish={filterSearch}
            >
                <Row gutter={16} className="ms-4 me-4 mt-2">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Designation"
                            name="designation"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Phone Number"
                            name="mobile"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="ms-4 me-4 mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Date of Birth"
                            name="dob"
                            rules={[{ required: true, message: 'Please Select Date' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Select Date" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Date of Joining"
                            name="doj"
                            rules={[{ required: true, message: 'Please Select Date' }]}
                        >
                            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Select Date" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-100">
                                Create
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table rowKey={(record: any) => record.id} dataSource={data} columns={columns} scroll={{ x: 'max-content' }} />
        </>
    )
}
export default OnBoardingInitiation