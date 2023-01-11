import axios from "axios";

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
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
