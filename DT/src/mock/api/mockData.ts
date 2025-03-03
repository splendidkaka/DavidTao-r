// mock/api/mockData.ts
import type { Artist, Album, Song, Playlist } from '@/types/music'

// 图片资源路径
const davidTaoCover = new URL('@/assets/covers/david-tao.jpg', import.meta.url).href
const imokCover = new URL('@/assets/covers/imok.jpg', import.meta.url).href
const blackTangerineCover = new URL('@/assets/covers/black.jpg', import.meta.url).href
const soulpowerCover = new URL('@/assets/covers/SP.jpg', import.meta.url).href
const taipingCover = new URL('@/assets/covers/taiping.jpg', import.meta.url).href

const JayCover = new URL('@/assets/covers/Jay.jpg', import.meta.url).href
const FantasyCover = new URL('@/assets/covers/ftx.jpg', import.meta.url).href
const EightDimensionCover = new URL('@/assets/covers/8.jpg', import.meta.url).href
const YepCover = new URL('@/assets/covers/yhm.jpg', import.meta.url).href
const QiLiXiangCover = new URL('@/assets/covers/7.jpg', import.meta.url).href

// 将音频文件放在 public/audio 目录
const preAudio = (filename: string): string => `/audio/${filename}`
// 将歌词文件放在 public/audio 目录
const preLrc = (filename: string): string => `/LRC/${filename}`
// const preAudio = (filename: string): string => `http://localhost:5173/src/public/audio/${filename}`
// const preAudio = (filename: string): string => new URL(`@/assets/audio/${filename}`, import.meta.url).href

// 从项目根目录开始计算路径
// const preAudio = (filename: string): string => {
//     return new URL(`../src/assets/audio/${filename}`, import.meta.url).href
//   }

