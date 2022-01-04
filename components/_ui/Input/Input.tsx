import React from 'react';
import css from './Input.module.scss';

interface Props {
    config?: {
        placeholder: string
    }
}

const Input = ({ config }: Props) => {
    return (
        <div className={css.input}>
            <input type='text' placeholder={config?.placeholder || 'Placeholder'} />
        </div>
    )
}

export default Input;