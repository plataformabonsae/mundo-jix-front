import React from 'react';

import { Insignia } from './components/Insignia'
import { Challenges } from './components/Challenges'
import { MeusDesafios } from './components/MeusDesafios'
import { Empresa } from './components/Empresa'


const Chip = (props) => {

    if(props.insignia) {
        return <Insignia {...props}  />
    }
    else if(props.desafio) {
        return <Challenges {...props}  />
    }
    else if(props.meusDesafios) {
        return <MeusDesafios {...props}  />
    }
    else if(props.empresa) {
        return <Empresa {...props} />
    }
}

export {
    Chip
}