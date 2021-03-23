import React from 'react'

import { CardTabs, CardTabItem } from 'components/Card'

import { Step1 } from './components/Step1'
import { Step2 } from './components/Step2'
import { Step3 } from './components/Step3'


// import styles from './styles.module.sass'


const Form = ({ children, action, type }) => {

    return (
        <>

            { type === 'talento' && (
                <CardTabs>
                    <CardTabItem 
                        to={ `/join/${type}/1` }>
                            Pessoal
                    </CardTabItem>
                    <CardTabItem 
                        to={ `/join/${type}/2` }>
                            Acadêmico
                    </CardTabItem>
                    <CardTabItem 
                        to={ `/join/${type}/3` }>
                            Profissional
                    </CardTabItem>
                </CardTabs>
            ) }

            { action === 1 && ( <Step1 type={type} />) }

            { action === 2 && ( <Step2 type={type} />) }

            { action === 3 && ( <Step3 type={type} />) }

        </>
    )
}

export {
    Form 
}