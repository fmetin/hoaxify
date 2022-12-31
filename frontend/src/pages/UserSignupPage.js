import React from "react";
import { signup, changeLanguage } from '../api/apiCall'
import Input from "../component/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../component/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class UserSignupPage extends React.Component {


    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    }

    onChange = event => {
        const { name, value } = event.target;
        //...this.state.errors all k,v pairs
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        if (name === "password" || name === "passwordRepeat") {
            if (name === "password" && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = 'password.mismatch';
            } else if (name === "passwordRepeat" && value !== this.state.password) {
                errors.passwordRepeat = 'password.mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignUp = async event => {
        event.preventDefault();
        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }

    }

    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };



    render() {
        const { errors } = this.state;
        const { t, pendingApiCall } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('sign.up')}</h1>
                    <Input name="username" label={t('username')} error={errors.username} onChange={this.onChange} />
                    <Input name="displayName" label={t('displayName')} error={errors.displayName} onChange={this.onChange} />
                    <Input name="password" label={t('password')} error={errors.password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t('passwordRepeat')} error={t(errors.passwordRepeat)} onChange={this.onChange} type="password" />
                    <ButtonWithProgress
                        onClick={this.onClickSignUp}
                        disabled={pendingApiCall || errors.passwordRepeat !== undefined}
                        pendingApiCall={pendingApiCall}
                        text={t('sign.up')} />
                </form>
            </div>
        );
    }
}

// high order component
const UserSignupPageTranslation = withTranslation()(UserSignupPage)
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageTranslation, '/v1/create-user')
export default UserSignupPageWithApiProgress;