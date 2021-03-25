import React from 'react'

import { Text } from 'components/Text'

import styles from './styles.module.sass'


const Filter = ({ children, active }) => {

    return (
        <button className={`${ styles.filter } ${ active ? styles.active : '' }`}>
            <Text>
                { children }
            </Text>
        </button>
    )
}

export {
    Filter
}