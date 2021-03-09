import React from 'react'

import styles from './styles.module.sass'


const Button = ({ Tag = 'button', type, link, to, href, target, onClick, onMouseOver, children }) => {

    return (
        <Tag
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