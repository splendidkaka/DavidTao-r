// src/components/SongList/index.tsx
import { useMemo } from 'react';
import { useMusicStore } from '@/stores/music';
import type { Song } from '@/types/music';
import styles from './SongList.module.scss';

interface Props {
    album: string;
}

export default function SongList({ album }: Props) {
    const musicStore = useMusicStore();

    const albumSongs = useMemo(() => {
        return musicStore.getSongsByAlbum(album);
    }, [album, musicStore]);

    const handleSongClick = (song: Song) => {
        musicStore.playSong(song.id);
        console.log('song clicked:', song);
    };

    return (
        <ul className={styles.songList}>
            {albumSongs.map(song => (
                <li
                    key={song.id}
                    className={styles.songItem}
                    onClick={() => handleSongClick(song)}
                >
                    <img
                        src={musicStore.getAlbumCover(song.albumId)}
                        className={styles.albumCover}
                        alt={song.title}
                    />
                    <div className={styles.songInfo}>
                        <h3>{song.title}</h3>
                        <p>{musicStore.getArtistBySong(song.id)}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}