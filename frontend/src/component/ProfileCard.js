import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Input from './Input';
import ProfileImageWithDefault from './ProfileImageWithDefault';
const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();

    const onClickSave = () => {
        console.log(updatedDisplayName);
    }

    const { user } = props;
    const { username, displayName, image } = user;
    const { t } = useTranslation();

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUserName = routeParams.username;

    useEffect(() => {
        if (inEditMode) {
            setUpdatedDisplayName(displayName);
        } else {
            setUpdatedDisplayName(undefined);
        }
    }, [inEditMode, displayName])

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
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName}@{username}
                        </h3>
                        <button className="btn btn-success d-inline-flex"
                            onClick={() => {
                                setInEditMode(true)
                            }}>
                            <i className="material-icons">edit</i>
                            {t('edit')}
                        </button>
                    </>
                )}
                {inEditMode &&
                    <div>
                        <Input label={t('change.display.name')} defaultValue={displayName} onChange={(event) => { setUpdatedDisplayName(event.target.value) }} ></Input>
                        <div>
                            <button className="btn btn-primary d-inline-flex" onClick={onClickSave}>
                                <i className="material-icons">save</i>
                                {t('save')}
                            </button>
                            <button className="btn btn-light d-inline-flex ms-1"
                                onClick={() => {
                                    setInEditMode(false);
                                }}>
                                <i className="material-icons">close</i>
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );

};


export default ProfileCard;