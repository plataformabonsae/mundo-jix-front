import React from 'react'

import styles from './styles.module.sass'

const Layout = ({children, center, style, className}) => {

    return (
        <article 
            className={ `${styles.wrapper} ${className ? className : 0 }` } 
            style={ { marginLeft: center ? 'auto' : 0,
            marginRight: center ? 'auto' : 0, ...style} }>
            { children }
        </article>
    )
}

export {
    Layout
}