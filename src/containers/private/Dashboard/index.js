import React from 'react'
import { useParams } from 'react-router-dom'

import { Menu } from 'components/Menu'
import { Header } from 'components/Header'
import { Banner } from 'components/Banner'

import { Badges } from './components/Badges'
import { Challenges } from './components/Challenges'
import { MyChallenges } from './components/MyChallenges'
import { RecommendedChallenges } from './components/RecommendedChallenges'
import { Feedbacks } from './components/Feedbacks'
import { InCompany } from './components/InCompany'
import { Ultradesafio } from './components/Ultradesafio'
import { DesafiosCadastrados } from './components/DesafiosCadastrados'


import styles from './styles.module.sass'

const Dashboard = () => {

    let {  type } = useParams()

    return (
        <>
            <Menu />
            <Header name={'Gabriela Salomão Silveira'} />
            
            { type === 'talento' && (
                <main className={ styles.dashboard__talento }>

                    {/* grid 1 - 3 */}
                    <section style={{ gridArea: 'insignia' }}>

                        <Badges />

                    </section>

                    {/* grid 1 - 2 */}
                    <section style={{ gridArea: 'desafios', marginRight: 24 }}>
                        
                        <Challenges />
                        <MyChallenges />
                        <RecommendedChallenges />

                    </section>

                    {/* grid 2 - 3 */}
                    <section style={{ gridArea: 'feedbacks' }}>

                        <Feedbacks />

                    </section>

                </main>
            ) }

            { type === 'empresa' && (

                <main className={ styles.dashboard__empresa }>

                        <Banner 
                            title={"Maecenas dolor imperdiet."}
                            desc={"Suspendisse mi bibendum ac, aliquet duis."} />

                        <Badges />

                        <InCompany />

                        <Ultradesafio />

                        <DesafiosCadastrados />

                </main>
            ) }

            
        </>
    )
}

export {
    Dashboard
}