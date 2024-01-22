import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import useVerifyLoginApi from '../../QueryApiCalls/useVerifyLoginApi';

const LoginFormComponent: React.FC = () => {

    const [loginForm] = Form.useForm()
    const [loginData, setLoginData] = useState<any>([])
    const { mutateAsync: loginCheck, isLoading: isLoginLoading }: any = useVerifyLoginApi()
    const navigate = useNavigate()
    const signIn: any = useSignIn()
    const location: any = useLocation
    const loginFn = async (values: { "emailId": string, "password": string }) => {

        const reqObj = {
            email: values.emailId.toLowerCase(),
            password: values.password
        }
        await loginCheck(reqObj, {
            onSuccess: (response: AxiosResponse) => {
                setLoginData(response);

                if (response && response.data) {
                    let obj = {
                        user_email: values.emailId.toLowerCase(),
                        user_role: response.data.role,
                        user_name: response.data.name,
                        first_login:response.data.is_first_login
                    };
                    localStorage.setItem("_USER_DATA", JSON.stringify(obj));
                    signIn({
                        token: response.data.access,
                        refreshToken: response.data.refresh,
                        refreshTokenExpireIn: 24 * 3600,
                        expiresIn: 24 * 3600,
                        tokemType: "Bearer",
                        authState: {
                            email: values.emailId
                        }
                    })                        
                    const from: string = location.state?.from || "/dashboard";
                    if (!response?.data?.is_first_login) {
                        navigate("/dashboard", { replace: true });
                    } else {
                        navigate('/change-password', { replace: true });
                    }
                } else {
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
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={loginFn}
        >
            <Form.Item
                name="emailId"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>


            <Form.Item>
                <Button loading={isLoginLoading} type="primary" htmlType="submit" className="w-100">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginFormComponent;
