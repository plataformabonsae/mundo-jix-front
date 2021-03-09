import React from 'react'

import styles from './styles.module.sass'


const TabSelect = ({Tag = 'button', children, href = '/', onClick, active, to}) => (
    <Tag 
        to={ to }
        href={ href } 
        onClick={ onClick } 
        className={` ${ styles.tab } ${ active ? styles.active : '' } `}>
        { children }
    </Tag>
)

const TabContent = ({ children }) => {
    
    return (
        <section className={ styles.content }>
            { children }
        </section>
    )
}

const TabWrapper = ({ children }) => (
    <section className={ styles.wrapper }>
        { children }
    </section>
)

export {
    TabSelect,
    TabContent,
    TabWrapper
}