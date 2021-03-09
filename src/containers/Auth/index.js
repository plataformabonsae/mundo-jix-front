import React from 'react'

import Type from './Type'
import { useParams } from 'react-router-dom'

const Auth = () => {

    let { action, type } = useParams()

    return (
        <Type type={type} action={action} />
    )
}

export default Auth

