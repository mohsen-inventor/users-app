import React from 'react';
import css from './Button.module.scss';

interface Props {
    config?: {
        type: 'button' | 'submit' | 'reset' // html button type
    }
    ui?: {
        type?: 'primary' | 'secondary' // ui weight type
        size?: 'default' | 'large'
        icon?: 'add-user'
    }
    eClick?: (e: React.MouseEvent<HTMLElement>) => void
    children: React.ReactNode,
}

const Button = ({ config, ui, eClick, children }: Props) => {
    return (
        <div className={`${css.button} ${css[ui?.type || 'primary']} ${css[ui?.size || 'default']}`}>
            <button onClick={eClick} type={config?.type || 'button'}>
                {ui?.icon && <span className={css.icon}><img src={`/images/${ui.icon}.svg`} /></span>}
                <span className={css.text}>{children}</span>
            </button>
        </div>
    )
}

export default Button;