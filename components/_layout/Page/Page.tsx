import React from 'react'
import css from './Page.module.scss';

import ScrollTop from './../../_ui/ScrollTop/ScrollTop';

interface Props {
    children: React.ReactNode;
}

const Page = ({ children }: Props) => {
    return (
        <div className={css.page}>
            {children}
            <ScrollTop />
        </div>
    )
}

export default Page;
