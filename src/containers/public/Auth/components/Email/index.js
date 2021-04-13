import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { 
    useDispatch, 
    useSelector 
} from 'react-redux'

import { InputGroup, Input, Checkbox } from 'components/Inputs'
import Button from 'components/Button'
import Copyright from 'components/Copyright'
import { Logo } from 'components/Logo'

import { 
    login, 
    // logout 
} from 'services/login'

// import Typography from 'utils/styles/Typography.module.sass'

import styles from './styles.module.sass'

import history from 'utils/history'



const Email = ({ title, desc, type }) => {

    const { register, errors, handleSubmit } = useForm()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: `/dashboard/${type}` } }

    const dispatch = useDispatch()
    // const { data: user } = useSelector(state => state.login)
    const { error, loading } = useSelector(state => state.token)

    const onSubmit = (data) => {
        // console.log(auth.login(type, data))
        dispatch(login(type, data))
        console.log(location, 'location')
        // history.push(`/dashboard/${type}`)
        history.replace(from)
    }

    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={ styles.login }>

            <div className={ styles.content }>
                <Logo
                    title={ title }
                    desc={ desc }/>

                <InputGroup>
                    <Input
                        disabled={loading}
                        ref={register({ required: true })}
                        type="email"
                        name="email"
                        errors={errors}
                        errorMessage="Digite o seu e-mail"
                        placeholder="Digite seu e-mail">
                        e-mail
                    </Input>
                </InputGroup>
                
                <InputGroup>
                    <Input
                        disabled={loading}
                        type="password"
                        ref={register({ required: true })}
                        name="password"
                        errors={errors}
                        errorMessage="Digite uma senha"
                        placeholder="Digite sua senha">
                        senha
                    </Input>
                </InputGroup>

                { error ? 
                    (<div className={ styles.error }>Usuário ou senha incorretos</div>) 
                : null }
                
                <div className={ styles.sub }>
                    <Checkbox
                        type="checkbox"
                        placeholder="Digite sua senha">
                        Lembrar-me
                    </Checkbox>
                    <span className={ styles.subSpan }>
                        Esqueceu sua senha? 
                        <Link to={`/join/${type}/recover`}>
                            Clique aqui
                        </Link>
                    </span>
                </div>

                <Button
                    disabled={ loading }
                    type="primary"
                    Tag={`button`}>
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

        </form>
 )
}

export default Email