import React from 'react'
import css from './Page.module.scss';

interface Props {
    children: React.ReactNode;
}

const Page = ({ children }: Props) => {
    return (
        <div className={css.page}>
            {children}
        </div>
    )
}

export default Page;
