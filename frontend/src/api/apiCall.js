import axios from "axios";

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const auth = `Basic ${btoa(username + ':' + password)}`
        axios.defaults.headers['Authorization'] = auth;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const signup = (body) => {
    return axios.post("/v1/create-user", body);
}


export const login = creds => {
    return axios.post("/v1/auth", {}, { auth: creds });
}


export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/v1/users?page=${page}&size=${size}`);
}

export const getUser = (username) => {
    return axios.get(`/v1/user/${username}`);
}
