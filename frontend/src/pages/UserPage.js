import React from 'react';
import ProfileCard from '../component/ProfileCard';

const UserPage = (props) => {
    return (
        <div className="container">
            <ProfileCard username = {props.username}/>
        </div>
    );
};

export default UserPage;