const jaySongs = [
    // 2000年《Jay》
    {
        id: 'jay1-1',
        title: '可爱女人',
        duration: 251,
        audioUrl: preAudio('jay/1.mp3'),
        albumId: 'jay-1',
        artists: ['jay'],
        lyrics: preLrc('jay/1.lrc')
    },
    {
        id: 'jay1-2',
        title: '星晴',
        duration: 258,
        audioUrl: preAudio('jay/2.mp3'),
        albumId: 'jay-1',
        artists: ['jay'],
        lyrics: preLrc('jay/2.lrc')
    },
    {
        id: 'jay1-3',
        title: '黑色幽默',
        duration: 295,
        audioUrl: preAudio('jay/3.mp3'),
        albumId: 'jay-1',
        artists: ['jay'],
        lyrics: preLrc('jay/3.lrc')
    },
    {
        id: 'jay1-4',
        title: '龙卷风',
        duration: 235,
        audioUrl: preAudio('jay/4.mp3'),
        albumId: 'jay-1',
        artists: ['jay'],
        lyrics: preLrc('jay/4.lrc')
    },

    // 2001年《范特西》
    {
        id: 'jay2-1',
        title: '爱在西元前',
        duration: 227,
        audioUrl: preAudio('fantasy/1.mp3'),
        albumId: 'jay-2',
        artists: ['jay'],
        lyrics: preLrc('fantasy')
    },
    {
        id: 'jay2-2',
        title: '双截棍',
        duration: 195,
        audioUrl: preAudio('fantasy/2.mp3'),
        albumId: 'jay-2',
        artists: ['jay'],
        lyrics: preLrc('fantasy')
    },
    {
        id: 'jay2-3',
        title: '简单爱',
        duration: 268,
        audioUrl: preAudio('fantasy/3.mp3'),
        albumId: 'jay-2',
        artists: ['jay'],
        lyrics: preLrc('fantasy')
    },
    {
        id: 'jay2-4',
        title: '安静',
        duration: 315,
        audioUrl: preAudio('fantasy/4.mp3'),
        albumId: 'jay-2',
        artists: ['jay'],
        lyrics: preLrc('fantasy')
    },

    // 2002年《八度空间》
    {
        id: 'jay3-1',
        title: '半兽人',
        duration: 242,
        audioUrl: preAudio('8dimension/1.mp3'),
        albumId: 'jay-3',
        artists: ['jay'],
        lyrics: preLrc('8dimension/1.lrc')
    },
    {
        id: 'jay3-2',
        title: '半岛铁盒',
        duration: 326,
        audioUrl: preAudio('8dimension/2.mp3'),
        albumId: 'jay-3',
        artists: ['jay'],
        lyrics: preLrc('8dimension/2.lrc')
    },
    {
        id: 'jay3-3',
        title: '暗号',
        duration: 274,
        audioUrl: preAudio('8dimension/3.mp3'),
        albumId: 'jay-3',
        artists: ['jay'],
        lyrics: preLrc('8dimension/3.lrc')
    },

    // 2003年《叶惠美》
    {
        id: 'jay4-1',
        title: '以父之名',
        duration: 342,
        audioUrl: preAudio('yep/1.mp3'),
        albumId: 'jay-4',
        artists: ['jay'],
        lyrics: preLrc('yep/1.lrc')
    },
    {
        id: 'jay4-2',
        title: '晴天',
        duration: 269,
        audioUrl: preAudio('yep/2.mp3'),
        albumId: 'jay-4',
        artists: ['jay'],
        lyrics: preLrc('yep/2.lrc')
    },
    {
        id: 'jay4-3',
        title: '东风破',
        duration: 311,
        audioUrl: preAudio('yep/3.mp3'),
        albumId: 'jay-4',
        artists: ['jay'],
        lyrics: preLrc('yep/3.lrc')
    },

    // 2004年《七里香》
    {
        id: 'jay5-1',
        title: '七里香',
        duration: 295,
        audioUrl: preAudio('qi_li_xiang/1.mp3'),
        albumId: 'jay-5',
        artists: ['jay'],
        lyrics: preLrc('qi_li_xiang/1.lrc')
    },
    {
        id: 'jay5-2',
        title: '我的地盘',
        duration: 244,
        audioUrl: preAudio('qi_li_xiang/2.mp3'),
        albumId: 'jay-5',
        artists: ['jay'],
        lyrics: preLrc('qi_li_xiang/2.lrc')
    },
    {
        id: 'jay5-3',
        title: '搁浅',
        duration: 238,
        audioUrl: preAudio('qi_li_xiang/3.mp3'),
        albumId: 'jay-5',
        artists: ['jay'],
        lyrics: preLrc('qi_li_xiang/3.lrc')
    }
]
const jayAlbums = [
    {
        id: 'jay-1',
        title: 'Jay',
        artistId: 'jay',
        releaseYear: 2000,
        cover: JayCover,
        songs: [
            'jay1-1', 'jay1-2', 'jay1-3', 'jay1-4',
        ],
        description: '周杰伦首张同名专辑，开启华语乐坛新纪元'
    },
    {
        id: 'jay-2',
        title: '范特西',
        artistId: 'jay',
        releaseYear: 2001,
        cover: FantasyCover,
        songs: [
            'jay2-1', 'jay2-2', 'jay2-3', 'jay2-4',
            'jay2-5', 'jay2-6', 'jay2-7', 'jay2-8',
            'jay2-9', 'jay2-10'
        ],
        description: '音乐幻想世界，金曲奖最佳流行音乐演唱专辑'
    },
    {
        id: 'jay-3',
        title: '八度空间',
        artistId: 'jay',
        releaseYear: 2002,
        cover: EightDimensionCover,
        songs: [
            'jay3-1', 'jay3-2', 'jay3-3', 'jay3-4',
            'jay3-5', 'jay3-6', 'jay3-7', 'jay3-8',
            'jay3-9', 'jay3-10'
        ],
        description: '探索音乐的多维可能性'
    },
    {
        id: 'jay-4',
        title: '叶惠美',
        artistId: 'jay',
        releaseYear: 2003,
        cover: YepCover,
        songs: [
            'jay4-1', 'jay4-2', 'jay4-3', 'jay4-4',
            'jay4-5', 'jay4-6', 'jay4-7', 'jay4-8',
            'jay4-9', 'jay4-10'
        ],
        description: '以母亲命名的里程碑专辑，金曲奖年度专辑'
    },
    {
        id: 'jay-5',
        title: '七里香',
        artistId: 'jay',
        releaseYear: 2004,
        cover: QiLiXiangCover,
        songs: [
            'jay5-1', 'jay5-2', 'jay5-3', 'jay5-4',
            'jay5-5', 'jay5-6', 'jay5-7', 'jay5-8',
            'jay5-9', 'jay5-10'
        ],
        description: '诗意浪漫的夏日专辑，亚洲销量突破300万张'
    }
]

