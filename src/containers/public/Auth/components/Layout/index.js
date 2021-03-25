import React from 'react'

import styles from './styles.module.sass'



const Card = ({children, position}) => {
    return (
        <main className={ styles.card }>
            { children }
        </main>
    )   
}

const Wrapper = ({children, background}) => {

    const backgroundPosition = {
        gridTemplateColumns: background === 'left' ? '2fr 3fr' : '3fr 2fr'
    }
    return (
        <div className={styles.wrapper} style={backgroundPosition}>
            { children } 
        </div>
    )   
}


export {
    Card,
    Wrapper
}