import React from "react";
import { signup, changeLanguage } from '../api/apiCall'
import Input from "../component/Input";
import { withTranslation, WithTranslation } from "react-i18next";

class UserSignupPage extends React.Component {


    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = event => {
        const { name, value } = event.target;
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
        this.setState({ pendingApiCall: true });

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
        this.setState({ pendingApiCall: false });
    }

    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }



    render() {
        const { pendingApiCall, errors } = this.state;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('sign.up')}</h1>
                    <Input name="username" label={t('username')} error={errors.username} onChange={this.onChange} />
                    <Input name="displayName" label={t('displayName')} error={errors.displayName} onChange={this.onChange} />
                    <Input name="password" label={t('password')} error={errors.password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t('passwordRepeat')} error={t(errors.passwordRepeat)} onChange={this.onChange} type="password" />
                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall || errors.passwordRepeat !== undefined}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {t('sign.up')}
                        </button>
                    </div>
                    <div>
                        <img src="https://www.countryflagicons.com/FLAT/24/TR.png" alt="Turkish Flag" onClick={() => this.onChangeLanguage('tr')} style={{cursor: 'pointer'}}></img>
                        <img src="https://www.countryflagicons.com/FLAT/24/US.png" alt="USA Flag" onClick={() => this.onChangeLanguage('en')} style={{cursor: 'pointer'}}></img>
                    </div>
                </form>
            </div>
        );
    }
}

// high order component
const UserSignupPageTranslation = withTranslation()(UserSignupPage)
export default UserSignupPageTranslation;