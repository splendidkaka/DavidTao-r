// src/layouts/AppLayout.tsx
import { Layout } from 'antd';
import NavBar from '@/components/NavBar';
import PlayerControls from '@/components/PlayControls';
import LyricOverlay from '@/components/LyricOverlay';
import styles from './AppLayout.module.scss';

const { Header, Footer, Content } = Layout;
const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 顶部导航栏 */}
            <Header><NavBar /></Header>

            {/* 动态内容区域 */}
            <Content className={styles.content}>{children}</Content>

            {/* 固定播放器 */}
            <Footer>
                <PlayerControls />
                <LyricOverlay />
            </Footer>
        </Layout>
    );
};

export default AppLayout;