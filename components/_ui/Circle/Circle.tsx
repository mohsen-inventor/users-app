import React from 'react';
import css from './Circle.module.scss';

interface Props {
    ui?: {
        size?: string, // circle size as percentage of it's parent container width
        minWidth?: number // circle min width/height in px
    }
    children: React.ReactNode;
}

const Circle = ({ children, ui }: Props) => {
    const minDimension = {
        minWidth: ui?.minWidth,
        minHeight: ui?.minWidth
    }

    return (
        <div className={css.circle} style={{ paddingBottom: ui?.size, ...minDimension }}>
            <div className={css.height}>
                <div className={css.width} style={{ paddingLeft: ui?.size, ...minDimension }}>
                    <div className={css.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Circle;