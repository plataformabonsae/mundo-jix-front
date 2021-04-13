import React from 'react'

import { Text } from 'components/Text'
import { Invites } from 'components/Invites'
import { Notification } from 'components/Notification'

import styles from './styles.module.sass'

const Header = ({ name, notifications, invites, user }) => {

    return (
        <header className={ styles.header }>
            <div className={ styles.welcome }>
                <Text size={18} className={ styles }>Boas vindas,</Text>
                <Text size={18} weight={'bold'} className={ styles.name }>{ user.name + ` ` + user.last_name }</Text>
            </div>
            <div className={ styles.alerts }>
                <Invites invites={ invites } />
                <Notification notification={ notifications } />
            </div>
        </header>
    )
}

const SubHeader = ({ children }) => {

    return (
        <header className={ styles.subheader }>
            { children }
        </header>
    )
}

export {
    Header,
    SubHeader
}