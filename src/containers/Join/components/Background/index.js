import React from 'react'

import styles from './styles.module.sass'



const Background = ({ children }) =>  (
    <section className={ styles.background}>
        { children }
    </section>
)


export default Background