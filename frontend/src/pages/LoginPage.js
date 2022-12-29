import React from "react";
import { withTranslation } from "react-i18next";
import { login } from '../api/apiCall';
import Input from "../component/Input";

class LoginPage extends React.Component {
    state = {
        username: null,
        password: null,
        errors: {}
    }
    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const body = {
            username,
            password
        }
        this.setState({ pendingApiCall: true });

        try {
            const response = await login(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
        this.setState({ pendingApiCall: false });
    }



    render() {
        const { pendingApiCall, errors } = this.state;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('login')}</h1>
                    <Input name="username" label={t('username')} error={errors.username} onChange={this.onChange} />
                    <Input name="password" label={t('password')} error={errors.password} onChange={this.onChange} type="password" />
                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickLogin}
                            disabled={pendingApiCall}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {t('login')}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const LoginPageTranslation = withTranslation()(LoginPage)
export default LoginPageTranslation;