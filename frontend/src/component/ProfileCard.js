import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../api/apiCall';
import { updateSuccess } from '../redux/authActions';
import { METHOD_PUT } from '../redux/Constant';
import { callApi } from '../shared/ApiCallUtil';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import ProfileImageWithDefault from './ProfileImageWithDefault';
const ProfileCard = (props) => {
    const [user, setUser] = useState({});
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();
    const pathUserName = routeParams.username;
    const { username, displayName, image } = user;
    const { t } = useTranslation();


    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUserName === loggedInUsername)
    }, [pathUserName, loggedInUsername])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            displayName: undefined
        }));
    }, [updatedDisplayName])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            image: undefined
        }));
    }, [newImage])

    useEffect(() => {
        if (inEditMode) {
            setUpdatedDisplayName(displayName);
        } else {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        }
    }, [inEditMode, displayName])

    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1]
        }
        const body = {
            displayName: updatedDisplayName,
            image
        };
        try {
            const response = await callApi(updateUser, body, username);
            setUser(response.data.detail);
            setInEditMode(false);
            dispatch(updateSuccess(response.data.detail));
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }

        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);

    }
    const pendingApiCall = useApiProgress(METHOD_PUT, '/v1/user/' + username);
    const { displayName: displayNameError, image: imageError } = validationErrors;
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    image={image}
                    alt={`${username} profile`}
                    className="rounded-circle shadow"
                    width="200"
                    height="200"
                    tempimage={newImage}
                />
            </div>
            <div className="card-body">
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName}@{username}
                        </h3>
                        {editable && <button className="btn btn-success d-inline-flex"
                            onClick={() => {
                                setInEditMode(true)
                            }}>
                            <i className="material-icons">edit</i>
                            {t('edit')}
                        </button>}
                    </>
                )}
                {inEditMode &&
                    <div>
                        <Input
                            label={t('change.display.name')}
                            defaultValue={displayName}
                            onChange={
                                (event) => {
                                    setUpdatedDisplayName(event.target.value)
                                }}
                            error={displayNameError}
                        />
                        <Input
                            type="file"
                            onChange={onChangeFile}
                            error={imageError}
                        />
                        <div>
                            <ButtonWithProgress
                                className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={
                                    <>
                                        <i className="material-icons">save</i>
                                        {t('save')}
                                    </>
                                }
                            >
                            </ButtonWithProgress>
                            <button
                                className="btn btn-light d-inline-flex ms-1"
                                disabled={pendingApiCall}
                                onClick={() => {
                                    setInEditMode(false);
                                }}
                            >
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