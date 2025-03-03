// types/music.ts

// 歌手类型
export interface Artist {
    id: string;
    name: string;
    avatar: string;       // 歌手头像URL
    description?: string; // 歌手简介
    albums: string[];     // 专辑ID数组
}

// 专辑类型
export interface Album {
    id: string;
    title: string;
    artistId: string;     // 所属歌手ID
    releaseYear: number;  // 发行年份
    cover: string;        // 专辑封面URL
    songs: string[];      // 歌曲ID数组
    description: string; // 专辑简介
}

// 歌曲类型
export interface Song {
    [x: string]: any;
    id: string;
    title: string;
    duration: number;     // 时长（秒）
    audioUrl: string;     // 音频文件URL
    albumId: string;      // 所属专辑ID
    artists: string[];    // 参与艺术家ID数组（支持合作歌曲）
    lyrics: string;       // 歌词文本
}

// 播放列表类型
export interface Playlist {
    id: string;
    name: string;
    description?: string;
    cover: string;       // 播放列表封面
    songs: string[];     // 歌曲ID数组
}
// 歌词行类型
export interface LyricLine {
    time: number // 时间戳（秒）
    text: string // 歌词内容
    translation?: string // 可选翻译文本
}