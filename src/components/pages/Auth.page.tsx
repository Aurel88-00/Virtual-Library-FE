import { FunctionComponent } from 'react';
import { Layout, Row, Card, Tabs, TabsProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Content } = Layout;

interface AuthPageProps {
   children?: any
}


export const AuthPage: FunctionComponent<AuthPageProps> = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const activePathId = location.pathname?.replace("/auth/", "");

    const tabItems = [
        {
            label: "Log In",
            key: "login",
            children: <Outlet />
        },
        {
            label: "Sign Up",
            key: "signup",
            children: <Outlet />,
        },
    ]


    return <Content>
        <Row style={{
            display:'flex',
            height:'100vh',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Card style={{minWidth: '450px'}}>
                <Tabs size='large' onTabClick={(tabKey) => {
                    navigate(`/auth/${tabKey}`)
                }} activeKey={activePathId} items={tabItems} />
            </Card>
        </Row>
    </Content>
}