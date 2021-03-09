import React from 'react'

import styles from './styles.module.sass'


const InputWrapper = ({ children }) => (
    <div className={ styles.wrapper }>
        { children }
    </div>
)

const Input = ({ ref, name, value, placeholder, type, onChange, children, checked }) => (
    <label className={ styles.input }>
        <span>{ children }</span>
        <input
            name={ name }
            type={ type ? type : 'text' }
            value={ value }
            placeholder={ placeholder }
            onChange={ onChange }
            ref={ ref } />
    </label>
)

const Checkbox = ({ ref, name, value, placeholder, onChange, children, checked }) => (
    <label className={ styles.inputCheckbox }>
        <input
            name={ name }
            type='checkbox'
            value={ value }
            checked={ checked }
            placeholder={ placeholder }
            onChange={ onChange }
            ref={ ref } />
        <span>{ children }</span>
    </label>
)

export {
    Input,
    Checkbox,
    InputWrapper
}