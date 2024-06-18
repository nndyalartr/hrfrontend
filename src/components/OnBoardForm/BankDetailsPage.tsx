import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import "./onboard.css"
interface Props {
    setActiveTabKey: (key: string) => void;
    id: string,
    name: string
}
const BankDetailsPage: React.FC<Props> = ({ setActiveTabKey, name, id }) => {
    const [personalDetailsForm] = Form.useForm()
    const formSubmit = (values: any) => {
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value === undefined ? '' : value])
        );
        console.log(sanitizedValues)
    }
    return (
        <>
            <h4 className="text_left">Hi {name}, Please Update Personel Details</h4>
            <Form
                form={personalDetailsForm}
                className=""
                initialValues={{ remember: true }}
                onFinish={formSubmit}
            >
                <Row gutter={16} className="ms-4 me-4 mt-2">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Name as per Bank Acc"
                            name="name_as_per_bank"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Bank Name"
                            name="name_bank"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Branch"
                            name="branch_name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Place"
                            name="bank_place"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="ms-4 me-4 mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Account No"
                            name="bank_acc_no"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="IFSC Code"
                            name="ifsc_code"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-100">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default BankDetailsPage;