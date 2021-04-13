import { Creators as TokenActions } from 'store/ducks/Token'
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