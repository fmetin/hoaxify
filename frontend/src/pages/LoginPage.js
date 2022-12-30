import React from "react";
import { withTranslation } from "react-i18next";
import { login } from '../api/apiCall';
import Input from "../component/Input";
import axios from "axios";
import ButtonWithProgress from "../component/ButtonWithProgress";

class LoginPage extends React.Component {
    state = {
        username: null,
        password: null,
        errors: {},
        loginError: null,
        pendingApiCall: false
    }
    componentDidMount() {
        axios.interceptors.request.use(
            request => {
                this.setState({
                    pendingApiCall: true,
                    loginError: undefined
                });
                return request;
            });

        axios.interceptors.response.use(
            response => {
                this.setState({ pendingApiCall: false });
                return response;
            },
            error => {
                this.setState({ pendingApiCall: false });
                throw error;
            });

    }

    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({
            [name]: value,
            errors,
            loginError: undefined
        })
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const body = {
            username,
            password
        }

        try {
            const response = await login(body);
            this.setState({ loginError: undefined })
        } catch (error) {
            if (error.response.data.header) {
                this.setState({ loginError: error.response.data.header.responseMessage })
            }
        }
    }



    render() {
        const { pendingApiCall, errors, loginError, username, password } = this.state;
        const { t } = this.props;
        const buttonDisabled = !(username && password);
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('login')}</h1>
                    <Input name="username" label={t('username')} error={errors.username} onChange={this.onChange} />
                    <Input name="password" label={t('password')} error={errors.password} onChange={this.onChange} type="password" />
                    {loginError && <div className="alert alert-danger">
                        {loginError}
                    </div>}
                    <ButtonWithProgress
                        onClick={this.onClickLogin}
                        disabled={pendingApiCall || buttonDisabled}
                        pendingApiCall={pendingApiCall}
                        text={t('login')} />
                </form>
            </div>
        );
    }
}

const LoginPageTranslation = withTranslation()(LoginPage)
export default LoginPageTranslation;