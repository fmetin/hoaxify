import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ButtonWithProgress from "../component/ButtonWithProgress";
import Input from "../component/Input";
import { loginHandler } from "../redux/authActions";
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
        const creds = {
            username,
            password
        }

        const { history, dispatch } = this.props;
        const { push } = history;

        this.setState({ loginError: undefined });
        try {
            await dispatch(loginHandler(creds));
            push('/');

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
export default connect()(LoginPageWithApiProgress);