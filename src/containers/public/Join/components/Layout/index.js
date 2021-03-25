import React from 'react'

import styles from './styles.module.sass'

const Layout = ({children}) => {

    return (
        <article className={ styles.wrapper }>
            { children }
        </article>
    )
}

export {
    Layout
}