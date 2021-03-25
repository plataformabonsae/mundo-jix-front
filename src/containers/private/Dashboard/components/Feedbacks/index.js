import React from 'react';

import { Card } from 'components/Card'
import { Title } from 'components/Text'

const Feedbacks = () => {

    return (
        <Card border gray style={{ gridArea: 'insignia', marginBottom: 24 }}>
            <Title size={18} style={{ margin: '24px 0' }}>Insígnias</Title>
        </Card>
    )
}

export {
    Feedbacks
}