import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import { Card } from 'components/Card'
import { Checkbox } from 'components/Inputs'
import Button from 'components/Button'
import { ButtonGroup } from 'components/ButtonGroup'

import styles from './styles.module.sass'


const Terms = ({ children, type }) => {

    const [accept, setAccept] = useState(false)

    const props = useSpring({ opacity: !accept ? 1 : 0 })

    const handleAccept = () => {
        setAccept(previous => !previous)
    } 

    return (
        <>   

            <Card>
                { children }
            </Card>

            <Card>
                <Checkbox onChange={ handleAccept }>Concordo e desejo continuar</Checkbox>
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

        </>
    )
}

export default Terms