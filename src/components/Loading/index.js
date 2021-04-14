import React from 'react'
import { useSpring, animated } from 'react-spring'

import styles from './styles.module.sass'

import logo from 'assets/logo/logo_color.png'

const Loading = ({ text }) => {

    const props = useSpring({ opacity: 1, from: { opacity: 0 }})

    return (
        <section className={ styles.wrapper }>
            <animated.div style={ props } >
                <img src={ logo } alt="Mundo Jix" />
            </animated.div>
        </section>
    )
}

export {
    Loading
}