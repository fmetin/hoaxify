import { use } from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { login } from '../api/apiCall';
import ButtonWithProgress from "../component/ButtonWithProgress";
import Input from "../component/Input";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends React.Component {
    state = {
        username: null,
        password: null,
        errors: {},
        loginError: null
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
        const { onLoginSuccess } = this.props;
        const body = {
            username,
            password
        }
        const { push } = this.props.history;
        this.setState({ loginError: undefined });
        try {
            await login(body);
            push('/');
            onLoginSuccess(username);
        } catch (error) {
            if (error.response.data.header) {
                this.setState({ loginError: error.response.data.header.responseMessage })
            }
        }
    }



    render() {
        const { errors, loginError, username, password } = this.state;
        const { t, pendingApiCall } = this.props;
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
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickLogin}
                            disabled={pendingApiCall || buttonDisabled}
                            pendingApiCall={pendingApiCall}
                            text={t('login')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}


const LoginPageTranslation = withTranslation()(LoginPage)
const LoginPageWithApiProgress = withApiProgress(LoginPageTranslation, '/v1/auth')
export default LoginPageWithApiProgress;