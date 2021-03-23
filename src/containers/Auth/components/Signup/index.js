import React from 'react'
import { Link } from 'react-router-dom'

import { Input, InputGroup } from 'components/Inputs'
import Button from 'components/Button'
import Copyright from 'components/Copyright'
import { Logo } from 'components/Logo'


// import Typography from 'utils/styles/Typography.module.sass'

import styles from './styles.module.sass'


const Email = ({ title, desc, type }) => {
 return (
     <section className={ styles.login }>

        <div className={ styles.content }>
            <Logo
                title={ title }
                desc={ desc }/>

            <InputGroup>
                <Input
                    type="text"
                    placeholder="Digite seu nome">
                    nome
                </Input>
                <Input
                    type="text"
                    placeholder="Digite seu sobrenome">
                    Sobrenome
                </Input>
            </InputGroup>

            <InputGroup>
                <Input
                    type="email"
                    placeholder="Digite seu nome">
                    e-mail
                </Input>
            </InputGroup>

            <InputGroup>
                <Input
                    type="password"
                    placeholder="Digite uma senha">
                    Senha
                </Input>
                <Input
                    type="password"
                    placeholder="Repita a senha">
                    Confirmar senha
                </Input>
            </InputGroup>

            <Button
                Tag={ Link }
                to={`/join/${type}/terms`}
                type="primary"
                href="/">
                Cadastrar
            </Button>

            <span className={ styles.or }>ou</span>

            <div className={ styles.buttons }>
                <Button
                    Tag="a"
                    href="/" 
                    type="google">Cadastrar com Google</Button>
                <Button
                    Tag="a"
                    href="/" 
                    type="facebook">Cadastrar com Facebook</Button>
                <Button
                    Tag="a"
                    href="/" 
                    type="linkedin">Cadastrar com Linkedin</Button>
            </div>

            <div className={ styles.subSpan } style={{ marginTop: 32 }}>
                Já possui uma conta? 
                <Link to={`/auth/${type}/login`}>
                    Entrar
                </Link>
            </div>
        </div> 

        <Copyright />

     </section>
 )
}

export default Email