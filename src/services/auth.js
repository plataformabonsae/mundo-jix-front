import { Creators as TokenActions } from 'store/ducks/Token'
import { Creators as ProfileActions } from 'store/ducks/Profile'
import { TALENT, COMPANY } from 'utils/api'
import { loginFetch } from 'services/login'
import { tokenFetch } from 'services/token'


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
    const token = window.localStorage.getItem('token')
    if (type === `empresa`) url = COMPANY.AUTH.update
    try {
        await dispatch(editFetch(type, body, url, token))
    } catch (error) {
        dispatch(ProfileActions.profileFailure(error))
    }
}

export const editFetch = (type = `talento`, body, url = TALENT.AUTH.update, token) => async (dispatch) => {
    if (type === `empresa`) url = COMPANY.AUTH.update
    try {
        // console.log(type, body, url, token, JSON.stringify(body))
        dispatch(ProfileActions.profileRequest())
        const response = await fetch(
            url, 
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ token }`,
                    Accept: 'application/json',
                    'Content-Type': `multipart/form-data; boundary=XXX`
                },
                body: JSON.stringify(body)
            })
        const { data } = await response.json()
        console.log(await response)
        data
            .then(() => dispatch(ProfileActions.profileSuccess(data)) )
    } catch(error) {
        dispatch(ProfileActions.profileFailure(error))
    }
    
}