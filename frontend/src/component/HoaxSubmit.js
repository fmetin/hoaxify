import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { postHoax, postHoaxAttachment } from '../api/apiCall';
import { METHOD_POST } from '../redux/Constant';
import { callApi } from '../shared/ApiCallUtil';
import { useApiProgress } from '../shared/ApiProgress';
import AutoUploadImage from './AutoUploadImage';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({ image: store.image }))
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({})
    const [newImage, setNewImage] = useState();
    const { t } = useTranslation();

    const pendingApiCall = useApiProgress(METHOD_POST, '/v1/hoaxes', true);
    const pendingFileUpload = useApiProgress(METHOD_POST, '/v1/file/hoax-attachment', true);

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
        }
    }, [focused]);

    useEffect(() => {
        setErrors(
            {}
        )
    }, [hoax])

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }

        try {
            await callApi(postHoax, body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
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
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);

    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        await callApi(postHoaxAttachment, attachment);
    }

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid'
    }
    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault
                image={image}
                width="32"
                height="32"
                className="rounded-circle me-1"
            />
            <div className="flex-fill">
                <textarea
                    className={textAreaClass}
                    rows={focused ? "3" : "1"}
                    onChange={(event) => setHoax(event.target.value)}
                    value={hoax}
                    onFocus={() => setFocused(true)} />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {focused &&
                    <>
                        {!newImage && <Input type="file" onChange={onChangeFile} />}
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload} />}
                        <div className="text-end mt-2">
                            <ButtonWithProgress
                                className="btn btn-primary"
                                onClick={onClickHoaxify}
                                disabled={pendingApiCall || pendingFileUpload}
                                pendingApiCall={pendingApiCall}
                                text={
                                    <>
                                        {t('hoaxify')}
                                    </>
                                }
                            >
                            </ButtonWithProgress>
                            <button
                                className="btn btn-light d-inline-flex ms-1"
                                disabled={pendingApiCall || pendingFileUpload}
                                onClick={() => {
                                    setFocused(false);
                                }}
                            >
                                <i className="material-icons">close</i>
                                {t('cancel')}
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default HoaxSubmit;