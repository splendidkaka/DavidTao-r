// src/router.tsx (路由配置)
import { createBrowserRouter } from 'react-router-dom';
import App from '../APP';
import HomePage from '../views/Home';
import Albums from '../views/Albums';
import Home from '../views/Home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // 应用布局包裹
        children: [
            { index: true, element: <HomePage /> },
            { path: '/albums', element: <Albums /> },
            { path: '/charts', element: <Home /> }
        ]
    }
]);

export default router;