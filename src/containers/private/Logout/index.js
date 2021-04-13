import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from 'services/login'

import history from 'utils/history'

const Logout = ({ from }) => {
    const dispatch = useDispatch()
    dispatch(logout())
    return <Redirect to="/auth/talento/login" />  
}

export { 
    Logout
}