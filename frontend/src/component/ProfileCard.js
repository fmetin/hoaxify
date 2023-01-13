import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';
const ProfileCard = (props) => {

    const { user } = props;
    const { username, displayName, image } = user;

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUserName = routeParams.username;
    
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    image={image}
                    alt={`${username} profile`}
                    className="rounded-circle shadow"
                    width="200"
                    height="200"
                />
            </div>
            <div className="card-body">
                <h3>
                    {displayName}@{username}
                </h3>
            </div>
        </div>
    );

};


export default ProfileCard;