const dtSongs = [ // David Tao (1997)
    {
        id: 'song-1',
        title: '飞机场的10:30',
        duration: 316,
        audioUrl: preAudio('1.mp3'),
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('1.lrc')
    },
    {
        id: 'song-2',
        title: '爱，很简单',
        duration: 280,
        audioUrl: preAudio('2.mp3'),
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('2.lrc')
    },
    {
        id: 'song-3',
        title: '沙滩',
        duration: 283,
        audioUrl: '/audio/david-tao/blue-moon.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/blue-moon.lrc')
    },
    {
        id: 'song-4',
        title: '王八蛋',
        duration: 235,
        audioUrl: '/audio/david-tao/bastard.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/bastard.lrc')
    },
    {
        id: 'song-5',
        title: '望春风',
        duration: 200,
        audioUrl: '/audio/david-tao/wang-chun-feng.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/wang-chun-feng.lrc')
    },
    {
        id: 'song-6',
        title: '心乱飞',
        duration: 275,
        audioUrl: '/audio/david-tao/heart-flutter.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/heart-flutter.lrc')
    },
    {
        id: 'song-7',
        title: '是是非非',
        duration: 245,
        audioUrl: preAudio('ssff.mp3'),
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('ssff.lrc')
    },
    {
        id: 'song-8',
        title: '流沙',
        duration: 294,
        audioUrl: '/audio/david-tao/quicksand.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/quicksand.lrc')
    },
    {
        id: 'song-9',
        title: 'Take 6 Minus 3',
        duration: 189,
        audioUrl: '/audio/david-tao/take6minus3.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/take6minus3.lrc')
    },
    {
        id: 'song-10',
        title: '十七岁',
        duration: 260,
        audioUrl: '/audio/david-tao/seventeen.mp3',
        albumId: 'album-1',
        artists: ['dt'],
        lyrics: preLrc('david-tao/seventeen.lrc')
    },
    // 其他专辑歌曲示例...// 
    // ======================
    // I'm OK (1999) 专辑
    // ======================
    {
        id: 'song-11',
        title: 'Doxology',
        duration: 302,
        audioUrl: '/audio/imok/regular-friend.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/doxology.lrc')
    },
    {
        id: 'song-12',
        title: '找自己',
        duration: 254,
        audioUrl: '/audio/imok/find-myself.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/find-myself.lrc')
    },
    {
        id: 'song-13',
        title: '小镇姑娘',
        duration: 284,
        audioUrl: '/audio/imok/small-town-girl.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/small-town')
    },
    {
        id: 'song-14',
        title: '夜来香',
        duration: 234,
        audioUrl: '/audio/imok/tuberose.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/tuberose.lrc')
    },
    {
        id: 'song-15',
        title: '普通朋友',
        duration: 302,
        audioUrl: '/audio/imok/regular-friend.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/regular')
    },
    {
        id: 'song-16',
        title: 'i\'m ok',
        duration: 302,
        audioUrl: '/audio/imok/regular-friend.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/im-ok.lrc')
    },
    {
        id: 'song-17',
        title: '说走就走',
        duration: 302,
        audioUrl: '/audio/imok/regular-friend.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/leave-now.lrc')
    },
    {
        id: 'song-18',
        title: '多谢你',
        duration: 245,
        audioUrl: '/audio/imok/leave-now.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/leave-now.lrc')
    }, {
        id: 'song-19',
        title: '马戏团',
        duration: 245,
        audioUrl: '/audio/imok/leave-now.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/circus.mp3')
    },
    {
        id: 'song-20',
        title: '天天',
        duration: 245,
        audioUrl: '/audio/imok/leave-now.mp3',
        albumId: 'album-2',
        artists: ['dt'],
        lyrics: preLrc('imok/leave-now.lrc')
    },
    // ======================
    // 黑色柳丁 (2002) 专辑
    // ======================
    {
        id: 'song-21',
        title: '黑色柳丁',
        duration: 265,
        audioUrl: '/audio/black-tangerine/black-tangerine.mp3',
        albumId: 'album-3',
        artists: ['dt'],
        lyrics: preLrc('black-tangerine/black-tangerine.lrc')
    },
    {
        id: 'song-22',
        title: '今天晚间新闻',
        duration: 127,
        audioUrl: '/audio/black-tangerine/nightly-news.mp3',
        albumId: 'album-3',
        artists: ['dt'],
        lyrics: preLrc('black-tangerine/nightly-news.lrc')
    },
    {
        id: 'song-23',
        title: 'Dear God',
        duration: 314,
        audioUrl: '/audio/black-tangerine/dear-god.mp3',
        albumId: 'album-3',
        artists: ['dt'],
        lyrics: preLrc('black-tangerine/dear-god.lrc')
    },
    {
        id: 'song-24',
        title: 'Angel',
        duration: 245,
        audioUrl: '/audio/black-tangerine/angel.mp3',
        albumId: 'album-3',
        artists: ['dt'],
        lyrics: preLrc('black-tangerine/angel.lrc')
    },
    {
        id: 'song-25',
        title: 'Melody',
        duration: 245,
        audioUrl: '/audio/black-tangerine/angel.mp3',
        albumId: 'album-3',
        artists: ['dt'],
        lyrics: preLrc('black-tangerine/melody.lrc')
    },
    {
        id: 'song-26',
        title: '讨厌红楼梦',
        duration: 284,
        audioUrl: '/audio/black-tangerine/red-chamber.mp3',
        albumId: 'album-3',
        artists: ['dt'],
        lyrics: preLrc('black-tangerine/red-chamber.lrc')
    }]
