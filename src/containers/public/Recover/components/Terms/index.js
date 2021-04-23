import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useForm } from 'react-hook-form'


import { useDispatch, useSelector } from 'react-redux'


import { Card } from 'components/Card'
import { Checkbox } from 'components/Inputs'
import Button from 'components/Button'
import { ButtonGroup } from 'components/ButtonGroup'

import styles from './styles.module.sass'

import { edit } from 'services/auth' 

import history from 'utils/history'


const Terms = ({ children, type }) => {

    const [accept, setAccept] = useState(false)
    const { register, handleSubmit } = useForm()

    const props = useSpring({ opacity: !accept ? 1 : 0 })

    const dispatch = useDispatch()
    const { data: user } = useSelector(state => state.login)
    const { loading } = useSelector(state => state.profile)

    useEffect(()=> {
        setAccept(Number(user?.accepted_terms) === 1 ? true : false)
        // console.log(accept)
    }, [user?.accepted_terms])

    const onSubmit = async (data) => {
        let { accepted_terms: accepted } = data
        accepted ? accepted = 1 : accepted = 0
        await dispatch(edit(type, {
            name: user.name, 
            email: user.email, 
            accepted_terms: accepted 
        }))
        .then(() => setAccept(data.accepted_terms))
    }

    return (
        <section>   

            <Card>
                { children }
            </Card>

            <Card>
                <Checkbox
                    disabled={ loading }
                    checked={ accept }
                    ref={register()}
                    name="accepted_terms"
                    onChange={ handleSubmit(onSubmit) }>Concordo e desejo continuar</Checkbox>
            </Card>

            { accept ? ( 
                <ButtonGroup>   
                    <div className={ styles.mustConfirm }>Você prefere terminar o cadastro agora ou depois?</div>
                    <Button
                        Tag={`button`}
                        onClick={ () => history.go(0) }
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

        </section>
    )
}

export default Terms