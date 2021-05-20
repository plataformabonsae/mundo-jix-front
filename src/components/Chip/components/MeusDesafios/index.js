import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from 'components/Card'
import { Title, Text } from 'components/Text'

import * as colors from 'utils/styles/Colors'

import styles from './styles.module.sass'

const MeusDesafios = ({ children, title, desc, currentValue, maxValue, valueText, locked, desafio, item }) => {

    const setBg = (current) => {
        const status = maxValue / 3
        if(current <= status) {
            return colors.ERROR
        }
        else if(current < (status*3)) {
            return colors.WARNING
        } else {
            return colors.SUCCESS
        }
    }

    return (
        <Link
            style={{textDecoration: 'none'}}
            to={`/meus-desafios/${item.challenge_type}/${item.id}`}>
            
            <Card
                border
                noShadow
                className={ styles.card }>
                    

                <Text size={10} weight="bold" className={ styles.desc }>{ item.challenge_type }</Text>

                <Title size={14} className={ styles.title }>
                    { item.name }
                </Title>
                    
                <div className={ styles.bar__wrapper }>
                    <span className={ styles.bar }>
                        <span className={ styles.bar__current } style={{ 
                                width: `${currentValue}%`,
                                background: setBg(currentValue)
                            }}></span>
                    </span>
                    <Text>{currentValue}%</Text>
                </div>

                <article className={ styles.error }>
                    <Text size={14} color={ colors.ERROR }>
                        { currentValue !== maxValue ? 'Projeto pendente!' : (<br />) }
                    </Text>
                </article>
            </Card>
        </Link>
    )
}

export { MeusDesafios }
