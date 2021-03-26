import React from 'react'
// import Slider from "@farbenmeer/react-spring-slider"

import { Card } from 'components/Card'
import Button from 'components/Button'
import { Title, Text } from 'components/Text'
import { Filter } from 'components/Filter'

import styles from './styles.module.sass'
import * as  colors from 'utils/styles/Colors'

// TODO


const RecommendedChallenges = () => {

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>

            <header className={ styles.header }>
                <Title size={18} style={{ margin: '12px 0' }}>Desafios recomendados</Title>
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
                {/* <Slider
                    slidesAtOnce={2}> */}
                    <Card
                        border
                        noShadow>
                        <Text 
                            color={ colors.MEDIUM_GRAY } 
                            size={12} 
                            weight="bold" 
                            style={{ 
                                letterSpacing: 1,
                                textTransform: 'uppercase' 
                        }}>
                            Autodesafio
                        </Text>
                        <Title size={18} style={{ margin: '12px 0' }}>
                            Nome do desafio
                        </Title>
                        <Text>
                            Etiam et sapien a massa lacinia ultricies. Morbi posuere ultricies vulputate. Nulla pellentesque laoreet nunc, dictum...
                        </Text>
                        <hr style={{ opacity: .5, margin: '12px 0' }} />
                        <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                            Pontos
                        </Text>
                        <Text size={14}>
                            15 (quinze) 
                        </Text>
                        <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                            Skill desenvolvida
                        </Text>
                        <Text size={14}>
                            skill 1, skill 2, skill 3
                        </Text>
                        <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                            Insígnias
                        </Text>
                        <Text size={14}>
                            categoriaum, categoriadois, categoriatrês
                        </Text>
                        <hr style={{ opacity: .5, margin: '12px 0' }} />
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                            <Button
                                style={{ color: colors.BLUE_1, fontSize: 14 }}
                                arrow
                                transparent>
                                    Ver desafio
                            </Button>
                        </div>
                    </Card>
                    <Card
                        border
                        noShadow>
                        <Text 
                            color={ colors.MEDIUM_GRAY } 
                            size={12} 
                            weight="bold" 
                            style={{ 
                                letterSpacing: 1,
                                textTransform: 'uppercase' 
                        }}>
                            Autodesafio
                        </Text>
                        <Title size={18} style={{ margin: '12px 0' }}>
                            Nome do desafio
                        </Title>
                        <Text>
                            Etiam et sapien a massa lacinia ultricies. Morbi posuere ultricies vulputate. Nulla pellentesque laoreet nunc, dictum...
                        </Text>
                        <hr style={{ opacity: .5, margin: '12px 0' }} />
                        <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                            Pontos
                        </Text>
                        <Text size={14}>
                            15 (quinze) 
                        </Text>
                        <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                            Skill desenvolvida
                        </Text>
                        <Text size={14}>
                            skill 1, skill 2, skill 3
                        </Text>
                        <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                            Insígnias
                        </Text>
                        <Text size={14}>
                            categoriaum, categoriadois, categoriatrês
                        </Text>
                        <hr style={{ opacity: .5, margin: '12px 0' }} />
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                            <Button
                                style={{ color: colors.BLUE_1, fontSize: 14 }}
                                arrow
                                transparent>
                                    Ver desafio
                            </Button>
                        </div>
                    </Card>
                {/* </Slider> */}
            </article>
            
        </Card>
    )
}

export {
    RecommendedChallenges
}