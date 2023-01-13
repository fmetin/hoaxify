import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/apiCall';
import ProfileCard from '../component/ProfileCard';
import { callApi } from '../shared/ApiCallUtil';

const UserPage = () => {

    const [user, setUser] = useState();
    const [notFound, setNotFound] = useState(false);

    const { username } = useParams();

    const { t } = useTranslation();

    useEffect(() => {
        setNotFound(false);
    }, [user])

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await callApi(getUser, username);
                setUser(response.data.detail);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadUser();
    }, [username]);

    if (notFound) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <i className="material-icons" style={{ fontSize: '48px' }}>
                            error
                        </i>
                    </div>
                    {t('user.not.found')}
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <ProfileCard />
        </div>
    );
};

export default UserPage;