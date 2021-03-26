import React from 'react';

import { Title, Text } from 'components/Text'
import Button from 'components/Button'

import styles from './styles.module.sass'


const Banner = ({ title, desc, to }) => (
    <section className={ styles.banner }>
        <article className={ styles.content }>
            <Title size={36} color={"white"}>
                { title }
            </Title>
            <Text color={"white"} style={{ margin: '12px 0' }}>
                { desc }
            </Text>
            <Button type={"tertiary"}>
                Criar desafio
            </Button>
        </article>
    </section>
)

export {
    Banner
}

