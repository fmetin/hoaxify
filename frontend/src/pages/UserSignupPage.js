import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ButtonWithProgress from "../component/ButtonWithProgress";
import Input from "../component/Input";
import { signUpHandler } from "../redux/authActions";
import { withApiProgress } from "../shared/ApiProgress";


const UserSignupPage = (props) => {


    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    });

    const [errors, setErrors] = useState({});

    const onChange = (event) => {
        const { name, value } = event.target;
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        setForm((previousForm) => ({...previousForm, [name]: value}));
    }


    const onClickSignUp = async event => {
        event.preventDefault();
        const { history, dispatch } = props;
        const { push } = history;
        const { username, displayName, password } = form;
        const body = {
            username,
            displayName,
            password
        }

        try {
            await dispatch(signUpHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }

    }

    const { t, pendingApiCall } = props;

    const {username: usernameError, displayName: displayNameError, password: passwordError} = errors;

    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('password.mismatch');
    }

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('sign.up')}</h1>
                <Input name="username" label={t('username')} error={usernameError} onChange={onChange} />
                <Input name="displayName" label={t('displayName')} error={displayNameError} onChange={onChange} />
                <Input name="password" label={t('password')} error={passwordError} type="password" onChange={onChange} />
                <Input name="passwordRepeat" label={t('passwordRepeat')} error={t(passwordRepeatError)} type="password" onChange={onChange} />
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickSignUp}
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        pendingApiCall={pendingApiCall}
                        text={t('sign.up')} />
                </div>
            </form>
        </div>
    );
}

// high order component
const UserSignupPageTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgress = withApiProgress(UserSignupPageTranslation, '/v1/create-user');
const UserSignupPageWithApiProgressLogin = withApiProgress(UserSignupPageWithApiProgress, '/v1/auth');
export default connect()(UserSignupPageWithApiProgressLogin);