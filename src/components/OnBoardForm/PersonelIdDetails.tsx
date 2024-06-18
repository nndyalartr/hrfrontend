import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import moment from "moment";
import "./onboard.css"
import { useEffect, useState } from "react";
import { PreBoardFormDetails } from "../../interfaces/types";
import { AxiosError, AxiosResponse } from "axios";
import useGetPreBoardStatus from "../../QueryApiCalls/useGetPreBoardStatus";
import useCreatePreBoardDetails from "../../QueryApiCalls/useCreatePreBoardDetails";
interface Props {
    setActiveTabKey: (key: string) => void;
    id: string,
    name: string
}
const PersonelIdDetails: React.FC<Props> = ({ setActiveTabKey, name, id }) => {
    const [personalDetailsForm] = Form.useForm()
    const [isFormCopleted, setIsFormCompleted] = useState<boolean>(false)
    const [options, setOptions] = useState<PreBoardFormDetails>({type:"POST",data_type:"personel_id_details",id:id,data:{},getApiEnabled:false,})
    const [preBoardOptions,setPreBoardOptions] = useState<{id:string,getApiEnabled:boolean}>({id:id,getApiEnabled:false})
    useEffect(()=>{
        setPreBoardOptions({...preBoardOptions,getApiEnabled:true})
    },[])
    const formSubmit = (values: any) => {
        const sanitizedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value === undefined ? '' : value])
        );
        setOptions({...options,data:sanitizedValues,getApiEnabled:true})
        // console.log(sanitizedValues)
    }
    const onSuccess = (res:AxiosResponse)=>{
        let status = res.data
        status = status.split("|").map((s:string) => s.trim())
        let is_present = status.find((x:string) => x === "personel_id_details")
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
        let is_present = status.find((x:string) => x === "personel_id_details")
        if(is_present){
            setIsFormCompleted(true)
        }
        setPreBoardOptions({...preBoardOptions,getApiEnabled:false})
    }
    const onPreBordError = (err:AxiosError)=>{

    }
    useGetPreBoardStatus(preBoardOptions,onPreBoardSuccess,onPreBordError)
    useCreatePreBoardDetails(options,onSuccess,onError)
    return (
        <>
            <h4 className="text_left">Hi {name}, Please Update Personel Details</h4>
            {isFormCopleted && <div className="mt-2 mb-2">Already you have Submitted this form you can go to next form by  <Button onClick={()=>setActiveTabKey("4")}>Clicking Here</Button></div>}
            <Form
                form={personalDetailsForm}
                className=""
                initialValues={{ remember: true }}
                onFinish={formSubmit}
            >
                <Row gutter={16} className="ms-4 me-4 mt-2">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Name as per PAN"
                            name="name_pan"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="PAN No"
                            name="PAN"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Name as per AADHAR"
                            name="name_AADHAR"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="AADHAR"
                            name="AADHAR"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="ms-4 me-4 mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Name as per Passport"
                            name="name_passport"
                            rules={[{ required: false }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Passport No"
                            name="passport"
                            rules={[{ required: false }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="Name as per DL"
                            name="name_dl"
                            rules={[{ required: false }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Form.Item
                            label="DL No"
                            name="DL"
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
    )
}
export default PersonelIdDetails;