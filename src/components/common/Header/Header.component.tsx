import { FunctionComponent } from 'react';
import { Layout, Avatar, Typography, Button, Col, Row, Space, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { HeaderPopover } from '../HeaderPopover';
const { Header } = Layout;
const { Text } = Typography;

interface HeaderProps {
    children?: any;
    onOpenDrawer: () => void;
}



export const HeaderComponent: FunctionComponent<HeaderProps> = ({ onOpenDrawer }) => {

    const headerStyles = {
        backgroundColor: 'rgb(16, 142, 233)',
        color: 'white',

    }
    const textStyles = {
        color: 'white',
        fontSize: '22px'
    }

    const avatarStyles = {
        cursor: 'pointer'
    }
    
    return (
        <Header style={headerStyles}>
            <Row>
                <Col flex="auto">
                    <Text style={textStyles} strong > Virtual Library</Text>
                </Col>
                <Col flex="none">
                    <Space size="middle">
                        <Button onClick={onOpenDrawer}>
                            Add book
                        </Button>
                        <Popover content={<HeaderPopover />} placement='bottomLeft' title="User profile" trigger="click">
                            <Avatar
                                icon={<UserOutlined />}
                                size="large"
                                style={avatarStyles}
                            />
                        </Popover>

                    </Space>
                </Col>
            </Row>
        </Header>
    )
}