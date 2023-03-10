import { login, signup } from '../api/apiCall';
import * as ACTIONS from './Constant';

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

export const updateSuccess = ({displayName, image}) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {displayName, image}
    }
}


export const loginHandler = (credentials) => {
    return async function (dispatch) {
        const response = await login(credentials);
        const authState = {
            ...response.data.detail,
            password: credentials.password
        }

        dispatch(loginSuccess(authState));
        return response;
    }
}

export const signUpHandler = (user) => {
    return async function (dispatch) {
        const response = await signup(user);
        await dispatch(loginHandler(user));
        return response;
    }
}