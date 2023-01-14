import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ButtonWithProgress from "../component/ButtonWithProgress";
import Input from "../component/Input";
import { loginHandler } from "../redux/authActions";
import { METHOD_POST } from "../redux/Constant";
import { useApiProgress } from "../shared/ApiProgress";


const LoginPage = (props) => {


    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const { t } = useTranslation();


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

        const { history } = props;
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



    const pendingApiCall = useApiProgress(METHOD_POST, '/v1/auth');
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

export default LoginPage;