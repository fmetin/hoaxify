import { SUCCESS_CODE } from "../redux/Constant";

export const callApi = async (apiCallFunction, body) => {
    const response = await apiCallFunction(body);
    if (response.data.header.responseCode !== SUCCESS_CODE) {
        createError(response.data.header);
    }
    return response;
}

const createError = (header) => {
    let error = new Error(header.responseMessage);
    error.data = header;
    throw error;
}
