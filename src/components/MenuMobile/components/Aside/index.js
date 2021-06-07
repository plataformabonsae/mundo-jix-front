import React from 'react'
import { animated } from 'react-spring'

import background from 'assets/components/Menu/background.png'

import styles from './styles.module.sass'


const Aside = ({ children, style, onMouseEnter, onMouseLeave }) => {

    return (
        <animated.aside 
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }
            className={ styles.aside } 
            style={{ backgroundImage: `url('${background}')`, ...style }}>
            <div className={ styles.wrapper }>
                { children }
            </div>
        </animated.aside>
    )
}

export {
    Aside
}