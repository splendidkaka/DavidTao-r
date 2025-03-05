// components/LyricOverlay.tsx
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useMusicStore } from '@/stores/music';
import { loadLyric } from '@/utils/lyrics-loader';
import styles from './LyricOverlay.module.scss';
import type { LyricLine } from '@/types/music';

interface LyricOverlayProps {
    visible?: boolean;
    title?: string;
    artist?: string;
    cover?: string;
    onVisibleChange?: (visible: boolean) => void;
}

export default function LyricOverlay({
    visible,
    title,
    artist,
    cover,
    onVisibleChange,
}: LyricOverlayProps) {
    const musicStore = useMusicStore();
    const [lyricsList, setLyricsList] = useState<LyricLine[]>([]);
    const [offsetY, setOffsetY] = useState(0);
    const [closing, setClosing] = useState(false);

    const touchStartY = useRef(0);
    const currentTranslateY = useRef(0);
    const lyricWrapperRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const showLyrics:Boolean = useMusicStore(state => state.showLyricsPanel);

    // 计算当前歌词行
    const currentLine = useMemo(() => {
        const lyrics = lyricsList;
        const currentTime = musicStore.currentTime;

        if (!lyrics?.length) return 0;
        let left = 0;
        let right = lyrics.length - 1;
        let result = 0;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (lyrics[mid].time <= currentTime()) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result < lyrics.length - 1 ? result : lyrics.length - 1;
    }, [lyricsList, musicStore.currentTime]);

    // 自动滚动到当前歌词
    const scrollToCurrent = useCallback(() => {
        if (currentRef.current && lyricWrapperRef.current) {
            const wrapperHeight = lyricWrapperRef.current.clientHeight;
            const lineTop = currentRef.current.offsetTop;
            const lineHeight = currentRef.current.clientHeight;

            lyricWrapperRef.current.scrollTo({
                top: lineTop - wrapperHeight / 2 + lineHeight / 2,
                behavior: 'smooth'
            });
        }
    }, []);

    // 更新歌词列表
    useEffect(() => {
        const updateLyrics = async () => {
            const currentSong = musicStore.currentSong();
            if (currentSong?.lyrics) {
                const lyrics = await loadLyric(currentSong.lyrics);
                setLyricsList(lyrics);
            }
        };
        updateLyrics();
    }, [musicStore.currentSong]);

    // 触摸处理
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        currentTranslateY.current = offsetY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (closing) return;
        const deltaY = e.touches[0].clientY - touchStartY.current;
        setOffsetY(Math.max(0, currentTranslateY.current + deltaY));
    };

    const handleTouchEnd = () => {
        if (offsetY > 120) {
            setClosing(true);
            // onVisibleChange(false);
        } else {
            setOffsetY(0);
        }
    };

    // 重置状态
    useEffect(() => {
        if (!visible) {
            setOffsetY(0);
            setClosing(false);
        }
    }, [visible]);

    // 创建 Portal 容器
    useEffect(() => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        containerRef.current = div;
        return () => {
            document.body.removeChild(div);
        };
    }, []);

    if (!containerRef.current) return null;

    return createPortal(
        // <CSSTransition
        //     in={musicStore.showLyrics}
        //     timeout={300}
        //     classNames="lyric-slide"
        //     unmountOnExit
        // >
        <div className={styles.lyricOverlay} style={{ display: showLyrics ? 'block' : 'none' }}>
            <div
                className={styles.lyricContainer}
                style={{ transform: `translateY(${offsetY}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* 头部信息 */}
                <div className={styles.lyricHeader}>
                    <div className={styles.songInfo}>
                        {/* <img
                                src={musicStore.getAlbumCover(musicStore.currentSong?.albumId || '')}
                                className={styles.albumCover}
                                alt="Album cover"
                            />
                            <div className={styles.meta}>
                                <h3 className={styles.title}>{musicStore.currentSong?.title}</h3>
                                <p className={styles.artist}>{musicStore.currentSong?.artists.join(', ')}</p>
                            </div> */}
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={() => { musicStore.toggleLyricsPanel(false);
                        }}
                    >
                        <svg viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>

                {/* 歌词列表 */}
                <div className={styles.lyricWrapper} ref={lyricWrapperRef}>
                    {lyricsList.map((line, index) => (
                        <div
                            key={index}
                            className={`${styles.lyricLine} ${index === currentLine ? styles.active : ''}`}
                            ref={el => { if (index === currentLine) currentRef.current = el as HTMLElement || null }}
                        >
                            {line.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        // </CSSTransition>,
        ,
        containerRef.current
    );
}