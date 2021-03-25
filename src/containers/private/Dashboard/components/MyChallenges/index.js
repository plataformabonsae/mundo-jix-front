import React from 'react'
import Slider from "@farbenmeer/react-spring-slider"

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { Chip } from 'components/Chip'
import { Filter } from 'components/Filter'

import styles from './styles.module.sass'

// TODO


const MyChallenges = () => {

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>

            <header className={ styles.header }>
                <Title size={18} style={{ margin: '12px 0' }}>Meus desafios</Title>
                <div className="filters">
                    <Filter active>
                        Todos
                    </Filter>
                    <Filter>
                        Autodesafio
                    </Filter>
                    <Filter>
                        In company
                    </Filter>
                    <Filter>
                        Ultradesafio
                    </Filter>
                </div>
            </header>

            <article className={ styles.slider }>
                <Slider
                    slidesAtOnce={3}>
                    <Chip 
                        meusDesafios
                        title={`Nome do desafio`}
                        desc={'Autodesafio'}
                        maxValue={100}
                        currentValue={100}/>
                    <Chip 
                        meusDesafios
                        title={'Nome do desafio'}
                        desc={'in company'}
                        maxValue={100}
                        currentValue={80} />
                    <Chip 
                        meusDesafios
                        title={'Nome do desafio'}
                        desc={'ultradesafio'}
                        maxValue={100}
                        currentValue={20} />
                    <Chip 
                        meusDesafios
                        locked
                        title={'Nome do desafio'}
                        desc={'autodesafio'}
                        maxValue={100}
                        currentValue={67} />
                </Slider>
            </article>
            
        </Card>
    )
}

export {
    MyChallenges
}