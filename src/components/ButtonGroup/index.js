import React from 'react'

import styles from './styles.module.sass'

const ButtonGroup = ({ children }) => (
    <div className={ styles.buttons }>
        { children }
    </div>
)

export {
    ButtonGroup
}