import React from 'react'
import { useParams } from 'react-router-dom'

import { Menu } from 'components/Menu'
import { TabFlat } from 'components/Tabs'
import { Header, SubHeader } from 'components/Header'
import { Layout } from 'components/Layout'
import { InfoProfile } from "components/InfoProfile"



// import styles from './styles.module.sass'

const Profile = () => {

    let {  type } = useParams()

    return (
        <>
            <Menu />
            <Header name={'Gabriela Salomão Silveira'} />
            
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