import React from 'react';
import defaultPicture from '../assets/profile.png'
const ProfileImageWithDefault = (props) => {
    
    const {image, tempImage } = props;

    let imageSrc = defaultPicture;
    if (image) {
        imageSrc = image;
    }
    return (
        <img
            alt={`Profile`}
            src={tempImage || imageSrc}
            {...props}
        />
    );
};

export default ProfileImageWithDefault;
