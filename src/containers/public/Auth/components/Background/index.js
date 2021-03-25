import React from 'react'

import styles from './styles.module.sass'
import Typography from 'utils/styles/Typography.module.sass'



const Background = ({ position, title, text }) => {
    
    if ( position !== 'full' ) {
        return (
            <section className={ position === 'right' ? styles.right : styles.left}>
                <article className={ styles.wrapper }>
                    <h1 className={ styles.title && Typography.TITLE_24 }>
                        { title }
                    </h1>
                    <p className={ styles.text && Typography.BODY_16 }>
                        { text }
                    </p>
                </article>
            </section>
        )
    }

}

export default Background