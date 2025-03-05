// stores/sidebar.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
    playlistVisible: boolean
    togglePlaylistVisibility: () => void
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set, get) => ({
            // 初始状态
            playlistVisible: false,

            // 操作方法
            togglePlaylistVisibility: () => {
                set(state => ({
                    playlistVisible: !state.playlistVisible
                }))
            }
        }),
        {
            name: 'sidebar-storage',    // 本地存储键名
            partialize: (state) => ({
                playlistVisible: state.playlistVisible  // 只持久化需要保留的状态
            })
        }
    )
)