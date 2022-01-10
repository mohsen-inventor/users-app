import React from 'react';
import css from './Input.module.scss';
// Types
import { InputProps } from './../../../types/Form';

const Input = (props: InputProps) => {
    return (
        <div className={css.input}>
            {<label>{props.config?.label && <span className={css.labelText}>{props.config?.label}</span>}
                <input onChange={props.eChange} type='text' placeholder={props.config?.placeholder || 'Placeholder'} />
            </label>}
        </div>
    )
}

export default Input;