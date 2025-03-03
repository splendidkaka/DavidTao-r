// src/components/HomeView/index.tsx
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { useMusicStore } from '@/stores/music';
import { useAnimationStore } from '@/stores/animation';
import { useThemeStore } from '@/stores/theme';
import SongList from '@/components/SongList';
import SvgIcon from '@/components/SvgIcon';
import styles from './Home.module.scss';
import type { Playlist, Song, Album, Artist } from '@/types/music'

export default function HomeView() {
    const musicStore = useMusicStore();
    const animationStore = useAnimationStore();
    const themeStore = useThemeStore();

    const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
    const [currentPlaylistName, setCurrentPlaylistName] = useState('');
    const [currentPlaylistId, setCurrentPlaylistId] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [showThemeSettings, setShowThemeSettings] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const scrollContainer = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
    const [transitionName, setTransitionName] = useState('');

    // 计算属性转换
    const albumLists = useMemo(() => {
        return musicStore.selectedArtistId
            ? musicStore.getArtistAlbums(musicStore.selectedArtistId)
            : [];
    }, [musicStore.selectedArtistId]);

    const artist = useMemo(() => {
        return musicStore.artists[musicStore.selectedArtistId?.toString() || ''];
    }, [musicStore.selectedArtistId]);

    // 生命周期处理
    useLayoutEffect(() => {
        musicStore.initMockData();
        const loadData = async () => {
            // const playlists = await musicStore.getFeaturedPlaylists();
            // setFeaturedPlaylists(playlists);
            animationStore.loadSettings();
            checkDevice();
            window.addEventListener('resize', checkDevice);
        };
        loadData();
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // 设备检测
    const checkDevice = () => {
        const ua = navigator.userAgent;
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const smallScreen = window.matchMedia('(max-width: 768px)').matches;
        setIsMobile((/Mobile|Android|iPhone/i.test(ua) && isTouch) || (smallScreen && isTouch));
    };

    // 专辑选择逻辑
    const selectPlaylist = async (album: Album, index: number) => {
        const oldIndex = activeAlbumIndex;
        setActiveAlbumIndex(index);
        setCurrentPlaylistName(album.title);
        setCurrentPlaylistId(album.id);

        if (animationStore.currentAnimation !== 'none') {
            setTransitionName('');
            await new Promise(resolve => setTimeout(resolve, 0));
            setTransitionName(getTransitionName(oldIndex, index));
        }

        scrollToAlbum(index);
    };

    const getTransitionName = (oldIndex: number, newIndex: number) => {
        if (animationStore.currentAnimation === 'none') return ''
    
        const direction = newIndex > oldIndex ? 'next' : 'prev'
        return `${animationStore.currentAnimation}-${direction}`
    }
    
    // 滚动到指定专辑
    const scrollToAlbum = (index: number) => {
        if (!scrollContainer.current) return
        const container = scrollContainer.current
        const albumWidth = container.querySelector('.playlist-card')?.clientWidth || 0
        const scrollPos = index * (albumWidth + 32)
    
        container.scrollTo({
            left: scrollPos,
            behavior: animationStore.currentAnimation !== 'none' ? 'smooth' : 'auto'
        })
    }

    // 滚动控制逻辑
    const scroll = (direction: number) => {
        if (!scrollContainer.current) return;
        const containerWidth = scrollContainer.current.offsetWidth;
        const scrollAmount = containerWidth * 0.8;

        scrollContainer.current.scrollBy({
            left: direction * scrollAmount,
            behavior: animationStore.currentAnimation !== 'none' ? 'smooth' : 'auto'
        });
    };

    return (
        <div className={`${styles.homeView} ${isMobile ? styles.mobileView : ''}`}>
            {/* 主题设置面板 */}
            <div className={styles.themeSettings}>
                <button
                    className={styles.themeTrigger}
                    onClick={() => setShowThemeSettings(!showThemeSettings)}
                    title="主题设置"
                >
                    <SvgIcon icon="mdi:palette" size={24} />
                </button>

                {showThemeSettings && (
                    <div className={styles.themePanel}>
                        <h4>主题效果设置</h4>
                        <div className={styles.animationOptions}>
                            {themeStore.themeOptions.map(option => (
                                <label
                                    key={option.value}
                                    className={themeStore.currentTheme === option.value ? styles.active : ''}
                                >
                                    <input
                                        type="radio"
                                        value={option.value}
                                        checked={themeStore.currentTheme === option.value}
                                        onChange={() => themeStore.setTheme(option.value)}
                                    />
                                    <span className={styles.radioIndicator} />
                                    <span className={styles.labelText}>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 动画设置面板 */}
            <div className={`${styles.animationSettings} ${showSettings ? styles.expanded : ''}`}>
                <button
                    className={styles.settingsTrigger}
                    onClick={() => setShowSettings(!showSettings)}
                    title={showSettings ? '隐藏设置' : '显示设置'}
                >
                    <SvgIcon icon="mdi:animation" size={24} />
                </button>

                {showSettings && (
                    <div className={styles.settingsPanel}>
                        <h4>动画效果设置</h4>
                        <div className={styles.animationOptions}>
                            {animationStore.animationOptions.map(option => (
                                <label
                                    key={option.value}
                                    className={animationStore.currentAnimation === option.value ? styles.active : ''}
                                >
                                    <input
                                        type="radio"
                                        value={option.value}
                                        checked={animationStore.currentAnimation === option.value}
                                        onChange={() => animationStore.setCurrentAnimation(option.value)}
                                    />
                                    <span className={styles.radioIndicator} />
                                    <span className={styles.labelText}>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 主要内容区域 */}
            <section className={styles.heroSection}>
                <h1>{artist?.name}音乐宇宙</h1>
                <p>探索{artist?.name}的音乐世界</p>
            </section>

            {/* 专辑滚动区域 */}
            <section className={styles.featuredPlaylists}>
                <h2>精选专辑</h2>
                <div className={styles.playlistScrollContainer}>
                    <button
                        className={`${styles.scrollArrow} ${styles.left} ${showLeftArrow ? styles.visible : ''}`}
                        onClick={() => scroll(-1)}
                        aria-label="向左滚动"
                    >
                        <SvgIcon icon="mdi:chevron-left" size={32} />
                    </button>

                    <div
                        ref={scrollContainer}
                        className={styles.scrollWrapper}
                        onScroll={() => {
                            if (!scrollContainer.current) return;
                            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
                            setShowLeftArrow(scrollLeft > 0);
                            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
                        }}
                    >
                        <div className={styles.albumContent}>
                            {albumLists.map((playlist, index) => (
                                <div
                                    key={playlist.id}
                                    className={`${styles.playlistCard} ${playlist.id === currentPlaylistId ? styles.active : ''
                                        } ${animationStore.currentAnimation === 'slide' &&
                                            index === activeAlbumIndex - 1 ? styles.prevCard : ''
                                        } ${animationStore.currentAnimation === 'slide' &&
                                            index === activeAlbumIndex + 1 ? styles.nextCard : ''
                                        }`}
                                    onClick={() => selectPlaylist(playlist, index)}
                                >
                                    <img
                                        src={playlist.cover}
                                        className={styles.albumCover}
                                        alt={playlist.title}
                                    />
                                    <div className={styles.playlistInfo}>
                                        <h3>{playlist.title}</h3>
                                        <p>{playlist.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className={`${styles.scrollArrow} ${styles.right} ${showRightArrow ? styles.visible : ''}`}
                        onClick={() => scroll(1)}
                        aria-label="向右滚动"
                    >
                        <SvgIcon icon="mdi:chevron-right" size={32} />
                    </button>
                </div>
            </section>

            {/* 歌曲列表 */}
            <section className={styles.hotSongs}>
                <h2>{currentPlaylistName}</h2>
                <SongList album={currentPlaylistId} />
            </section>
        </div>
    );
}