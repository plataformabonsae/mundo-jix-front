import React from 'react'

import { Card } from 'components/Card'
import { Title } from 'components/Text'

import * as colors from 'utils/styles/Colors'

import autodesafio from 'assets/components/Chip/autodesafio.svg'
import incompany from 'assets/components/Chip/incompany.svg'
import ultradesafio from 'assets/components/Chip/ultradesafio.svg'

import styles from './styles.module.sass'

const Challenges = ({ children, title, desc, currentValue, maxValue, valueText, locked, desafio }) => {
    
    const types = {
        autodesafio: {
            image: autodesafio,
            color: colors.AUTODESAFIO
        },
        incompany: {
            image: incompany,
            color: colors.INCOMPANY
        },
        ultradesafio: {
            image: ultradesafio,
            color: colors.ULTRADESAFIO
        },
    }

    return (
        <Card
            border
            noShadow
            className={ styles.card }>
                
            <div 
                className={ styles.icon } 
                style={{ backgroundColor: types[desafio].color }}>
                <img src={ types[desafio].image } alt={ title } />
            </div>

            <article className={ styles.content }>
                <Title size={28}>
                    { currentValue }
                </Title>
                <Title size={12}>
                    { title }
                </Title>
            </article>
        </Card>
    )
}

export { Challenges }
