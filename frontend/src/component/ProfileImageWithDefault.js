import React from 'react';
import defaultPicture from '../assets/profile.png'
const ProfileImageWithDefault = (props) => {

    const { image } = props;

    let imageSrc = defaultPicture;
    if (image) {
        imageSrc = image;
    }
    return (
        <img
            alt={`Profile`}
            src={imageSrc}
            {...props}
        />
    );
};

export default ProfileImageWithDefault;
