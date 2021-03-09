import React from 'react'

import Card from 'components/Card'
import Logo from 'components/Logo'
import Button from 'components/Button'
import Copyright from 'components/Copyright'


import styles from './styles.module.sass'


const Terms = ({ children }) => (
    <article className={ styles.wrapper }>
        
        <Logo color="white" />

        <Card>
            { children }
        </Card>

        <Card style={{ textAlign: 'center' }}>
            <b>Deseja completar seu cadastro agora ou depois?</b>
        </Card>

        <div className={ styles.buttons }>

            <Button
                type="outlineWhite">
                Fazer depois
            </Button>
            <Button
                type="secondary">
                Completar agora
            </Button>

        </div>

        <Copyright color="white" />
    </article>
)

export default Terms