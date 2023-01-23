import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/apiCall';
import HoaxFeed from '../component/HoaxFeed';
import ProfileCard from '../component/ProfileCard';
import Spinner from '../component/Spinner';
import { METHOD_GET } from '../redux/Constant';
import { callApi } from '../shared/ApiCallUtil';
import { useApiProgress } from '../shared/ApiProgress';

const UserPage = () => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { username } = useParams();

    const { t } = useTranslation();

    const pendingApiCall = useApiProgress(METHOD_GET, '/v1/user/' + username)

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

    if (pendingApiCall || user.username !== username ) {
        return (
            <Spinner />
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <ProfileCard user={user} />
                </div>
                <div className="col">
                    <HoaxFeed/>
                </div>

            </div>
        </div>
    );
};

export default UserPage;