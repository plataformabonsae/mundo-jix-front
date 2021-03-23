import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.module.sass'

const Card = ({ children, style }) => (
    <section className={ styles.card } style={ style }>
        { children }
    </section>
)

const CardTabs = ({ children }) => (
    <Card style={{ textAlign: 'center', padding: 0 }}>
        <ol>
            { children }
        </ol>
    </Card>
)

const CardTabItem = ({ children, to }) => (
    <NavLink 
        activeClassName={ styles.cardTabItem__active }
        className={ styles.cardTabItem }
        to={ to }>
        { children }
    </NavLink>
)

export { 
    Card,
    CardTabs,
    CardTabItem
}