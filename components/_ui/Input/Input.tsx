import React, { ChangeEvent, useEffect, useRef } from 'react';
import * as yup from 'yup';
import css from './Input.module.scss';
// Types
import { InputProps, InputType } from './../../../types/Form';

const Input = ({ id, value, label, type, placeholder, validationRules, isValid, eChange }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Validation schema
    let schema = yup.object().shape({
        inputValue: validationRules
    })

    const onBlur = (e: any) => {
        schema.validate(e.target.value).catch((err) => {
            // console.log(err.errors);
        });
    }

    return (
        <div className={css.input}>
            {<label>{label && <span className={css.labelText}>{label}</span>}
                <input
                    ref={inputRef} id={id} name={id}
                    onBlur={onBlur} value={value} onChange={eChange}
                    type={type || InputType.Text}
                    placeholder={placeholder || 'Placeholder'} />
            </label>}
        </div>
    )
}

export default Input;