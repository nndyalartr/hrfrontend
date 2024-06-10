import { AxiosError, AxiosResponse } from "axios";
import TopMenu from "../TopMenu"
import { Button, Card, Col, Form, Input, Row, Select, Table, message } from "antd";
import { UserInfoStore } from "../../utils/useUserInfoStore";
import { useEffect, useState } from "react";
import useCreateItTicket from "../../QueryApiCalls/useCreateItTicket";
import { ItTicketCreate } from "../../interfaces/types";
import useGetTicketList from "../../QueryApiCalls/useGetTicketsList";
import useUpdateTicket from "../../QueryApiCalls/useUpdateTicket";
const RaiseTicket = () => {
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value
    const isItPerson = loggedInUserDetails.user_role === "IT" ? true : false
    const [ItSupprtForm] = Form.useForm()
    const [tickets, setTickets] = useState([])
    const [options, setOptions] = useState<ItTicketCreate>({ type: "POST", getApiEnabled: false, created_by: loggedInUserDetails.user_email, title: "", desc: "" })
    const [getOptions, setGetOptions] = useState<{ getApiEnabled: boolean, email: string }>({ getApiEnabled: false, email: loggedInUserDetails.user_email })
    const [patchTicket, setPatchTicket] = useState<{ getApiEnabled: boolean, id: string }>({ getApiEnabled: false, id: "" })
    const closeTicket = (id: string) => {
        setPatchTicket({ id: id, getApiEnabled: true })
    }
    const columns = [
        {
            title: "Ticket ID",
            dataIndex: "ticket_no",
            key: "ticket_no",
        },
        {
            title: "Created At",
            dataIndex: "created_time",
            key: "created_time",
            render: (text: string) => {
                const localTime = new Date(text).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                return (<>
                    {localTime}
                </>)
            }
        },
        {
            title: "Created By",
            dataIndex: "raised_by__first_name",
            key: "raised_by__first_name",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status"
        },
        {
            title: "Closed Time",
            dataIndex: "closed_time",
            key: "closed_time",
            render: (time: any) => {
                if (time) {
                    const localTime = new Date(time).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return (<>
                        {localTime}
                    </>)
                } else {
                    return (<>N/A</>)
                }
            }
        },
        ...(isItPerson
            ? [
                {
                    title: "Action",
                    dataIndex: "action",
                    key: "action",
                    render: (text: any, record: any) => {
                        // Conditionally render the button based on status
                        if (record.status === "Pending") {
                            return <Button onClick={() => closeTicket(record.id)}>Close Issue</Button>;
                        }
                        return <>Completed</>; // Return null if the condition is not met
                    }
                }
            ]
            : []
        )
    ]
    const filterSearch = (values: any) => {
        setOptions({ ...options, getApiEnabled: true, title: values.title, desc: values.description })
    }
    const onSuccess = (res: AxiosResponse) => {
        setOptions({ ...options, getApiEnabled: false })
        setGetOptions({ ...getOptions, getApiEnabled: true })
        if (res.status === 200) {
            message.success("Successfully Raised Ticket")
        }
        else {
            message.error("Something went wrong")
        }
    }
    const onError = (err: AxiosError) => {
        setOptions({ ...options, getApiEnabled: false })
        setGetOptions({ ...getOptions, getApiEnabled: true })
    }
    useEffect(() => {
        setGetOptions({ ...getOptions, getApiEnabled: true })
    }, [])
    const onListSuccess = (res: AxiosResponse) => {
        setGetOptions({ ...getOptions, getApiEnabled: false })
        setTickets(res.data)
    }
    const onListError = (err: AxiosError) => {
        setGetOptions({ ...getOptions, getApiEnabled: false })
    }
    const onEditSuccess = (res: AxiosResponse) => {
        setPatchTicket({ ...patchTicket, getApiEnabled: false })
        setGetOptions({ ...getOptions, getApiEnabled: true })
    }
    const onEditError = (err: AxiosError) => {
        setPatchTicket({ ...patchTicket, getApiEnabled: false })
        setGetOptions({ ...getOptions, getApiEnabled: true })
    }
    useGetTicketList(getOptions, onListSuccess, onListError)
    useCreateItTicket(options, onSuccess, onError)
    useUpdateTicket(patchTicket, onEditSuccess, onEditError)
    return (
        <>
            <TopMenu />
            <Form
                className=""
                form={ItSupprtForm}
                onFinish={filterSearch}
            >
                <h4>IT Support</h4>
                <Row gutter={16} className="m-4">
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Form.Item name="title" label="Title" rules={[
                            {
                                required: true
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Form.Item name="description" label="Description" rules={[
                            {
                                required: true,
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Button htmlType="submit" type="primary">Submit</Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={tickets || []} columns={columns} scroll={{ x: 'max-content' }}/>
                </Col>

            </Row>
        </>
    )
}
export default RaiseTicket