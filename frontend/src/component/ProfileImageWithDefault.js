import React from 'react';
import defaultPicture from '../assets/profile.png'
const ProfileImageWithDefault = (props) => {

    const { image, tempimage } = props;

    let imageSrc = defaultPicture;
    if (image) {
        imageSrc = 'images/' + image;
    }
    return (
        <img
            alt={`Profile`}
            src={tempimage || imageSrc}
            {...props}
            onError={ event => {
                event.target.src = defaultPicture;
            }}
        />
    );
};

export default ProfileImageWithDefault;
