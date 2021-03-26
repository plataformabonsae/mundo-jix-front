import React, {useState, useEffect, useRef} from 'react'
import Slider from "@farbenmeer/react-spring-slider"

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { Chip } from 'components/Chip'

import styles from './styles.module.sass'

// TODO
// slide performance
// slide buttons

const Badges = () => {

    const [sliderWidth, setSiderWidth] = useState(0)
    const sliderWidthRef = useRef(null)

    useEffect(() => {
        setSiderWidth(sliderWidthRef.current.getBoundingClientRect().width);
    }, []); //empty dependency array so it only runs once at render

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>

            <header className={ styles.header }>
                <Title size={18} style={{ margin: '12px 0' }}>Insígnias</Title>

            </header>

            <article className={ styles.slider } ref={ sliderWidthRef }>
                <Slider
                    slidesAtOnce={4}>
                    <Chip 
                        insignia
                        title={`${sliderWidth}`}
                        desc={'Complete seu cadastro.'}
                        maxValue={100}
                        currentValue={67}
                        valueText={`${67}%`} />
                    <Chip 
                        insignia
                        title={'Top Cadastro'}
                        desc={'Complete seu cadastro.'}
                        maxValue={500}
                        currentValue={125}
                        valueText={`${125}/${500}`} />
                    <Chip 
                        insignia
                        title={'Top Cadastro'}
                        desc={'Complete seu cadastro.'}
                        maxValue={100}
                        currentValue={88}
                        valueText={`${88}%`} />
                    <Chip 
                        insignia
                        locked
                        title={'Top Cadastro'}
                        desc={'Complete seu cadastro.'}
                        maxValue={100}
                        currentValue={67}
                        valueText={`${25}%`} />
                </Slider>
            </article>
            
        </Card>
    )
}

export {
    Badges
}