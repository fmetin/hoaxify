import axios from 'axios';
import { useEffect, useState } from 'react';

export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApicall = (url, inProgress) => {
            if (url.startsWith(apiPath)) {
                setPendingApiCall(inProgress)
            }
        }

        const registerInterceptors = () => {
            requestInterceptor = axios.interceptors.request.use(
                request => {
                    updateApicall(request.url, true);
                    return request;
                });

            responseInterceptor = axios.interceptors.response.use(
                response => {
                    updateApicall(response.config.url, false);
                    return response;
                },
                error => {
                    updateApicall(error.config.url, false);
                    throw error;
                });
        }

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }
    }, [apiPath])
    return pendingApiCall;
}