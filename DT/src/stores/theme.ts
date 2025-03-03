// stores/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = {
    name: string
    colors: Record<string, string>
}

type ThemeState = {
    currentTheme: string
    themeOptions: Array<{ value: string; label: string }>
    themes: Record<string, Theme>
    setTheme: (themeName: string) => void
    applyTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            currentTheme: 'light',
            themeOptions: [
                { value: 'light', label: '明亮主题' },
                { value: 'dark', label: '暗黑主题' },
                { value: 'ocean', label: '海洋主题' },
                { value: 'nature', label: '自然主题' },
                { value: 'vintage', label: '复古主题' },
                { value: 'midnight', label: '午夜主题' }
            ],
            themes: {
                light: {
                    name: '明亮主题',
                    colors: {
                        '--color-primary': '#2196f3',
                        '--color-secondary': '#ff9800',
                        '--bg-primary': '#ffffff',
                        '--bg-secondary': '#f5f5f5',
                        '--text-primary': '#212121',
                        '--text-secondary': '#757575',
                        '--item-hover-bg': '#f0f0f0',
                        '--mini-bg': '#ffffff',
                        '--mini-text': '#212121',
                        '--mini-progress-bg': '#e0e0e0',
                        '--mini-progress-active': '#2196f3',
                        '--mini-controls-color': '#757575',
                        '--mini-controls-hover': '#2196f3'
                    }
                },
                dark: {
                    name: '暗黑主题',
                    colors: {
                        '--color-primary': '#4caf50',
                        '--color-secondary': '#ff5722',
                        '--bg-primary': '#121212',
                        '--bg-secondary': '#1e1e1e',
                        '--text-primary': '#e0e0e0',
                        '--text-secondary': '#9e9e9e',
                        '--item-hover-bg': '#2a2a2a'
                    }
                },
                ocean: {
                    name: '海洋主题',
                    colors: {
                        '--color-primary': '#00bcd4',
                        '--color-secondary': '#ff4081',
                        '--bg-primary': '#e0f7fa',
                        '--bg-secondary': '#b2ebf2',
                        '--text-primary': '#006064',
                        '--text-secondary': '#00838f',
                        '--item-hover-bg': '#b3e5fc'
                    }
                },
                // 新增主题
                nature: {
                    name: '自然主题',
                    colors: {
                        '--color-primary': '#2e7d32',
                        '--color-secondary': '#f9a825',
                        '--bg-primary': '#f1f8e9',
                        '--bg-secondary': '#dcedc8',
                        '--text-primary': '#33691e',
                        '--text-secondary': '#689f38',
                        '--item-hover-bg': '#c8e6c9'
                    }
                },
                vintage: {
                    name: '复古主题',
                    colors: {
                        '--color-primary': '#d32f2f',
                        '--color-secondary': '#ffa000',
                        '--bg-primary': '#fff3e0',
                        '--bg-secondary': '#ffe0b2',
                        '--text-primary': '#5d4037',
                        '--text-secondary': '#8d6e63',
                        '--item-hover-bg': '#ffecb3'
                    }
                },
                midnight: {
                    name: '午夜主题',
                    colors: {
                        '--color-primary': '#2962ff',
                        '--color-secondary': '#00b8d4',
                        '--bg-primary': '#0a1929',
                        '--bg-secondary': '#17212f',
                        '--text-primary': '#e0e0e0',
                        '--text-secondary': '#90a4ae',
                        '--item-hover-bg': '#1a237e'
                    }
                }
            },

            setTheme: (themeName) => {
                if (!get().themes[themeName]) return

                set({ currentTheme: themeName })
                get().applyTheme()
            },

            applyTheme: () => {
                const { themes, currentTheme } = get()
                const theme = themes[currentTheme]
                const root = document.documentElement

                // 清除所有历史主题变量
                Object.values(themes).forEach(t => {
                    Object.keys(t.colors).forEach(key => {
                        root.style.removeProperty(key)
                    })
                })

                // 应用新主题变量
                Object.entries(theme.colors).forEach(([key, value]) => {
                    root.style.setProperty(key, value)
                })
            }
        }),
        {
            name: 'theme-storage',
            partialize: (state) => ({ currentTheme: state.currentTheme }),
            onRehydrateStorage: () => (state) => {
                state?.applyTheme()
            },
            version: 1,
            migrate: (persistedState, version) => {
                if (version === 0) {
                    // 处理旧版本数据迁移
                    return { ...(persistedState || {}), currentTheme: 'light' }
                }
                return persistedState
            }
        }
    )
)