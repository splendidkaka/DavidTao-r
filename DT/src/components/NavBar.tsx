// Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMusicStore } from '@/stores/music';
import type { Artist } from '@/types/music';
import styles from './Navbar.module.scss'; // 修改为模块化样式

export default function Navbar() {
    const musicStore = useMusicStore();
    const location = useLocation();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navLinks = [
        { name: '发现音乐', path: '/', icon: '🎵' },
        { name: '热门专辑', path: '/albums', icon: '🎧' },
        { name: '排行榜', path: '/charts', icon: '🏆' }
    ];

    useEffect(() => {
        setArtists(Object.values(musicStore.artists));
    }, [musicStore.artists]);

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(`.${styles.artistDropdown}`)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                <span className={styles.logoIcon}>🎸</span>
                <span className={styles.logoText}>MUSIC CENTER</span>
            </Link>

            <div className={styles.navContent}>
                <div className={styles.navLinks}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''
                                }`}
                        >
                            <span className={styles.linkIcon}>{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className={styles.artistDropdown}>
                    <div
                        className={styles.dropdownTrigger}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className={styles.triggerIcon}>👨🎤</span>
                        <span className={styles.triggerText}>选择歌手</span>
                        <span className={`${styles.arrow} ${isDropdownOpen ? styles.open : ''
                            }`}>▼</span>
                    </div>

                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            {artists.map(artist => (
                                <div
                                    key={artist.id}
                                    className={styles.dropdownItem}
                                    onClick={() => musicStore.setSelectedArtistId(artist.id)}
                                >
                                    <div className={styles.artistInfo}>
                                        <div className={styles.artistName}>{artist.name}</div>
                                        <div className={styles.artistAlbums}>
                                            {artist.albums.length} 张专辑
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}