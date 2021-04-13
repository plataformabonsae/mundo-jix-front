import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useForm } from 'react-hook-form'


import { useDispatch, useSelector } from 'react-redux'


import { Card } from 'components/Card'
import { Checkbox } from 'components/Inputs'
import Button from 'components/Button'
import { ButtonGroup } from 'components/ButtonGroup'

import styles from './styles.module.sass'

import { newuser } from 'services/auth' 

import history from 'utils/history'


const Terms = ({ children, type }) => {

    const [accept, setAccept] = useState(false)
    const { register, errors, handleSubmit } = useForm()

    const props = useSpring({ opacity: !accept ? 1 : 0 })

    const dispatch = useDispatch()
    const { data: user } = useSelector(state => state.login)
    const { error, loading } = useSelector(state => state.token)

    const onSubmit = (data) => {
        console.log(user, data)
        dispatch(newuser(type, {
            name: user.name,
            cpf: user.cpf,
            password: '12345678',
            email: user.email,
            is_mentor: user.is_mentor,
            is_judge: user.is_judge,
            ...data
        }))
        handleAccept()
    }

    const handleAccept = () => {
        setAccept(previous => !previous)
        
    } 

    return (
        <form>   

            <Card>
                { children }
            </Card>

            <Card>
                <Checkbox
                    ref={register({ required: true })}
                    name="accepted_terms"
                    onChange={ handleSubmit(onSubmit) }>Concordo e desejo continuar</Checkbox>
            </Card>

            { accept ? ( 
                <ButtonGroup>   
                    <div className={ styles.mustConfirm }>Você prefere terminar o cadastro agora ou depois?</div>
                    <Button
                        to={`/dashboard/${type}`}
                        type="outlineWhite">
                        Completar depois
                    </Button>
                    <Button
                        to={`/join/${type}/pessoal`}
                        type="secondary">
                        Completar agora
                    </Button>
                </ButtonGroup>
            ) : (
                <>
                    <span className={ styles.mustConfirm }>Você precisa confirmar que leu os termos e condições para continuar o cadastro.</span>
                </>
            ) }

            <animated.div style={ props }>
                
            </animated.div>

        </form>
    )
}

export default Terms