const dtAlbums = [
    {
        id: 'album-1',
        title: 'David Tao',
        artistId: 'dt',
        releaseYear: 1997,
        cover: davidTaoCover,
        songs: [
            'song-1', 'song-2', 'song-3', 'song-4', 'song-5',
            'song-6', 'song-7', 'song-8', 'song-9', 'song-10'
        ],
        description: '陶喆首张同名专辑'
    },
    {
        id: 'album-2',
        title: 'I\'m OK',
        artistId: 'dt',
        releaseYear: 1999,
        cover: imokCover,
        songs: Array.from({ length: 20 - 11 + 1 }, (_, index) => `song-${11 + index}`),
        description: '陶喆第二张专辑'
    },
    {
        id: 'album-3',
        title: '黑色柳丁',
        artistId: 'dt',
        releaseYear: 2002,
        cover: blackTangerineCover,
        songs: Array.from({ length: 26 - 21 + 1 }, (_, index) => `song-${21 + index}`), // 示例歌曲ID
        description: '陶喆第三张专辑'
    },
    {
        id: 'album-4',
        title: 'Soul Power Live',
        artistId: 'dt',
        releaseYear: 2003,
        cover: soulpowerCover,
        songs: ['song-16', 'song-17'], // 示例歌曲ID
        description: '陶喆演唱会现场专辑'
    },
    {
        id: 'album-5',
        title: '太平盛世',
        artistId: 'dt',
        releaseYear: 2005,
        cover: taipingCover,
        songs: ['song-18', 'song-19'], // 示例歌曲ID
        description: '陶喆第五张专辑'
    }
]

// const FangSongs=[]


// 艺人数据
export const mockArtists: Artist[] = [
    {
        id: 'dt',
        name: '陶喆',
        avatar: new URL('@/assets/artists/david-tao.jpg', import.meta.url).href,
        description: '华语R&B音乐教父',
        albums: ['album-1', 'album-2', 'album-3', 'album-4', 'album-5']
    },
    // 其他艺人数据...
    {
        id: 'jay',
        name: '周杰伦',
        avatar: new URL('@/assets/artists/jay-chou.jpg', import.meta.url).href,
        description: '中国流行音乐天王',
        albums: ['jay-1', 'jay-2', 'jay-3', 'jay-4', 'jay-5'] // 示例专辑ID，需替换为真实专辑ID
    }
]

// 专辑数据
export const mockAlbums: Album[] = [
    ...dtAlbums,
    ...jayAlbums
]

// 歌曲数据
export const mockSongs: Song[] = [
    ...dtSongs,
    ...jaySongs
]

// 播放列表数据
export const mockPlaylists: Playlist[] = [
    {
        id: 'playlist-1',
        name: '陶喆精选',
        description: '历年经典作品合集',
        cover: davidTaoCover,
        songs: [
            'song-1', 'song-2', 'song-8', 'song-14', 'song-18'
        ]
    },
    {
        id: 'playlist-2',
        name: 'R&B之夜',
        description: '灵魂节奏蓝调精选',
        cover: soulpowerCover,
        songs: ['song-1', 'song-2', 'song-15']
    }
]



