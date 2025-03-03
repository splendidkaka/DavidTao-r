// stores/useAnimationStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AnimationType = 'slide' | 'scale' | 'fade' | 'none'

interface AnimationState {
    currentAnimation: AnimationType
    animationOptions: Array<{ value: AnimationType; label: string }>
    loadSettings: () => void
    saveSettings: () => void
    setCurrentAnimation: (animation: AnimationType) => void
}

export const useAnimationStore = create<AnimationState>()(
    persist(
        (set, get) => ({
            // 初始状态
            currentAnimation: 'slide',
            animationOptions: [
                { value: 'slide', label: '滑动效果' },
                { value: 'scale', label: '缩放效果' },
                { value: 'fade', label: '渐隐效果' },
                { value: 'none', label: '无动画' }
            ],

            // Actions
            loadSettings: () => {
                const saved = localStorage.getItem('animationSettings')
                if (saved) {
                    const { currentAnimation } = JSON.parse(saved)
                    set({ currentAnimation })
                }
            },

            saveSettings: () => {
                localStorage.setItem(
                    'animationSettings',
                    JSON.stringify({
                        currentAnimation: get().currentAnimation
                    })
                )
            },

            setCurrentAnimation: (animation) => {
                set({ currentAnimation: animation })
                get().saveSettings()
            }
        }),
        {
            name: 'animation-storage', // LocalStorage 键名
            // getStorage: () => localStorage, // 指定存储引擎
            partialize: (state) => ({ currentAnimation: state.currentAnimation }) // 持久化字段
        }
    )
)