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

export const updateUser = (body, username) => {
    return axios.put(`/v1/user/${username}`, body);
}

export const postHoax = (body) => {
    return axios.post(`/v1/hoaxes`, body);
}

export const getHoaxes = (page = 0) => {
    return axios.get(`/v1/hoaxes?page=` + page);
}

export const getOldHoaxes = (id) => {
    return axios.get(`/v1/hoaxes/${id}`);
}

export const getUserHoaxes = (page = 0, username) => {
    return axios.get(`/v1/hoaxes/user/${username}?page=` + page);
}

export const getUserOldHoaxes = (username, id) => {
    return axios.get(`/v1/hoaxes/user/${username}/${id}`);
}

export const getHoaxesCount = (id) => {
    return axios.get(`/v1/hoaxes/count/${id}`);
}

export const getHoaxesCountOfUser = (id, username) => {
    return axios.get(`/v1/hoaxes/count/${id}/${username}`);
}

