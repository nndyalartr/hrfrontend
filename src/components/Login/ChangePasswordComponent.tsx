
import React from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import useChangePassword from '../../QueryApiCalls/Login/useChangePassword';
import { useSignOut } from 'react-auth-kit';
import './ChangePasswordPage.style.css'

const ChangePasswordComponent: React.FC = () => {
    const [changePasswordForm] = Form.useForm()
    const userData: any = JSON.parse(localStorage.getItem("_USER_DATA") || '{}');
    const { mutateAsync: mutateChangePassword, isLoading: changePasswordLoading }: any = useChangePassword();
    const signOut = useSignOut();


    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const onFinish = async (values: any) => {
        const reqObj: any = {
            email: userData?.user_email || "",
            oldPassword: values?.oldPassword,
            newPassword: values?.newPassword
        }
        await mutateChangePassword(reqObj, {

            onSuccess: (response: any) => {
                if (response?.status === 200) {
                    message.success(response?.data?.message || "Password changed successfully.");
                    signOut();
                } else {
                    message?.error(response?.response?.data?.error || "Unable to change password!")
                }
            },
            onError: (err: any) => {
                message.error(err?.response?.data?.message || "Something went wrong");
            }
        })
    };
    return (
        <div className='change_password_container_form'>

            <h2 className='common_title'>
                Change Password
            </h2>
            <Card>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    form={changePasswordForm}
                    initialValues={{ remember: true }}
                >

                    <Form.Item
                        name='email'
                        label="Email"
                        rules={[{ type: 'email' }]}
                    >
                        <Input
                            disabled
                            placeholder='Enter E-mail'
                            defaultValue={userData?.user_email}
                        />
                    </Form.Item>
                    <Form.Item
                        name='oldPassword'
                        label="Old Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your old password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Enter Old Password'

                        />
                    </Form.Item>
                    <Form.Item
                        name='newPassword'
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                                message: `Password must contain 8 characters including upper case, lower case, numeric and special character `
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Ex: Example@123'
                        />
                    </Form.Item>

                    <Form.Item
                        className='d-flex justify-content-end'
                    >
                        <Button loading={changePasswordLoading} type="primary" htmlType="submit">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        </div >

    );
}


export default ChangePasswordComponent;

