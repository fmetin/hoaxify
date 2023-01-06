import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ButtonWithProgress from "../component/ButtonWithProgress";
import Input from "../component/Input";
import { loginHandler } from "../redux/authActions";
import { withApiProgress } from "../shared/ApiProgress";


const LoginPage = (props) => {


    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(
        () => {
            setError(undefined);
        },
        [username, password]
    );

    const onClickLogin = async event => {
        event.preventDefault();

        const creds = {
            username,
            password
        }

        const { history, dispatch } = props;
        const { push } = history;

        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/');

        } catch (error) {
            if (error.response.data.header) {
                setError(error.response.data.header.responseMessage);
            }
        }
    }



    const { t, pendingApiCall } = props;
    const buttonDisabled = !(username && password);
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('login')}</h1>
                <Input label={t('username')} onChange={(event) => { setUsername(event.target.value) }} />
                <Input label={t('password')} type="password" onChange={event => { setPassword(event.target.value) }} />
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={pendingApiCall || buttonDisabled}
                        pendingApiCall={pendingApiCall}
                        text={t('login')}
                    />
                </div>
            </form>
        </div>
    );
}


const LoginPageTranslation = withTranslation()(LoginPage)
const LoginPageWithApiProgress = withApiProgress(LoginPageTranslation, '/v1/auth')
export default connect()(LoginPageWithApiProgress);