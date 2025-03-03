// src/components/SvgIcon/index.tsx
import { Icon } from '@iconify/react';
import React, { CSSProperties, MouseEvent } from 'react';
import styles from './SvgIcon.module.scss';

interface Props {
    /** 图标名称，格式: 集合-图标名，例如: mdi-home */
    icon: string;
    /** 图标尺寸（单位: px） */
    size?: number | string;
    /** 图标颜色 */
    color?: string;
    /** 自定义样式 */
    inlineStyle?: CSSProperties;
    /** 点击事件 */
    onClick?: (event: MouseEvent) => void;
    /** 自定义类名 */
    className?: string;
    /** 其他 HTML 属性 */
    style?: CSSProperties;
}

export default function SvgIcon({
    icon,
    size = 24,
    color = 'currentColor',
    inlineStyle = {},
    className = '',
    onClick,
    style,
    ...rest
}: Props) {
    // 合并样式：inlineStyle 优先级高于 style
    const mergedStyle = { ...inlineStyle, ...style };

    return (
        <Icon
            icon={icon}
            width={size}
            height={size}
            color={color}
            className={`${styles.svgIcon} ${className}`}
            style={mergedStyle}
            onClick={onClick}
            {...rest}
        />
    );
}