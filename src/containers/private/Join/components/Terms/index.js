import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useForm } from 'react-hook-form'


import { useDispatch, useSelector } from 'react-redux'


import { Card } from 'components/Card'
import { Checkbox } from 'components/Inputs'
import Button from 'components/Button'
import { ButtonGroup } from 'components/ButtonGroup'

import styles from './styles.module.sass'

import { edit } from 'services/auth' 

// import history from 'utils/history'


const Terms = ({ children, type }) => {

    const [accept, setAccept] = useState(false)
    const { register, handleSubmit } = useForm()

    const props = useSpring({ opacity: !accept ? 1 : 0 })

    const dispatch = useDispatch()
    const { data: user } = useSelector(state => state.login)
    const { loading } = useSelector(state => state.profile)

    const onSubmit = (data) => {
        let { accepted_terms: accepted } = data
        accepted ? accepted = 1 : accepted = 0
        dispatch(edit(type, {
            name: user.name, 
            email: user.email, 
            accepted_terms: accepted 
        }))
        handleAccept()
    }

    const handleAccept = () => {
        setAccept(previous => user?.accepted_terms ? true : false)
    } 

    return (
        <form>   

            <Card>
                { children }
            </Card>

            <Card>
                <Checkbox
                    disabled={ loading }
                    checked={ user?.accepted_terms }
                    ref={register({ required: true })}
                    name="accepted_terms"
                    onClick={ handleSubmit(onSubmit) }>Concordo e desejo continuar</Checkbox>
            </Card>

            { user?.accepted_terms ? ( 
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