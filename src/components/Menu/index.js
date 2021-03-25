import React, { 
    // useState
    useEffect
 } from 'react'
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

const Menu = ({ active }) => {

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        body.style.paddingLeft = `${18}vw`
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
                name={ 'Gabriela Salomão Tasco Silveira' }
                location={ 12 } />

            <Points points={ 5234 } />

            <Button to={`/dashboard`} dashboard>Dashboard</Button>
            <Button to={`/meus-desafios`} meusDesafios>Meus desafios</Button>
            <Button to={`/desafios`} desafios>Desafios</Button>
            <Button to={`/perfil`} perfil>Perfil</Button>
            <Button to={`/logout`} sair>Sair</Button>

        </Aside>
    )
} 

export {
    Menu
}