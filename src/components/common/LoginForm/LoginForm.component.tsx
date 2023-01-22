import { FunctionComponent } from 'react'
import { Button, Form, Input} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';


interface LoginFormProps {
    children?: JSX.Element | Array<JSX.Element>,
    onLogin: (payload: {email: string, password: string}) => void;
    isLoading: boolean;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({onLogin, isLoading}) => {

    const navigate = useNavigate();

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={(values) => {
                onLogin(values)
            }}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input size='large'  placeholder="Email" />
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
                    Log in
                </Button> &nbsp;
                <a onClick={(e) => {
                    e.preventDefault()
                    navigate("/auth/signup")
                }} style={{fontSize:'16.5px'}}>Or register now!</a>
            </Form.Item>
        </Form>
    )
}


