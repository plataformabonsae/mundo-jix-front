import React from 'react'

import { NavLink } from 'react-router-dom'

import dashboardIcon from 'assets/components/Menu/dashboard.svg'
import meusDesafiosIcon from 'assets/components/Menu/meus-desafios.svg'
import desafiosIcon from 'assets/components/Menu/desafios.svg'
import perfilIcon from 'assets/components/Menu/perfil.svg'
import sairIcon from 'assets/components/Menu/sair.svg'

import styles from './styles.module.sass'


const Button = ({ children, to, active, dashboard, meusDesafios, desafios, perfil, sair }) => {

    return (
        <NavLink
            to={ to }
            activeClassName={ styles.active }
            className={ styles.button }>
            <img src={
                // eslint-disable-next-line
                dashboard && dashboardIcon ||
                // eslint-disable-next-line
                meusDesafios && meusDesafiosIcon ||
                // eslint-disable-next-line
                desafios && desafiosIcon ||
                // eslint-disable-next-line
                perfil && perfilIcon ||
                // eslint-disable-next-line
                sair && sairIcon
            } alt={`Navegar pelo site`} />
            { children }
        </NavLink>
    )
}

export {
    Button
}