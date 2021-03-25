import React from 'react';

import { Card } from 'components/Card'
import { Title } from 'components/Text'

const RecommendedChallenges = () => {

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>
            <Title size={18} style={{ margin: '24px 0' }}>Desafios recomendados</Title>
        </Card>
    )
}

export {
    RecommendedChallenges
}