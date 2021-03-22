import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'


import Card from 'components/Card'

import { Checkbox } from 'components/Inputs'
import Logo from 'components/Logo'
import Button from 'components/Button'
import Copyright from 'components/Copyright'


import styles from './styles.module.sass'


const Terms = ({ children }) => {

    const [accept, setAccept] = useState(false)

    const props = useSpring({ opacity: !accept ? 1 : 0 })

    const handleAccept = () => {
        setAccept(previous => !previous)
    } 

    return (
        <>
        <article className={ styles.wrapper }>
                
                <Logo color="white" />

                <Card>
                    { children }
                </Card>

                <Card>
                    <Checkbox onChange={ handleAccept }>Concordo e desejo continuar</Checkbox>
                </Card>

                { accept ? ( 
                    <div className={ styles.buttons }>   
                        <div className={ styles.mustConfirm }>Você prefere terminar o cadastro agora ou depois?</div>
                        <Button
                            to="/"
                        type="outlineWhite">
                            Completar depois
                        </Button>
                        <Button
                            type="secondary">
                            Completar agora
                        </Button>
                    </div>
                ) : (
                    <>
                        <span className={ styles.mustConfirm }>Você precisa confirmar que leu os termos e condições para continuar o cadastro.</span>
                    </>
                ) }

                <animated.div style={ props }>
                    
                </animated.div>


                <Copyright color="white" />
            </article>
        </>
    )
}

export default Terms