// src/hooks/useDevice.ts
import { useState, useEffect } from 'react';

type Breakpoints = {
    mobile: number;
    tablet: number;
    desktop: number;
};

const defaultBreakpoints: Breakpoints = {
    mobile: 640,
    tablet: 768,
    desktop: 1024
};

export const useDevice = (breakpoints: Breakpoints = defaultBreakpoints) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 处理响应式断点
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const checkMobile = () => {
            const width = window.innerWidth;
            setIsMobile(width < breakpoints.tablet);
        };

        // 初始检测
        checkMobile();

        // 添加事件监听
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoints.tablet]);

    // 处理暗色模式检测
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateColorScheme = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        // 初始状态
        setIsDarkMode(darkModeQuery.matches);

        // 添加监听（现代浏览器方式）
        darkModeQuery.addEventListener('change', updateColorScheme);

        return () => darkModeQuery.removeEventListener('change', updateColorScheme);
    }, []);

    // 扩展其他断点检测
    const breakpointStatus = {
        isMobile,
        isTablet: !isMobile && window.innerWidth < breakpoints.desktop,
        isDesktop: window.innerWidth >= breakpoints.desktop
    };

    return {
        isMobile,
        isDarkMode,
        ...breakpointStatus
    };
};