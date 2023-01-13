import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { logoutSuccess } from '../redux/authActions';

const TopBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoggedIn, username } = useSelector((store) => {
        const { username, isLoggedIn } = store;
        return {
            username,
            isLoggedIn
        }
    });

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }
    let links = (
        <ul className="navbar-nav ms-auto">
            <li>
                <Link className="nav-link" to="/login">
                    {t('login')}
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    {t('sign.up')}
                </Link>
            </li>
        </ul>
    );

    if (isLoggedIn) {
        links = (
            <ul className="navbar-nav ms-auto">
                <li>
                    <Link className="nav-link" to={`/user/${username}`}>
                        {username}
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/login" onClick={onLogoutSuccess}>
                        {t('logout')}
                    </Link>
                </li>
            </ul>
        );
    }
    return (
        <div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60" alt="Hoaxify Logo" />
                    Hoaxify
                </Link>
                {links}
            </nav>
        </div>

    );




}


export default TopBar;