// stores/music.ts
import {create ,StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockArtists, mockAlbums, mockSongs, mockPlaylists } from '@/mock/api/mockData'
import type { Artist, Album, Song, Playlist, LyricLine } from '@/types/music'

interface MusicState {
    [x: string]: any
    // 数据存储
    artists: Record<string, Artist>
    albums: Record<string, Album>
    songs: Record<string, Song>
    playlists: Record<string, Playlist>

    // 播放器状态
    currentPlayer: {
        queue: string[]
        currentIndex: number
        isPlaying: boolean
        progress: number
        duration: number
    }

    // 歌词相关
    lyrics: LyricLine[]
    currentLyricIndex: number
    showLyricsPanel: boolean
    showTranslation: boolean
    lyricOffset: number

    // 选中状态
    selectedArtistId: string | null

    // Getter 方法
    getArtist: (id: string) => Artist | undefined
    getArtistAlbums: (artistId: string) => Album[]
    getSongsByAlbum: (albumId: string) => Song[]
    getAlbumDetails: (albumId: string) => Album | null
    getAlbumCover: (albumId: string) => string
    getArtistBySong: (songId: string) => string | null
    currentSong: () => Song | null
    progressPercent: () => number
    currentTime: () => number
    formattedLyrics: () => Array<LyricLine & { timeFormatted: string }>
    hasLyrics: () => boolean

    // Actions
    initMockData: () => void
    playAlbum: (albumId: string) => void
    playSong: (songId: string) => void
    playQueue: (songIds: string[], index?: number) => void
    togglePlayback: () => void
    updateProgress: (progress: number) => void
    updateDuration: (duration: number) => void
    nextTrack: () => void
    prevTrack: () => void
    setCurrentIndex: (index: number) => void
    removeFromQueue: (index: number) => void
    clearQueue: () => void
    setSelectedArtistId: (id: string) => void
    loadLyrics: (songId: string) => Promise<void>
    toggleLyricsPanel: (visible?: boolean) => void
    setLyrics: (lyrics: LyricLine[]) => void
    updateLyricIndex: (currentTime: number) => void
    setLyricOffset: (offset: number) => void
}

