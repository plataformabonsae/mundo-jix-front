import React from 'react';

import bell from 'assets/components/Notification/bell.svg'

import styles from './styles.module.sass'

const Notification = ({ list }) => {

    return (
        <button className={ styles.notification }>
            <img src={ bell } alt="Notificações" />
        </button>
    )
} 

export {
    Notification
}