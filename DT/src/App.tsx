// src/App.tsx (主入口组件)
import { Outlet } from 'react-router-dom';
import AppLayout from './layouts/AppLayout'; // 你的布局组件
import { useMusicStore } from '@/stores/music'
import { useEffect } from 'react';
function App() {
    const { initialized, initMockData } = useMusicStore()

    useEffect(() => {
        if (!initialized) {
            initMockData()
        }
    }, [initialized, initMockData])

    if (!initialized) {
        return <div className="loading">Loading...</div>
    }

    return (
        <AppLayout>
            <Outlet /> {/* 这里会渲染当前路由匹配的内容 */}
        </AppLayout>
    );
}

export default App;