import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Switch, Table } from "antd";
import axios from "axios";
import TopMenu from "../TopMenu";
import { useEffect, useState } from "react";
import moment from "moment";
import { UserInfoStore } from "../../utils/useUserInfoStore";
import useCreateorGetEvents from "../../QueryApiCalls/useEventDetails";
import { Events } from "../../interfaces/types";


const EventsPage = () => {
    const [eventsForm] = Form.useForm()
    const loggedInUserDetails = UserInfoStore()?.loggedUserInfo.value
    const [options, setOptions] = useState<Events>({ date: "", type: "", getApiEnabled: false, name: "", shift: "", eventType: "" })
    const [events, setEvents] = useState([])
    useEffect(() => {
        setOptions({ date: "", type: "GET", getApiEnabled: true, name: "", shift: "", eventType: "" })
    }, [])
    const addEvent = (values: any) => {
        let pp = moment(values.date.$d).format("YYYY-MM-DD")
        let reqObj = { date: pp, type: "POST", getApiEnabled: true, name: values.desc, shift: values.shift, eventType: values.type }
        setOptions(reqObj)
        eventsForm.resetFields()
        setTimeout(() => {
            setOptions({ ...reqObj, type: "GET" })
        }, 300)
    }
    const onEventSuccess = (res: any) => {
        if (options.type == "GET") {
            setEvents(res.data)
        }
        setOptions({ ...options, type: "", getApiEnabled: false })

    }
    const onEventError = (err: any) => {
        setOptions({ ...options, getApiEnabled: false })
        console.log("err")
    }
    const { refetch } = useCreateorGetEvents(options, onEventSuccess, onEventError)
    const initialValues = {
        type: "Holiday",
        shift: "ALLShifts",
        date: "",
        desc: ""
    }
    const eventOptions = [
        {
            label: "Holiday",
            key: "1",
            value: "Holiday"
        },
        {
            label: "Event",
            key: "2",
            value: "Event"
        }
    ]
    const shiftOptions = [
        {
            label: "Both Shifts",
            key: "1",
            value: "ALLShifts",
            default: true
        },
        {
            label: "Day Shift",
            key: "2",
            value: "Day",
        },
        {
            label: "Night Shift",
            key: "3",
            value: "Night"
        }
    ]
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Event Type",
            dataIndex: "event_type",
            key: "event_type"
        },
        {
            title: "Shift",
            dataIndex: "shift",
            key: "shift"
        }
    ]
    return (
        <>
            <TopMenu />
            {loggedInUserDetails.user_role == "HR" ? <Form
                className=""
                form={eventsForm}
                initialValues={initialValues}
                onFinish={addEvent}
            >
                <h4>Add Event</h4>
                <Row gutter={8} className="ms-2 me-2">
                    <Col span={6}>
                        <Form.Item name="type" label="Event Type" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Type" options={eventOptions} />
                        </Form.Item>

                    </Col>
                    <Col span={6}>
                        <Form.Item name="shift" label="Shift Select" rules={[{ required: true }]}>
                            <Select placeholder="Please Select Shift" options={shiftOptions} />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={8} className="ms-2 me-2">
                    <Col span={6}>
                        <Form.Item name="date" label="Event Date" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" style={{ width: "200px" }} placeholder="Please Select Event Date" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="desc" label="Event Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button htmlType="submit" type="primary">Create Event</Button>
                    </Col>
                </Row>
            </Form> : <></>}

            <Row>
                <Col span={24}>
                    <Table rowKey={(record: any) => record.id} dataSource={events || []} columns={columns} />
                </Col>

            </Row>
        </>
    )
}
export default EventsPage;