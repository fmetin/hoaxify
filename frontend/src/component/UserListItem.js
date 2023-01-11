import React from 'react';
import { Link } from 'react-router-dom';
import defaultPicture from '../assets/profile.png'

const UserListItem = (props) => {
    const { user } = props;
    const {username, displayName, image} = user;
    let imageSrc = defaultPicture;
    if (image) {
        imageSrc = image;
    }
    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action">
            <img
                className="rounded-circle"
                width="32"
                height="32"
                alt={`${username} profile`}
                src={imageSrc}
            />
            <span className="p-2">
            {displayName}@{username}
            </span>
        </Link>
    );
};

export default UserListItem;