import React from 'react'
import { Link } from 'react-router-dom'

import { InputWrapper, Input, Checkbox } from 'components/Inputs'
import Button from 'components/Button'
import Copyright from 'components/Copyright'
import Logo from 'components/Logo'

// import Typography from 'utils/styles/Typography.module.sass'

import styles from './styles.module.sass'


const Email = ({ title, desc, type }) => {
 return (
     <section className={ styles.login }>

        <div className={ styles.content }>
            <Logo
                title={ title }
                desc={ desc }/>

            <InputWrapper>
                <Input
                    type="email"
                    placeholder="Digite seu e-mail">
                    e-mail
                </Input>
            </InputWrapper>
            
            <InputWrapper>
                <Input
                    type="password"
                    placeholder="Digite sua senha">
                    senha
                </Input>
            </InputWrapper>
            
            <div className={ styles.sub }>
                <Checkbox
                    type="checkbox"
                    placeholder="Digite sua senha">
                    Lembrar-me
                </Checkbox>
                <span className={ styles.subSpan }>
                    Esqueceu sua senha? 
                    <Link to={`/auth/${type}/forgot`}>
                        Clique aqui
                    </Link>
                </span>
            </div>

            <Button
                tag="a"
                type="primary"
                href="/">
                Entrar
            </Button>

            <div className={ styles.subSpan } style={{ marginTop: 32 }}>
                Não possui uma conta? 
                <Link to={`/auth/${type}/signup`}>
                    Cadastre-se
                </Link>
            </div>
        </div> 

        <Copyright />

     </section>
 )
}

export default Email