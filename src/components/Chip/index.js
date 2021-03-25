import React from 'react';

import { Insignia } from './components/Insignia'
import { Challenges } from './components/Challenges'
import { MeusDesafios } from './components/MeusDesafios'


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
}

export {
    Chip
}