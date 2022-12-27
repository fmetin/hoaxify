import axios from "axios";

export const signup = (body) => {
    return axios.post("/v1/create-user", body);
}