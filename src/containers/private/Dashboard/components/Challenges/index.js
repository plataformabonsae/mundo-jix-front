

import React from 'react'

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { Chip } from 'components/Chip'

import styles from './styles.module.sass'

// TODO


const Challenges = () => {

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>

            <header className={ styles.header }>
                <Title size={18} style={{ margin: '12px 0' }}>Desafios finalizados</Title>

            </header>

            <article className={ styles.items }>
                    <Chip 
                        desafio={"autodesafio"}
                        title={`Autodesafios`}
                        currentValue={10} />
                    <Chip 
                        desafio={"incompany"}
                        title={'In company'}
                        currentValue={4} />
                    <Chip 
                        desafio={"ultradesafio"}
                        title={'Ultradesafio'}
                        currentValue={2} />
            </article>
            
        </Card>
    )
}

export {
    Challenges
}