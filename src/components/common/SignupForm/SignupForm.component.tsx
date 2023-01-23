import { FunctionComponent } from 'react';
import { Button, Form, Input } from 'antd';
import { useSignupMutation } from '../../../state/services/authApi';
import { LockOutlined } from '@ant-design/icons';

interface SignupFormProps {
    children?: any;
    onSignup: (payload: {email: string, name: string, password: string}) => void;
    isLoading: boolean;
}

export const SignupForm: FunctionComponent<SignupFormProps> = ({onSignup, isLoading}): JSX.Element => {

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={(values) => {
                onSignup(values);
            }}
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Name!',
                    },
                ]}
            >
                <Input size='large' placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input size='large' type='email' placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    size='large' 
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button size='large' loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    )
}

