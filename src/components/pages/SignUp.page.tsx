import { FunctionComponent, useEffect } from 'react';
import { useSignupMutation } from '../../state/services/authApi';
import SignupForm from '../common/SignupForm';
import { useNavigate } from 'react-router-dom';
import {notification} from 'antd';


interface SignupPageProps {
  children?: any
}

export const SignupPage: FunctionComponent<SignupPageProps> = () => {

  const navigate = useNavigate();

  const [signup, {
    data: signupData,
    isLoading: isSigningUp,
    isSuccess: isSignedUp,
    error: signupError
  }] = useSignupMutation();

  const onSignup = (values: {
    email: string,
    name: string,
    password: string
  }) => {
    signup(values)
  }

  useEffect(() => {
    if (isSignedUp) {
      localStorage.setItem("authorization", signupData.token);
      navigate("/home")
    }
  }, [isSignedUp])

  
  useEffect(() => {
    if(signupError) {
        notification.error({
            message: (signupError as any)?.data?.message as string || 'An unknown error occured'
        })
    }
}, [signupError])

  return <SignupForm onSignup={onSignup} isLoading={isSigningUp}/>
}

