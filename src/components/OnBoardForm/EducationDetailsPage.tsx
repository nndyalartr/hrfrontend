import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import "./onboard.css"
interface Props {
    setActiveTabKey: (key: string) => void;
    id: string,
    name: string
}
const EducationDetailsPage: React.FC<Props> = ({ setActiveTabKey, name, id }) => {
    const [educationDetailsForm] = Form.useForm()
    const formSubmit = (values: any) => {
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value === undefined ? '' : value])
        );
        console.log(sanitizedValues)
    }
    return (<>
        <>
            <h4 className="text_left">Hi {name}, Please Update Educational Details</h4>
            <Form
                form={educationDetailsForm}
                className=""
                initialValues={{ remember: true }}
                onFinish={formSubmit}
            >
                <h6  className="text_left text-secondary"> Schooling Details</h6>
                <Row gutter={16} className="ms-4 me-4 mt-2">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="School Name"
                            name="school_name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Passing Year"
                            name="school_pass_year"
                            rules={[{ required: true }, {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject(new Error('Please input the passing year'));
                                    }
                                    if (!/^\d{4}$/.test(value)) {
                                        return Promise.reject(new Error('Passing year must be a 4-digit number'));
                                    }
                                    return Promise.resolve();
                                },
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Percentage"
                            name="school_percentage"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Division"
                            name="school_division"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <hr></hr>
                <h6  className="text_left text-secondary"> 12<sup>th</sup> / Diplamo Details</h6>
                <Row gutter={16} className="ms-4 me-4 mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="College Name"
                            name="diplamo_collage_name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Passing Year"
                            name="diplamo_passing_year"
                            rules={[{ required: true }, {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject(new Error('Please input the passing year'));
                                    }
                                    if (!/^\d{4}$/.test(value)) {
                                        return Promise.reject(new Error('Passing year must be a 4-digit number'));
                                    }
                                    return Promise.resolve();
                                },
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Percentage"
                            name="diplamo_passing_year"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Division"
                            name="diplamo_division"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <hr></hr>
                <h6  className="text_left text-secondary"> Under Graduation Details</h6>
                <Row gutter={16} className="ms-4 me-4 mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="College Name"
                            name="ug_collage_name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Passing Year"
                            name="ug_passing_year"
                            rules={[{ required: true }, {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject(new Error('Please input the passing year'));
                                    }
                                    if (!/^\d{4}$/.test(value)) {
                                        return Promise.reject(new Error('Passing year must be a 4-digit number'));
                                    }
                                    return Promise.resolve();
                                },
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Percentage"
                            name="ug_passing_year"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Division"
                            name="ug_division"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <hr></hr>
                <h6  className="text_left text-secondary"> Post Graduation Details</h6>
                <Row gutter={16} className="ms-4 me-4 mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="College Name"
                            name="pg_collage_name"
                            rules={[{ required: false }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Passing Year"
                            name="pg_passing_year"
                            rules={[{ required: false }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Percentage"
                            name="pg_passing_year"
                            rules={[{ required: false }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Division"
                            name="pg_division"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="ms-4 me-4 mt-2">
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
    </>)
}
export default EducationDetailsPage;