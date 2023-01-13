import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/apiCall';
import ProfileCard from '../component/ProfileCard';
import { callApi } from '../shared/ApiCallUtil';

const UserPage = () => {

    const [user, setUser] = useState();
    const { username } = useParams();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await callApi(getUser, username);
                setUser(response.data.detail);
            } catch (error) {
                
            }
        }
        loadUser();
    }, [username]);


    return (
        <div className="container">
            <ProfileCard />
        </div>
    );
};

export default UserPage;