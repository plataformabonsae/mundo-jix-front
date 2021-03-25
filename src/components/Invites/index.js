import React from 'react';

import person from 'assets/components/Invites/person.svg'

import styles from './styles.module.sass'

const Invites = ({ list }) => {

    return (
        <button className={ styles.invites }>
            <img src={ person } alt="Notificações" />
        </button>
    )
} 

export {
    Invites
}