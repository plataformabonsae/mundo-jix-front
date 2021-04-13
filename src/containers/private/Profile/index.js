import React from 'react'

import { TabFlat } from 'components/Tabs'
import { SubHeader } from 'components/Header'
import { Layout } from 'components/Layout'
import { InfoProfile } from "components/InfoProfile"

// import styles from './styles.module.sass'

const Profile = () => {

    let type = window.localStorage.getItem(`usertype`)

    return (
        <>
            
            { type === 'talento' && (

                <>
                    <SubHeader>
                        <TabFlat
                            to={`/perfil/${type}/pessoal`}
                            color={"white"}>
                            Pessoal
                        </TabFlat>
                        <TabFlat
                            to={`/perfil/${type}/academico`}
                            color={"white"}>
                            Acadêmico
                        </TabFlat>
                        <TabFlat
                            to={`/perfil/${type}/profissional`}
                            color={"white"}>
                            Profissional
                        </TabFlat>
                        <TabFlat
                            to={`/perfil/${type}/insigneas`}
                            color={"white"}>
                            Insígnias
                        </TabFlat>
                    </SubHeader>
                </>
                
            ) }

            <Layout>
                <InfoProfile noShadow hasPassword />
            </Layout>

            
        </>
    )
}

export {
    Profile
}