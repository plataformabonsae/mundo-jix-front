import React from 'react'

import { CardTabs } from 'components/Card'
import { TabFlat } from 'components/Tabs'
import { InfoProfile } from 'components/InfoProfile'


// import styles from './styles.module.sass'


const Form = ({ children, action, type }) => {

    return (
        <>  
    
            <InfoProfile center >
                { type === 'talento' && (
                    <CardTabs>
                        <TabFlat 
                            to={ `/join/${type}/pessoal` }>
                                Pessoal
                        </TabFlat>
                        <TabFlat 
                            to={ `/join/${type}/academico` }>
                                Acadêmico
                        </TabFlat>
                        <TabFlat 
                            to={ `/join/${type}/profissional` }>
                                Profissional
                        </TabFlat>
                    </CardTabs>
                ) }
            </InfoProfile>

        </>
    )
}

export {
    Form 
}