import React from 'react';
import css from './Input.module.scss';

interface Props {
    config?: {
        label?: string
        placeholder?: string
    }
}

const Input = ({ config }: Props) => {
    return (
        <div className={css.input}>
            {<label>{config?.label && <span className={css.labelText}>{config?.label}</span>}
                <input type='text' placeholder={config?.placeholder || 'Placeholder'} />
            </label>}
        </div>
    )
}

export default Input;