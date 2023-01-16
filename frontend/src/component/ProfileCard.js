import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../api/apiCall';
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
        if (inEditMode) {
            setUpdatedDisplayName(displayName);
        } else {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        }
    }, [inEditMode, displayName])

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName,
            image: newImage.split(',')[1]
        };
        try {
            const response = await callApi(updateUser, body, username);
            setUser(response.data.detail);
            setInEditMode(false);
        } catch (error) {

        }
    }

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    const pendingApiCall = useApiProgress(METHOD_PUT, '/v1/user/' + username);

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    image={newImage || image}
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
                        />
                        <input type="file" onChange={onChangeFile} />
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