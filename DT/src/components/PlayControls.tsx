// components/PlayerControls.tsx
import { useRef, useEffect, useMemo } from 'react';
import { useMusicStore } from '@/stores/music';
import { useDevice } from '@/hooks/useDevice';
import SvgIcon from '@/components/SvgIcon';
import styles from './PlayerControls.module.scss';
import { useSidebarStore } from '@/stores/sidebar';

export default function PlayerControls() {
    const { isMobile } = useDevice();
    const musicStore = useMusicStore();
    const sidebarStore = useSidebarStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 获取状态
    const currentSong = useMusicStore(state => state.currentSong());
    const isPlaying = useMusicStore(state => state.currentPlayer.isPlaying);
    const progress = useMusicStore(state => state.currentPlayer.progress);
    const duration = useMusicStore(state => state.currentPlayer.duration);
    const showLyrics = useMusicStore(state => state.showLyricsPanel);
    // 计算属性
    const albumCover = useMemo(() =>
        musicStore.getAlbumCover(currentSong?.albumId || ''),
        [currentSong?.albumId, musicStore]
    );

    const artistNames = useMemo(() =>
        currentSong?.artists
            .map(id => musicStore.getArtist(id)?.name)
            .filter(Boolean)
            .join(', ') || '未知艺术家',
        [currentSong?.artists, musicStore]
    );

    // 生命周期管理
    useEffect(() => {
        const currentAudio = audioRef.current;
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    useEffect(() => {
        if (!currentSong) return;

        cleanupAudio();
        initAudio(currentSong.audioUrl);
    }, [currentSong]);

    // 音频控制逻辑
    const initAudio = (url: string) => {
        audioRef.current = new Audio(url);
        const audio = audioRef.current;

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', () => {
            musicStore.updateDuration(audio.duration || 0);
        });
        audio.addEventListener('ended', musicStore.nextTrack);

        if (isPlaying) {
            audio.play();
        }
    };

    const cleanupAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeEventListener('timeupdate', updateProgress);
            audioRef.current = null;
        }
    };

    // 播放控制
    const togglePlay = () => {
        if (!audioRef.current) return;

        musicStore.togglePlayback();
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
    };

    const updateProgress = () => {
        if (audioRef.current) {
            musicStore.updateProgress(audioRef.current.currentTime);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            musicStore.updateProgress(time);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        musicStore.toggleLyricsPanel(!showLyrics);
        console.log('album cover clicked',showLyrics);
    };

    if (!currentSong) return null;

    return (
        <div className={`${styles.playerControls} ${isMobile ? styles.mobileLayout : ''}`}>
            <div className={styles.playerContent}>
                {/* 左侧：歌曲信息 */}
                <div className={styles.songInfo}>
                    <img
                        src={albumCover}
                        className={styles.albumCover}
                        onClick={handleClick}
                        alt="专辑封面"
                    />
                    <div className={styles.textInfo}>
                        <div className={styles.title}>{currentSong.title}</div>
                        <div className={styles.artist}>{artistNames}</div>
                    </div>
                </div>

                {/* 中间：播放控制 */}
                <div className={styles.controls}>
                    <button
                        className={`${styles.controlBtn} ${styles.playBtn}`}
                        onClick={togglePlay}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* 右侧：进度条和时间（桌面端） */}
                {!isMobile && (
                    <div className={styles.progressContainer}>
                        <div className={styles.time}>{formatTime(progress)}</div>
                        <input
                            type="range"
                            className={styles.progressBar}
                            min={0}
                            max={duration}
                            value={progress}
                            onChange={handleSeek}
                        />
                        <div className={styles.time}>{formatTime(duration)}</div>
                        <button
                            className={styles.playlistToggle}
                            onClick={() => sidebarStore.togglePlaylistVisibility()}
                        >
                            <SvgIcon icon="mdi:playlist-music" size={24} className={styles.icon} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// 工具函数
function formatTime(seconds: number) {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${minutes}:${remaining.toString().padStart(2, '0')}`;
}