import { CircularProgressbar } from 'react-circular-progressbar'


import { Card } from 'components/Card'
import { Text, Title } from 'components/Text'

import * as colors from 'utils/styles/Colors'

import padlock from 'assets/components/Chip/padlock.svg'

import styles from './styles.module.sass'


const Insignia = ({ children, title, desc, currentValue, maxValue, valueText, locked }) => (

    <Card
        border
        // noShadow
        className={ styles.card }>
            
        { !locked ? (    
            <CircularProgressbar 
                className={ styles.circle }
                value={ currentValue }
                maxValue={ maxValue }
                text={ <tspan>{valueText}</tspan> }
                styles={{
                    root: {},
                    path: {
                        stroke: colors.LIGHT_BLUE,
                        strokeLinecap: 'round',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        transform: 'rotate(0turn) scaleX(-1)',
                        transformOrigin: 'center center',
                    },
                    trail: {
                        stroke: colors.LIGHT_GRAY,
                        opacity: .4,
                        strokeLinecap: 'butt',
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    text: {
                        fill: colors.DARK_GRAY,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textAnchor: 'middle',
                        dominantBaseline: 'middle'
                    },
                }} />
        ) : (
            <div className={ styles.locked }>
                <img src={ padlock } alt="Conteúdo bloqueado" />
            </div>
        ) }
        <article className={ styles.content }>
            <Title size={16}>
                { title }
            </Title>
            <Text size={14} color={ colors.DARK_GRAY }>
                { desc }
            </Text>
        </article>
    </Card>
)

export { Insignia }
