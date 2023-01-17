import { SUCCESS_CODE } from "../redux/Constant";

export const callApi = async (apiCallFunction, body, pathVariable) => {
    const response = await apiCallFunction(body, pathVariable);
    if (response.data.header.responseCode !== SUCCESS_CODE) {
        createError(response);
    }
    return response;
}

const createError = (response) => {
    let error = new Error(response.data.header.responseMessage);
    error.response = response;
    throw error;
}
