import * as ACTIONS from './Constant'
import { login } from '../api/apiCall'

export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    }
}


export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
}


export const loginHandler = (credentials) => {
    return async function(dispatch) {
        const response = await login(credentials);
        const authState = {
            ...response.data.detail,
            password: credentials.password
        }
    
        dispatch(loginSuccess(authState));
        return response;
    }
}