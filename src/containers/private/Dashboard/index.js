import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Banner } from 'components/Banner'

import { Badges } from './components/Badges'
import { Challenges } from './components/Challenges'
import { MyChallenges } from './components/MyChallenges'
import { RecommendedChallenges } from './components/RecommendedChallenges'
import { Feedbacks } from './components/Feedbacks'
import { InCompany } from './components/InCompany'
import { Ultradesafio } from './components/Ultradesafio'
import { DesafiosCadastrados } from './components/DesafiosCadastrados'

// import { store } from 'store/configureStore'

import { dashboardFetch } from 'services/dashboard'

import styles from './styles.module.sass'

const Dashboard = () => {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(dashboardFetch())
    }, [dispatch] )

    let { data: type } = useSelector(state => state.usertype)
    // const { data: dashboard } = useSelector( state => state.dashboard )

    return (
        <>
            
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