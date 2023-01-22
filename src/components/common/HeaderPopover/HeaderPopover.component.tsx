import { FunctionComponent } from 'react';
import { Typography, Layout, Avatar, Button} from 'antd';
import { useMeQuery } from '../../../state/services/authApi';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';
const { Text } = Typography
const { Content } = Layout

interface HeaderPopoverProps {
    children?: any;
}


export const HeaderPopover: FunctionComponent<HeaderPopoverProps> = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authorization")
        navigate('/auth/login' , {replace: true})
    }

    const { user } = useAuth();

    const avatarStyles = {
        cursor: 'pointer'
    }
    

    return (
        <Content >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Text style={{marginBottom: '0.5rem'}}>{user?.name} </Text>
                <Text style={{marginBottom: '0.5rem'}}> {user?.email} </Text>
                <Button onClick={handleLogout}>Log out &nbsp;<Avatar icon={<LogoutOutlined />} size='small' style={avatarStyles}/></Button> 
            </div>
        </Content>
    )
}