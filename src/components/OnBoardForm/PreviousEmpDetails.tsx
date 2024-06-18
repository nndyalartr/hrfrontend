import { Button, Col, DatePicker, Form, Input, Row, Switch, message } from "antd";
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
const PreviousEmpDetails: React.FC<Props> = ({ setActiveTabKey, name, id }) => {
    const { TextArea } = Input;
    const [isFresher, setIsFresher] = useState<boolean>(false)
    const [educationDetailsForm] = Form.useForm()
    const [isFormCopleted, setIsFormCompleted] = useState<boolean>(false)
    const [options, setOptions] = useState<PreBoardFormDetails>({type:"POST",data_type:"prev_emp_details",id:id,data:{},getApiEnabled:false,})
    const [preBoardOptions,setPreBoardOptions] = useState<{id:string,getApiEnabled:boolean}>({id:id,getApiEnabled:false})
    const formSubmit = (values: any) => {
        // Check if all values are empty or undefined
        const allEmpty = Object.values(values).every(value => value === undefined || value === '');
        let sanitizedValues;
        if (allEmpty) {
            sanitizedValues = { is_fresher: true };
            setOptions({...options,data:sanitizedValues,getApiEnabled:true})
            // console.log(sanitizedValues);
        } else {
            sanitizedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value === undefined ? '' : value])
            );
            let date = moment(values.last_working_day.$d).format("YYYY-MM-DD")
            sanitizedValues = {...sanitizedValues,last_working_day:date}
            setOptions({...options,data:sanitizedValues,getApiEnabled:true})
            // console.log(sanitizedValues);
        }
    };
    
    const onChange = (checked: boolean) => {
        setIsFresher(checked)
    };
    const onSuccess = (res:AxiosResponse)=>{
        message.success("Successfully submited form")
        let status = res.data
        status = status.split("|").map((s:string) => s.trim())
        let is_present = status.find((x:string) => x === "prev_emp_details")
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
        let is_present = status.find((x:string) => x === "prev_emp_details")
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
        <h4 className="text_left">Hi {name}, Please Update Previous Employment Details</h4>
        {isFormCopleted && <div className="mt-2 mb-2">Already you have Submitted this form you can go to next form by  <Button onClick={()=>setActiveTabKey("1")}>Clicking Here</Button></div>}
        <h5 className="text_left text-secondary mt-2">Fresher <Switch onChange={onChange} /></h5>
        {!isFresher ? <Form
            form={educationDetailsForm}
            className=""
            initialValues={{ remember: true }}
            onFinish={formSubmit}
        >
            <Row gutter={16} className="ms-4 me-4 mt-2">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Experience In Years"
                        name="experience_years"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="No of Companies Worked"
                        name="no_of_companies_worked"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Recently Releived Company"
                        name="recent_company_name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Last Company Experience in Years"
                        name="last_exp"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-2">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Last Position Held"
                        name="last_position_held"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Department"
                        name="department"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Place"
                        name="place"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Salary Withdrawn"
                        name="last_salary"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16} className="ms-4 me-4 mt-2">
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Form.Item
                        label="Last Working Day"
                        name="last_working_day"
                        rules={[{ required: true, message: 'Please Select Date' }]}
                    >
                        <DatePicker format="YYYY-MM-DD"
                            style={{ width: "100%" }}
                            placeholder="Select Date"
                            disabledDate={(current) => current && current > moment().endOf('day')} />
                    </Form.Item>

                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                        label="Reason For Leaving"
                        name="reason_for_leaving"
                        rules={[{ required: true }]}
                    >
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
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
        </Form> : <Form
            form={educationDetailsForm}
            className=""
            initialValues={{ remember: true }}
            onFinish={formSubmit}
        >
            <Row gutter={16} className="ms-4 me-4 mt-2">
                <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Form.Item>
                        <Button type="primary" value="fresher" htmlType="submit" className="w-100">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>}

    </>)
}
export default PreviousEmpDetails;