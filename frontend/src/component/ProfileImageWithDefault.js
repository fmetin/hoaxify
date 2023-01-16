import React from 'react';
import defaultPicture from '../assets/profile.png'
const ProfileImageWithDefault = (props) => {
    
    const {image, tempimage } = props;

    let imageSrc = defaultPicture;
    if (image) {
        imageSrc = image;
    }
    return (
        <img
            alt={`Profile`}
            src={tempimage || imageSrc}
            {...props}
        />
    );
};

export default ProfileImageWithDefault;
