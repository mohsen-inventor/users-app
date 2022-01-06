import React, { useRef } from 'react';
import css from './Button.module.scss';
// GSAP
import { gsap, Power4 } from 'gsap';

interface Props {
    config?: {
        type: 'button' | 'submit' | 'reset' // html button type
    }
    ui?: {
        type?: 'primary' | 'secondary' | 'icon' // ui weight type
        size?: 'default' | 'large' | 'small'
        width?: 'full'
        icon?: 'add-user' | 'edit' | 'close' | 'delete'
        noBorder?: boolean
        animation?: 'slide' | 'fade'
    }
    eClick?: (e: React.MouseEvent<HTMLElement>) => void
    children?: React.ReactNode,
}

const Button = ({ config, ui, eClick, children }: Props) => {
    const bgRef = useRef(null);

    let uiOptions = `${css[ui?.type || 'primary']} 
                     ${css[ui?.size || 'default']}
                     ${css[ui?.width || 'default']}
                     ${ui?.noBorder && css.removeBorder}`;

    const onHover = () => {
        const bg = bgRef.current;

        // Fade animation
        if (ui?.animation === 'fade') {
            gsap.set(bg, { left: 0, opacity: 0 });
            gsap.to(bg, { opacity: 1, duration: 0.2 });
            return;
        }

        // Slide animation
        gsap.to(bgRef.current, { left: 0, duration: 0.4, ease: Power4.easeOut });
    }

    const onHoverOut = () => {
        const bg = bgRef.current;

        // Fade animation
        if (ui?.animation === 'fade') {
            gsap.to(bg, { opacity: 0, duration: 0.2 });
            return;
        }
        // Slide animation
        gsap.to(bg, { left: '101%', duration: 0.4, ease: Power4.easeOut });
    }

    return (
        <div onMouseEnter={onHover} onMouseLeave={onHoverOut} className={`${css.button} ${uiOptions} `}>
            <button onClick={eClick} type={config?.type || 'button'}>
                {ui?.icon &&
                    <span className={css.iconWrap}>
                        <img src={`/images/${ui.icon}.svg`} />
                    </span>}
                {children && <span className={css.text}>{children}</span>}
            </button>
            <span ref={bgRef} className={css.background}></span>
        </div>
    )
}

export default Button;