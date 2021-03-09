import React from 'react'

import Background from '../components/Background'
import Terms from '../components/Terms'



import content from 'utils/content/join.json'

const Type = ({ action, type }) => {

    const joinType = input => {
        if(input === 'terms') {
            return <Terms>{ content.[action].content }</Terms>
        }
    }

    return (
        <Background>
            { joinType(action) }
        </Background>
        )
}

export default Type