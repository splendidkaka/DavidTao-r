// src/layouts/AppLayout.tsx
import { Flex, Layout } from 'antd';
import NavBar from '@/components/NavBar';
const { Header, Footer, Sider, Content } = Layout;
// import { ConfigProvider } from 'antd';


const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 顶部导航栏 */}
            <Header><NavBar /></Header>

            {/* 动态内容区域 */}
            <Content>{children}</Content>

            {/* 固定播放器 */}
            {/* <Footer style={{ position: 'fixed', ... }}>
                <MiniPlayer />
            </Footer> */}
        </Layout>
    );
};

export default AppLayout;