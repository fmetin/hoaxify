import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault'

const TopBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoggedIn, username, displayName, image } = useSelector((store) => {
        const { username, isLoggedIn, displayName, image } = store;
        return {
            username,
            isLoggedIn,
            displayName,
            image
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
                <li className="nav-item dropdown">
                    <div className="d-flex" style={{ cursor: 'pointer' }}>
                        <ProfileImageWithDefault
                            image={image}
                            width="32"
                            height="32"
                            className="rounded-circle m-auto"
                        />
                        <span className="nav-link dropdown-toggle">{displayName}</span>
                    </div>
                    <div className="dropdown-menu show p-0 shadow">
                        <Link className="dropdown-item d-flex p-2" to={`/user/${username}`}>
                            <i className="material-icons text-info me-2">person</i>
                            {t('my.profile')}
                        </Link>
                        <Link className="dropdown-item d-flex p-2" to="/login" onClick={onLogoutSuccess}>
                            <i className="material-icons text-danger me-2">power_settings_new</i>
                            {t('logout')}
                        </Link>
                    </div>
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