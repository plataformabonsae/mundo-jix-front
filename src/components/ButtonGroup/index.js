import React from 'react'

import styles from './styles.module.sass'

const ButtonGroup = ({ children, style, className }) => (
    <div className={ styles.buttons } style={style}>
        { children }
    </div>
)

export {
    ButtonGroup
}