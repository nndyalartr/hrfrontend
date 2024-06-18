import { Button, Col, DatePicker, Form, Input, Row, Select, message } from "antd";
import moment from "moment";
import "./onboard.css"
import { useState } from "react";
import { PreBoardFormDetails } from "../../interfaces/types";
import { AxiosError, AxiosResponse } from "axios";
import useGetPreBoardStatus from "../../QueryApiCalls/useGetPreBoardStatus";
import useCreatePreBoardDetails from "../../QueryApiCalls/useCreatePreBoardDetails";
interface Props {
    setActiveTabKey: (key: string) => void;
    id: string,
    name: string
}
const EducationDetailsPage: React.FC<Props> = ({ setActiveTabKey, name, id }) => {
    const [educationDetailsForm] = Form.useForm()
    const [isFormCopleted, setIsFormCompleted] = useState<boolean>(false)
    const [options, setOptions] = useState<PreBoardFormDetails>({type:"POST",data_type:"education_details",id:id,data:{},getApiEnabled:false,})
    const [preBoardOptions,setPreBoardOptions] = useState<{id:string,getApiEnabled:boolean}>({id:id,getApiEnabled:false})
    const formSubmit = (values: any) => {
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value === undefined ? '' : value])
        );
        setOptions({...options,data:sanitizedValues,getApiEnabled:true})
        // console.log(sanitizedValues)
    }
    const onSuccess = (res:AxiosResponse)=>{
        message.success("Successfully submited form")
        let status = res.data
        status = status.split("|").map((s:string) => s.trim())
        let is_present = status.find((x:string) => x === "education_details")
        if(is_present){
            setIsFormCompleted(true)
        }
        
        setOptions({...options,data:{},getApiEnabled:false})
    }
    const onError = (err:AxiosError)=>{
        setOptions({...options,data:{},getApiEnabled:false})
    }
    const onPreBoardSuccess = (res:AxiosResponse)=>{
        let status = res.data
        status = status.split("|").map((s:string) => s.trim())
        let is_present = status.find((x:string) => x === "education_details")
        if(is_present){
            setIsFormCompleted(true)
        }
        setPreBoardOptions({...preBoardOptions,getApiEnabled:false})
    }
    const onPreBordError = (err:AxiosError)=>{

    }
    useGetPreBoardStatus(preBoardOptions,onPreBoardSuccess,onPreBordError)
    useCreatePreBoardDetails(options,onSuccess,onError)
    return (<>
        <>
            <h4 className="text_left">Hi {name}, Please Update Educational Details</h4>
            {isFormCopleted && <div className="mt-2 mb-2">Already you have Submitted this form you can go to next form by  <Button onClick={()=>setActiveTabKey("6")}>Clicking Here</Button></div>}
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
                            name="diplamo_percentage"
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
                            name="ug_percentage"
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
                            rules={[{ required: false }]}
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