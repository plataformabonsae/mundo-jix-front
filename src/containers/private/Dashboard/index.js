import React from 'react'

import { Badges } from './components/Badges'
import { Challenges } from './components/Challenges'
import { MyChallenges } from './components/MyChallenges'
import { RecommendedChallenges } from './components/RecommendedChallenges'
import { Feedbacks } from './components/Feedbacks'


import styles from './styles.module.sass'

const Dashboard = ({action, type}) => {

    return (
        <main className={ styles.dashboard }>

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
    )
}

export {
    Dashboard
}