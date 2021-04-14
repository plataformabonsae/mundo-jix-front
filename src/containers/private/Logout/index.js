import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from 'services/login'

// import history from 'utils/history'

const Logout = ({ from }) => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(logout())

    }, [dispatch])
    return <Redirect to="/auth/talento/login" />  
}

export { 
    Logout
}