const createMusicStore: StateCreator<MusicState> = (set, get) => ({
    // 初始状态
    artists: {},
    albums: {},
    songs: {},
    initialized: false,
    playlists: {},
    currentPlayer: {
        queue: [],
        currentIndex: -1,
        isPlaying: false,
        progress: 0,
        duration: 0
    },
    selectedArtistId: 'dt',
    lyrics: [],
    currentLyricIndex: -1,
    showLyricsPanel: false,
    showTranslation: false,
    lyricOffset: 0,

    // Getter 实现
    getArtist: (id) => get().artists[id],

    getArtistAlbums: (artistId) => {
        const artist = get().artists[artistId]
        return artist ? artist.albums.map(id => get().albums[id]) : []
    },

    getSongsByAlbum: (albumId) => {
        const album = get().albums[albumId]
        return album ? album.songs.map(id => get().songs[id]) : []
    },

    getAlbumDetails: (albumId) => {
        const album = get().albums[albumId]
        return album ? {
            ...album,
            artist: get().artists[album.artistId],
            songs: album.songs
        } : null
    },

    getAlbumCover: (albumId) =>
        get().albums[albumId]?.cover || '/default-cover.jpg',

    getArtistBySong: (songId) =>
        Object.values(get().artists).find(
            artist => artist.id === get().songs[songId]?.artists[0]
        )?.name || null,

    currentSong: () => {
        const { currentPlayer } = get()
        return currentPlayer.queue[currentPlayer.currentIndex]
            ? get().songs[currentPlayer.queue[currentPlayer.currentIndex]]
            : null
    },

    progressPercent: () => {
        const { progress, duration } = get().currentPlayer
        return (progress / duration) * 100 || 0
    },

    currentTime: () => get().currentPlayer.progress,

    formattedLyrics: () =>
        get().lyrics.map(lyric => ({
            ...lyric,
            timeFormatted: `${Math.floor(lyric.time / 60)}:${(lyric.time % 60)
                .toString()
                .padStart(2, '0')}`
        })),

    hasLyrics: () => get().lyrics.length > 0,

    // Action 实现
    initMockData: () => {
        set({
            artists: mockArtists.reduce((acc, artist) => {
                acc[artist.id] = { ...artist, albums: artist.albums || [] }
                return acc
            }, {} as Record<string, Artist>),
            albums: mockAlbums.reduce((acc, album) => {
                acc[album.id] = { ...album, songs: album.songs || [] }
                return acc
            }, {} as Record<string, Album>),
            songs: mockSongs.reduce((acc, song) => {
                acc[song.id] = song
                return acc
            }, {} as Record<string, Song>),
            playlists: mockPlaylists.reduce((acc, playlist) => {
                acc[playlist.id] = { ...playlist, songs: playlist.songs || [] }
                return acc
            }, {} as Record<string, Playlist>)
        })
        set({ initialized: true })
    },

    playAlbum: (albumId) => {
        const album = get().albums[albumId]
        if (album) {
            set({
                currentPlayer: {
                    ...get().currentPlayer,
                    queue: [...album.songs],
                    currentIndex: 0,
                    isPlaying: true
                }
            })
        }
    },

    playSong: (songId) => {
        set({
            currentPlayer: {
                queue: [songId],
                currentIndex: 0,
                isPlaying: true,
                progress: 0,
                duration: get().currentPlayer.duration
            }
        })
    },

    playQueue: (songIds, index = 0) => {
        set({
            currentPlayer: {
                ...get().currentPlayer,
                queue: songIds,
                currentIndex: index,
                isPlaying: true,
                progress: 0
            }
        })
    },

    togglePlayback: () =>
        set(state => ({
            currentPlayer: {
                ...state.currentPlayer,
                isPlaying: !state.currentPlayer.isPlaying
            }
        })),

    updateProgress: (progress) =>
        set(state => ({
            currentPlayer: { ...state.currentPlayer, progress }
        })),

    updateDuration: (duration) =>
        set(state => ({
            currentPlayer: { ...state.currentPlayer, duration }
        })),

    nextTrack: () =>
        set(state => {
            const newIndex = state.currentPlayer.currentIndex < state.currentPlayer.queue.length - 1
                ? state.currentPlayer.currentIndex + 1
                : 0
            return { currentPlayer: { ...state.currentPlayer, currentIndex: newIndex } }
        }),

    prevTrack: () =>
        set(state => {
            const newIndex = state.currentPlayer.currentIndex > 0
                ? state.currentPlayer.currentIndex - 1
                : state.currentPlayer.currentIndex
            return { currentPlayer: { ...state.currentPlayer, currentIndex: newIndex } }
        }),

    setCurrentIndex: (index) =>
        set(state => ({
            currentPlayer: {
                ...state.currentPlayer,
                currentIndex: Math.max(0, Math.min(index, state.currentPlayer.queue.length - 1))
            }
        })),

    removeFromQueue: (index) =>
        set(state => {
            const newQueue = [...state.currentPlayer.queue]
            newQueue.splice(index, 1)

            let newIndex = state.currentPlayer.currentIndex
            if (index === newIndex) newIndex = Math.min(newIndex, newQueue.length - 1)
            if (newIndex >= newQueue.length) newIndex = Math.max(newQueue.length - 1, 0)

            return {
                currentPlayer: {
                    ...state.currentPlayer,
                    queue: newQueue,
                    currentIndex: newIndex
                }
            }
        }),

    clearQueue: () =>
        set({
            currentPlayer: {
                queue: [],
                currentIndex: -1,
                isPlaying: false,
                progress: 0,
                duration: 0
            }
        }),

    setSelectedArtistId: (id) => set({ selectedArtistId: id }),

    async loadLyrics(songId) {
        const song = get().songs[songId]
        if (song?.lyrics) {
            const parsedLyrics = this.parseLyrics(song.lyrics)
            set({ lyrics: parsedLyrics, currentLyricIndex: -1 })
        }
    },

    toggleLyricsPanel: (visible) =>
        set(state => ({
            showLyricsPanel: visible ?? !state.showLyricsPanel,
            lyricOffset: visible !== false ? state.lyricOffset : 0
        })),

    setLyrics: (lyrics) => set({ lyrics, currentLyricIndex: -1 }),

    updateLyricIndex: (currentTime) =>
        set(state => {
            if (!state.lyrics.length) return {}

            let low = 0
            let high = state.lyrics.length - 1
            while (low <= high) {
                const mid = Math.floor((low + high) / 2)
                if (state.lyrics[mid].time < currentTime) {
                    low = mid + 1
                } else {
                    high = mid - 1
                }
            }
            return { currentLyricIndex: Math.max(high, 0) }
        }),

    setLyricOffset: (offset) =>
        set(state => {
            if (offset > 150) {
                return { lyricOffset: 0, showLyricsPanel: false }
            }
            return { lyricOffset: Math.max(0, offset) }
        }),

    // 私有方法
    parseLyrics: (lyricString: string): LyricLine[] => {
        const timeRegex = /$$(\d+):(\d+\.?\d*)$$/
        return lyricString
            .split('\n')
            .map(line => {
                const match = line.match(timeRegex)
                if (!match) return null
                return {
                    time: parseFloat(match[1]) * 60 + parseFloat(match[2]),
                    text: line.replace(timeRegex, '').trim()
                }
            })
            .filter(Boolean) as LyricLine[]
    }
})

export const useMusicStore = create(
    persist(createMusicStore, {
        name: 'music-storage',
        partialize: (state) => ({
            currentPlayer: state.currentPlayer,
            selectedArtistId: state.selectedArtistId,
            showLyricsPanel: state.showLyricsPanel,
            showTranslation: state.showTranslation
        })
    })
)