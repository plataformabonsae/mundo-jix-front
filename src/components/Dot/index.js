import React from 'react';

import styles from './styles.module.sass'

const Dot = ({color}) => (
    <span className={ styles.dot } style={{ background: color }}></span>
)

export {
    Dot
}