import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import css from './Input.module.scss';
// Types
import { InputProps, InputType } from './../../../types/Form';

const Input = ({ id, value, label, type, placeholder, validationRules, isValid, eChange }: InputProps) => {
    const [errors, setErrors] = useState([]);

    // Validation schema
    let schema = yup.object().shape({
        val: validationRules
    })

    const onBlur = (e: any) => {
        let val = e.target.value;

        schema.validate({ val }).catch(err => {
            setErrors(err.errors);
        });

        schema.isValid({ val }).then(valid => {
            if (valid) {
                setErrors([]);
            }
            isValid(valid); // send the input valid status to the parent form
        });
    }

    return (
        <div className={css.input}>
            {<label>
                <span className={css.textWrap}>
                    {label && <span className={css.labelText}>{label}</span>}
                    {errors && <span className={css.error}>{errors}</span>}
                </span>
                <input
                    id={id} name={id} value={value}
                    onBlur={onBlur} onChange={eChange}
                    type={type || InputType.Text}
                    placeholder={placeholder || 'Placeholder'} />
            </label>}

        </div>
    )
}

export default Input;