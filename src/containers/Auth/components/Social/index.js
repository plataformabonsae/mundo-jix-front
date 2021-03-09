import React from 'react'
import { Link } from 'react-router-dom'

import { TabSelect, TabContent, TabWrapper } from 'components/Tabs'
import Button from 'components/Button'
import Copyright from 'components/Copyright'
import Logo from 'components/Logo'


// import Typography from 'utils/styles/Typography.module.sass'

import styles from './styles.module.sass'


const Social = ({ title, desc, type }) => {
 return (
     <section className={ styles.login }>

        <div className={ styles.content }>
            <Logo
                title={ title }
                desc={ desc }/>

            <TabWrapper>
                <TabSelect
                    Tag={Link}
                    to="/auth/talento/login"
                    active={ type === 'talento' ? true : false }>
                    Talento
                </TabSelect>

                <TabSelect
                    Tag={Link}
                    to="/auth/empresa/login"
                    active={ type === 'empresa' ? true : false }>
                    Empresa
                </TabSelect>

                <TabContent>
                    <div className={ styles.buttons }>
                        <Button
                            Tag="a"
                            href="/" 
                            type="google">Entrar com Google</Button>
                        <Button
                            Tag="a"
                            href="/" 
                            type="facebook">Entrar com Facebook</Button>
                        <Button
                            Tag="a"
                            href="/" 
                            type="linkedin">Entrar com Linkedin</Button>
                        <Button
                            Tag={Link}
                            to={`/auth/${type}/email`} 
                            type="email">Entrar com E-mail</Button>
                    </div>
                </TabContent>
            </TabWrapper>
            

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

export default Social