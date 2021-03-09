import React from 'react'

import styles from './styles.module.sass'

const Card = ({ children, style }) => (
    <section className={ styles.card } style={ style }>
        { children }
    </section>
)

export default Card