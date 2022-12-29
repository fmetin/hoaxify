import axios from "axios";

export const signup = (body) => {
    return axios.post("/v1/create-user", body);
}


export const login = creds => {
    return axios.post("/v1/auth", {}, {auth: creds} );
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}
