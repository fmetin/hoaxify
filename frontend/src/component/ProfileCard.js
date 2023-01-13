import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import defaultPicture from '../assets/profile.png'
const ProfileCard = (props) => {

    const { user } = props;
    const { username, displayName, image } = user;

    let imageSrc = defaultPicture;
    if (image) {
        imageSrc = image;
    }

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUserName = routeParams.username;
    let message = "We cannot edit";
    if (pathUserName === loggedInUsername) {
        message = "We can edit";
    }
    return (
        <div className="card text-center">
            <div className="card-header">
                <img
                    className="rounded-circle shadow"
                    width="200"
                    height="200"
                    alt={`${username} profile`}
                    src={imageSrc}
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