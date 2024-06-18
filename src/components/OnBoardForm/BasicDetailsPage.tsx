import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import "./onboard.css"
interface Props {
    setActiveTabKey: (key: string) => void;
    id: string,
    name: string
}
const BasicDetailsUploadPage: React.FC<Props> = ({ setActiveTabKey, name, id }) => {
    const [filterForm] = Form.useForm()
    const { TextArea } = Input;
    const filterSearch = (values: any) => {
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value === undefined ? '' : value])
        );
    }
    const genderOptions = [
        { lable: "Male", key: "Male", value: "Male" },
        { lable: "Female", key: "Female", value: "Female" }
    ]
    return (<>
        <h5 className='text_left'>Hi {name} , Basic Details Form</h5>
        <Form
            form={filterForm}
            className=""
            initialValues={{ remember: true }}
            onFinish={filterSearch}
        >
            <Row gutter={16} className="ms-4 me-4 mt-2">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="First Name"
                        name="f_name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Last Name"
                        name="l_name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[{ required: true, message: 'Please Select Date' }]}
                    >
                        <DatePicker format="YYYY-MM-DD"
                            style={{ width: "100%" }}
                            placeholder="Select Date"
                            disabledDate={(current) => current && current > moment().endOf('day')} />
                    </Form.Item>

                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Please Select Type" options={genderOptions} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Personel Contact Number"
                        name="contact_number"
                        rules={[{ required: true }, {
                            pattern: /^[0-9]{10}$/,
                            message: 'Contact number must be exactly 10 digits long and only contain numbers!',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Personel Email ID"
                        name="email"
                        rules={[{ required: true }, { type: 'email', message: 'The input is not valid email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Blood Group"
                        name="blood_group"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                        label="Emergency Contact Number"
                        name="emg_contact_number"
                        rules={[{ required: true }, {
                            pattern: /^[0-9]{10}$/,
                            message: 'Contact number must be exactly 10 digits long and only contain numbers!',
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                        label="Name of Emergency Contact Person"
                        name="emg_contact_name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                        label="Nationality"
                        name="nationality"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Martial Status"
                        name="martial_status"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Date of Marriage"
                        name="dom"
                        rules={[{ required: false }]}
                    >
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} placeholder="Select Date"
                            disabledDate={(current) => current && current > moment().endOf('day')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Spouse Name"
                        name="spouse_name"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="No of Children"
                        name="no_of_children"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Father Name"
                        name="father_name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Religion"
                        name="religion"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                        label="Permanent Address"
                        name="permanent_address"
                        rules={[{ required: true }]}
                    >
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Area"
                        name="permanent_area"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="District"
                        name="permanent_district"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="State"
                        name="permanent_state"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Pincode"
                        name="permanent_pincode"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                        label="Present Address"
                        name="present_address"
                        rules={[{ required: true }]}
                    >
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Area"
                        name="present_area"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="District"
                        name="present_district"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-1">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="State"
                        name="present_state"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Pincode"
                        name="present_pincode"
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
    </>)
}
export default BasicDetailsUploadPage