import React from 'react'
import css from './Page.module.scss';

interface Props {
    children: React.ReactNode;
}

export const Page = ({ children }: Props) => {
    return (
        <div className={css.page}>
            {children}
        </div>
    )
}
