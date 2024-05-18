import { Col, Row, Form, Input, Button, DatePicker } from "antd"
import TopMenu from "../TopMenu"
import { useState } from "react"
import { OnBoardUser } from "../../interfaces/types"
import useCreateOnboardUser from "../../QueryApiCalls/useCreateOnboardUser"
import { AxiosError, AxiosResponse } from "axios"
import moment from "moment"

const OnBoardRequest = () => {
    const [preOnBoardForm] = Form.useForm()
    const [apiData, setApiData] = useState<OnBoardUser>({ email: "", name: "", ctc: "", location: "", designation: "", getApiEnabled: false, doj: "", type: "POST" })
    const onSubmit = (values: any) => {
        const doj = moment(values.doj.$d).format("YYYY-MM-DD")
        setApiData({
            ...apiData, ctc: values.ctc,
            location: values.location,
            email: values.email,
            name: values.name,
            designation: values.designation,
            doj: doj,
            getApiEnabled: true
        })
    }
    const onSuccess = (res: AxiosResponse) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${apiData.name}.pdf`); // Set the desired file name here
        document.body.appendChild(link);
        link.click();
        console.log(res.data)
        setApiData({ ...apiData, getApiEnabled: false })
    }
    const onError = (err: AxiosError) => {
        setApiData({ ...apiData, getApiEnabled: false })
    }
    useCreateOnboardUser(apiData, onSuccess, onError)
    return <>
        <TopMenu />
        <Form
            className=""
            form={preOnBoardForm}
            onFinish={onSubmit}
        >
            <Row gutter={16} className="m-3">
                <Col span={8}>
                    <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="doj" label="Date of joining" rules={[{ required: true }]}>
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="m-4" gutter={16}>
                <Col span={6}>
                    <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="ctc" label="Annual CTC" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Col>
            </Row>

        </Form>
        <Row>
            <Col>
            </Col>
        </Row>
    </>
}
export default OnBoardRequest