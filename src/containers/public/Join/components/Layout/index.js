import React from 'react'

import styles from './styles.module.sass'

const Layout = ({children, center}) => {

    return (
        <article 
            className={ styles.wrapper } 
            style={{ 
                marginLeft: center ? 'auto' : 0,
                marginRighe: center ? 'auto' : 0}}>
            { children }
        </article>
    )
}

export {
    Layout
}