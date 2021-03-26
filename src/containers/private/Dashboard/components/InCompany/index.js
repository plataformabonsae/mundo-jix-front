

import React from 'react'

import { Card } from 'components/Card'
import { Title } from 'components/Text'
import { Chip } from 'components/Chip'

import styles from './styles.module.sass'

// TODO


const InCompany = () => {

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>

            <header className={ styles.header }>
                <Title size={18} style={{ margin: '12px 0' }}>In company</Title>

            </header>

            <article className={ styles.items }>
                    <Chip 
                        empresa={"incompany"}
                        data={`abertos`}
                        currentValue={100} />
                    <Chip 
                        empresa={"incompany"}
                        data={`cadastrados`}
                        currentValue={200} />
                    <Chip 
                        empresa={"incompany"}
                        data={`finalizados`}
                        currentValue={100} />
            </article>
            
        </Card>
    )
}

export {
    InCompany
}