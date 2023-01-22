import { useEffect , FunctionComponent } from 'react'
import { useLoginMutation } from '../../state/services/authApi';
import { LoginForm } from '../common/LoginForm';
import {useNavigate} from 'react-router-dom';
import {notification} from 'antd';

interface LoginPageProps{
    children?: any 
}

export const LoginPage: FunctionComponent<LoginPageProps> = () => {


    const navigate = useNavigate();

    const [login, { isLoading: isLoggingIn, isSuccess: isLoggedIn, data: loginData, error: loginError }] = useLoginMutation();


    const onLogin = (values: {
        email: string,
        password: string
    }) => {
        login(values)
    }


    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem("authorization", loginData?.token);

            navigate("/home");
        }
    }, [isLoggedIn])


    useEffect(() => {
        if(loginError) {
            notification.error({
                message: (loginError as any)?.data?.message as string || 'An unknown error occured'
            })
        }
    }, [loginError])


    return <LoginForm onLogin={onLogin} isLoading={isLoggingIn}/>
}


