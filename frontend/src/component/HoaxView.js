import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { deleteHoax } from '../api/apiCall';
import { callApi } from '../shared/ApiCallUtil';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const HoaxView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const { hoax, onDeleteHoax } = props;
    const { user, content, createdDate, fileAttachment, id } = hoax;
    const { username, displayName, image } = user;

    const { i18n } = useTranslation();
    const formatted = format(createdDate, i18n.language);

    const ownedByLoggedInUser = loggedInUser === username;

    const onClickDelete = async () => {
        await callApi(deleteHoax, id);
        onDeleteHoax(id);
    }

    return (
        <div className="card p-1">
            <div className="d-flex">
                <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle m-1" />
                <div className="flex-fill m-auto ps-2">
                    <Link to={`/user/${username}`} className="text-dark">
                        <h6 className="d-inline">
                            {displayName}@{username}
                        </h6>
                        <span> - </span>
                        <span>{formatted}</span>
                    </Link>
                </div>
                {ownedByLoggedInUser &&
                    <button 
                    className="btn btn-delete-link btn-sm"
                    onClick={onClickDelete}
                    >
                        <i className="material-icons">delete_outline</i>
                    </button>}
            </div>

            <div className="ps-5">
                {content}
            </div>
            {fileAttachment && (
                <div className="ps-5">
                    {fileAttachment.fileType.startsWith('image') &&
                        (<img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt="content" />)
                    }
                    {!fileAttachment.fileType.startsWith('image') &&
                        (<strong>Hoax has unknown attachment</strong>)
                    }
                </div>
            )}
        </div>
    );
};

export default HoaxView;