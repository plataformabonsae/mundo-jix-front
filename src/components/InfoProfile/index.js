import React from 'react'
import { useHistory, useParams } from "react-router-dom"

// import { Layout } from 'components/Layout'

import { Pessoal } from './components/Pessoal'
import { Academico } from './components/Academico'
import { Profissional } from './components/Profissional'


const InfoProfile = ({ center, noShadow, children, hasPassword }) => {

    let history = useHistory()
    let { action, type } = useParams()

    const joinType = (action, type) => {
        if(action === 'pessoal') {
            return <Pessoal hasPassword={hasPassword} noShadow={ noShadow } type={ type } action={ action } />
        }
        else if(action === 'academico') {
            return <Academico noShadow={ noShadow } type={type} action={ action } />
        }
        else if(action === 'profissional') {
            return <Profissional noShadow={ noShadow } type={type} action={ action } />
        }
        else {
            if( type === 'empresa') {
                return <Pessoal noShadow={ noShadow } type={ type } action={ action } />
            } 
            else {
                history.push('/404')
            }
        }
    }

    return (
        <>
            { children }
            { joinType(action, type) }
        </>
    )
}

export { InfoProfile }