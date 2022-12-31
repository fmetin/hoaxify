import React, { Component } from 'react';
import axios from 'axios';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;
        // static displayName = 'ApiProgress(' + getDisplayName(WrappedComponent) + ')'

        state = {
            pendingApiCall: false
        };

        componentDidMount() {
            axios.interceptors.request.use(
                request => {
                    this.updateApicall(request.url, true);
                    return request;
                });

            axios.interceptors.response.use(
                response => {
                    this.updateApicall(response.config.url, false);
                    return response;
                },
                error => {
                    this.updateApicall(error.config.url, false);
                    throw error;
                });

        }

        updateApicall(url, inProgress) {
            if (url === apiPath) {
                this.setState({
                    pendingApiCall: inProgress
                });
            }
        }

        render() {
            const { pendingApiCall } = this.state;
            return (
                //...this.props means all k,v pairs
                <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
            );
        }
    }
}