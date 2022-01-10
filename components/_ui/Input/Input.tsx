import React from 'react';
import css from './Input.module.scss';
// Types
import { InputProps } from './../../../types/Form';

const Input = ({ config, validation, value, isValid, eChange }: InputProps) => {
    return (
        <div className={css.input}>
            {<label>{config?.label && <span className={css.labelText}>{config?.label}</span>}
                <input onChange={eChange} type='text' placeholder={config?.placeholder || 'Placeholder'} />
            </label>}
        </div>
    )
}

export default Input;