import React, { 
    // useState
    useEffect
 } from 'react'
//  import { useParams } from 'react-router-dom'
 import { useSelector } from 'react-redux'
// import { useSpring, animated } from 'react-spring'


// import facebook from 'assets/components/Menu/facebook.svg'
// import linkedin from 'assets/components/Menu/linkedin.svg'
// import linkedin from 'assets/components/Menu/linkedin.svg'

import { Aside } from './components/Aside'
import { Profile } from './components/Profile'
import { Points } from './components/Points'
import { Button } from './components/Button'

import profile from '__tests__/assets/profile.png'

// import styles from './styles.module.sass'

// TODO
// 1 - Animation on open e close aside
// 2 - social

const Menu = ({ active, user = { name: 'test', last_name: 'test' } }) => {

    let { data: type } = useSelector(state => state.usertype)

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.paddingLeft = `${18}vw`
        return () => body.style.paddingLeft = 0
    }, [])

    // const [ isOpen, setIsOpen ] = useState(false)
    // const [ props, set ] = useSpring(
    //     {
    //         width: !isOpen ? 4 : 20
    //     }
    // )

    return (
        <Aside
            // style={{ width: `${props.width}vw` }}
            // style={ props }
            // onMouseEnter={() => setIsOpen( true )} 
            // onMouseLeave={() => setIsOpen( false )}
            >
            <Profile 
                image={ profile }
                name={`${user.name} ${user.last_name}`}
                location={ 12 } />            

            { type === 'talento' ? (
                <>
                    <Points points={ 5234 } />

                    <Button to={`/dashboard/${type}`} dashboard>Dashboard</Button>
                    <Button to={`/meus-desafios/${type}`} meusDesafios>Meus desafios</Button>
                    <Button to={`/desafios/${type}`} desafios>Desafios</Button>
                    <Button to={`/perfil/${type}/pessoal`} perfil>Perfil</Button>
                    <Button to={`/auth/${type}/logout`} sair>Sair</Button>
                </>
            ) : (
                <>
                    <Button to={`/dashboard/${type}`} dashboard>Dashboard</Button>
                    <Button to={`/meus-desafios/${type}`} meusDesafios>Meus desafios</Button>
                    <Button to={`/perfil/${type}`} perfil>Perfil</Button>
                    <Button to={`/auth/${type}/logout`} sair>Sair</Button>
                </>
            ) }

            

        </Aside>
    )
} 

export {
    Menu
}