// utils/lyrics-loader.ts
import type { Song, LyricLine } from '@/types/music'

export const loadLyric = async (song: string): Promise<LyricLine[]> => {
    try {
        // 通过路径拼接加载静态文件
        const response = await fetch(`${song}`)
        console.log(response)
        if (!response.ok) throw new Error('歌词加载失败')

        const lrcText = await response.text()
        // console.log(parseLRC(lrcText))
        // return []
        return parseLRC(lrcText)
    } catch (error) {
        console.error(`歌词加载失败: ${song}`, error)
        return []
    }
}

// 示例歌词解析器
const parseLRC = (content: string): LyricLine[] => {
    const lines: LyricLine[] = []
    const timeRegex =  /^\[(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))\](.*)$/

    content.split('\n').forEach(line => {
        // console.log('line', line)
        const matches = line.match(timeRegex)
        // console.log('matches', matches)
        if (matches) {
            lines.push({
                time: parseFloat(matches[1]) * 60 + parseFloat(matches[2])+ parseFloat(matches[3]) / 1000,
                text: matches[4].trim()
            })
        }
    })

    return lines.sort((a, b) => a.time - b.time)
}

// // 解析步骤分解
// const parseLRCLine = (line: string) => {
//     // 1. 提取时间标签和歌词文本
//     const timeTagRegex = /^$$(\d+):(\d+\.\d+)$$(.*)/;
//     const matches = line.match(timeTagRegex);

//     if (!matches) return null;

//     // 2. 分解时间组件
//     const minutes = parseInt(matches);    // 03 → 3
//     const seconds = parseFloat(matches);  // 48.37 → 48.37
//     const text = matches.trim();          // "人总是傻到失去才想要珍惜"

//     // 3. 计算总时间（秒）
//     const totalSeconds = minutes * 60 + seconds; // 3*60 + 48.37 = 228.37

//     // 4. 处理多语言歌词（示例）
//     const [mainText, translation] = text.split('@').map(t => t.trim());

//     // 5. 返回结构化数据
//     return {
//         time: Number(totalSeconds.toFixed(3)), // 228.370
//         text: mainText,
//         translation: translation || undefined,
//         raw: line
//     };
// };