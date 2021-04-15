import { Creators as TokenActions } from 'store/ducks/Token'
// import { Creators as LoginActions } from 'store/ducks/Login'
import { Creators as ProfileActions } from 'store/ducks/Profile'
import { TALENT, COMPANY } from 'utils/api'
import { loginFetch } from 'services/login'
import { tokenFetch } from 'services/token'
// import { useSelector } from 'react-redux'


export const login = (type, user) => async (dispatch) => {
    const { token } = await dispatch(tokenFetch(type, user))
    if (token && type) {
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('usertype', type)
      await dispatch(loginFetch(type, token))
    }
}

export const newuser = (type, body, url = TALENT.AUTH.register) => async (dispatch) => {
    if (type === `empresa`) url = COMPANY.AUTH.register
    try {
        const { token } = await dispatch(tokenFetch(type, body, url))
        if (token && type) {
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('usertype', type)
            await dispatch(loginFetch(type, token))
        }
    } catch (error) {
        dispatch(TokenActions.tokenFailure(error))
    }
}

export const edit = (type, body, url = TALENT.AUTH.update) => async (dispatch) => {
    if (type === `empresa`) url = COMPANY.AUTH.update
    const token = window.localStorage.getItem('token')
    console.log('edit')
    try {
        await dispatch(editFetch(type, body, url, token))
        console.log('edit try')
    } catch (error) {
        dispatch(ProfileActions.profileFailure(error))
        console.log('edit catch')
    }
}

export const editFetch = (type = `talento`, body, url = TALENT.AUTH.update, token) => async (dispatch) => {
    if (type === `empresa`) url = COMPANY.AUTH.update
    // const { data: user } = useSelector(state => state.login)
    try {
        const formData = new FormData()
        for( var key in body ) {
            formData.append(key, body[key])
            console.log(key, body[key])
        }
        dispatch(ProfileActions.profileRequest())
        const response = await fetch(
            url, 
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ token }`,
                    Accept: 'application/json',
                },
                body: formData
            })
            const { ok } = response
            if(ok) dispatch(ProfileActions.profileSuccess())
    } catch(error) {
        dispatch(ProfileActions.profileFailure(error))
    }
    
}