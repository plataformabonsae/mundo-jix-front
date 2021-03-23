import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.sass'


const Button = ({ Tag = Link, type, link, to, href, target, onClick, onMouseOver, children, submit }) => {

    return (
        <Tag
            type={submit ? 'submit' : ''}
            link={ link }
            to={ to }
            href={ href }
            target={ target }
            onClick={ onClick }
            onMouseOver={ onMouseOver }
            className={ `${ styles.button } ${ styles.[type] }` }>
            { children }
        </Tag>
    )
}

export default Button