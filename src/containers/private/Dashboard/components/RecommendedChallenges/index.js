import React, { 
    // useState, 
    // useEffect
} from 'react'
import { useSelector } from 'react-redux'
// import Slider from "@farbenmeer/react-spring-slider"
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card } from 'components/Card'
import Button from 'components/Button'
import { Title, Text } from 'components/Text'
import { Filter } from 'components/Filter'

import 'swiper/swiper.scss'
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

import styles from './styles.module.sass'
import * as  colors from 'utils/styles/Colors'

// TODO


// install Swiper modules
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RecommendedChallenges = () => {

    const { data } = useSelector(state => state.dashboard )

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

            { data?.challenges &&
            <article className={ styles.slider }>
                <Swiper
                    spaceBetween={24}
                    slidesPerView={2}>
                    { data?.challenges.map((item, index) => {
                    return (
                        <SwiperSlide>
                        <Card
                            key={ item.id }  
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
                                { item.challenge_type === 'in_company' ? 'In Company' : item.challenge_type }
                            </Text>
                            <Title size={18} style={{ margin: '12px 0' }}>
                                { item.name }
                            </Title>
                            <Text>
                                { item.description }
                            </Text>
                            <hr style={{ opacity: .5, margin: '12px 0' }} />
                            <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                                Pontos
                            </Text>
                            <Text size={14}>
                                { item.badge_points ? item.badge_points : 'Sem pontos' } 
                            </Text>
                            <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                                Skill desenvolvida
                            </Text>
                            <Text size={14}>
                                { item.grade ? item.grade : 'Sem skill' }
                            </Text>
                            <Text color={ colors.LIGHT_BLACK } size={16} style={{ margin: '12px 0 6px' }}>
                                Insígnias
                            </Text>
                            <Text size={14}>
                                { item.grade ? item.grade : 'Sem insígnia' }
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
                        </SwiperSlide>
                        )
                    }) }    
                </Swiper>
            </article>
             }
        </Card>
    )
}

export {
    RecommendedChallenges
}