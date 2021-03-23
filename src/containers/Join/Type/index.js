import React from 'react'
import { useHistory } from "react-router-dom";

import { Logo } from 'components/Logo'
import Copyright from 'components/Copyright'

import Background from '../components/Background'
import { Layout } from '../components/Layout'
import Terms from '../components/Terms'
import { Form } from '../components/Form'
import { Recover } from '../components/Recover'

import content from 'utils/content/join.json'




const Type = ({ action, type }) => {

    let history = useHistory()

    const joinType = (action, type) => {
        if(action === 'terms') {
            return <Terms action={action} type={type}>{ content?.[action].content }</Terms>
        }
        else if(action === 'recover') {
            return <Recover action={action} type={type} />
        }
        else {
            if(action === '1' || action === '2' || action === '3')
                return <Form action={parseInt(action)} type={type} />
            else {
                history.push('/404')
            }
        }
    }

    return (
        <Background>
            <Layout>
                <Logo 
                    color="white"
                    title={`${action === 'recover' ? 'Recuperar senha' : ''}`}
                    desc={`${action === 'recover' ? 'Digite seu e-mail e enviaremos uma senha provisória.' : ''}`} />

                { joinType(action, type) }
                
                <Copyright color="white" />
            </Layout>
        </Background>
        )
}

export default Type