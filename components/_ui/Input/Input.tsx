import React, { useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import css from './Input.module.scss';
import { gsap, Power4, Bounce } from 'gsap';
// Types
import { InputProps, InputType } from './../../../types/Form';

const Input = ({ id, value, label, type, placeholder, validationRules, isValid, eChange }: InputProps) => {
    const [errors, setErrors] = useState(null);
    const [hasError, setHasError] = useState(false);
    const errRef = useRef(null);

    useEffect(() => {
        if (hasError) {
            // Show error
            gsap.to(errRef.current, { y: 0, opacity: 1, duration: 0.2, ease: Bounce.easeOut });
        } else {
            // Hide error
            gsap.to(errRef.current, { y: 40, opacity: 0, duration: 0.2, ease: Bounce.easeIn });
        }
    }, [hasError])


    // Validation schema
    let schema = yup.object().shape({
        val: validationRules
    })

    const onBlur = (e: any) => {
        let val = e.target.value.trim();

        schema.validate({ val }).catch(err => {
            setErrors(err.errors);
        });

        schema.isValid({ val }).then(valid => {
            valid ? setErrors(null) : null;
            // send the input valid status to the parent form
            isValid ? isValid(valid) : null;
            setHasError(!valid);
        });
    }

    return (
        <div className={`${css.input} ${hasError && css.hasError}`}>
            {<label>
                <span className={css.textWrap}>
                    {label && <span className={css.labelText}>{label}</span>}
                    <span ref={errRef} className={css.error}>{errors}</span>
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