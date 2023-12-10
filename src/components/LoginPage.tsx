import { Button, Card, Col, Form, Input, Row, message } from "antd";
import useVerifyLoginApi from "../QueryApiCalls/useVerifyLoginApi";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import Cookie from "js-cookie"
import { useLocation, useNavigate } from "react-router-dom";
import './dashboard.css'
const LoginPage = () => {
    const [loginForm] = Form.useForm()
    const [loginData, setLoginData] = useState<any>([])
    const { mutateAsync: loginCheck }: any = useVerifyLoginApi()
    const navigate = useNavigate()
    const signIn: any = useSignIn()
    const location: any = useLocation
    const loginFn = async (values: { "emailId": string, "password": string }) => {

        const reqObj = {
            email: values.emailId,
            password: values.password
        }
        await loginCheck(reqObj, {
            onSuccess: (response: AxiosResponse) => {
                setLoginData(response)
                if (response && response.data) {
                    signIn({
                        token: response.data.access,
                        refreshToken: response.data.refresh,
                        refreshTokenExpireIn: 24,
                        expiresIn: 24,
                        tokemType: "Bearer",
                        authState: {
                            email: values.emailId
                        }
                    })
                    let obj = {
                        user_email: values.emailId,
                        user_role: response.data.role,
                        user_name: response.data.name
                    }
                    localStorage.setItem("_USER_DATA", JSON.stringify(obj))
                    const from: string = location.state?.from || "/dashboard"
                    navigate(from, { replace: true })
                }else{
                    message.error("In-Valid Login Credentials")
                }

            }, onError: (err: AxiosError) => {
                console.log("err")
                const from: string = location.state?.from || ""
                navigate(from, { replace: true })
            }
        }
        )
    }
    return (
        <div className="login_page">
            <Row>
                <Col>
                <h3 className="text-secondary mt-2 ms-5">
                    RC Services
                </h3>
                </Col>
            </Row>
            <Row className="me-5 mt-5" justify="end">
                <Col span={6}>
                    <Card size="small" title="Login">
                        <Form
                            className=""
                            form={loginForm}
                            onFinish={loginFn}
                        >
                            <Form.Item name="emailId" label="Email">

                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password">

                                <Input />
                            </Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>

                        </Form>
                    </Card>
                </Col>                
            </Row>

        </div>
    )
}

export default LoginPage;
