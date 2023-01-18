import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { postHoax } from '../api/apiCall';
import { callApi } from '../shared/ApiCallUtil';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({ image: store.image }))
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
        }
    }, [focused])

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }

        try {
            await callApi(postHoax, body);
            setFocused(false);
        } catch (error) {
            
        }
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
                    className="form-control"
                    rows={focused ? "3" : "1"}
                    onChange={(event) => setHoax(event.target.value)}
                    value={hoax}
                    onFocus={() => setFocused(true)} />
                {focused && <div className="text-end mt-1">
                    <button
                        className="btn btn-primary"
                        onClick={onClickHoaxify}
                    >
                        Hoaxify
                    </button>
                    <button
                        className="btn btn-light d-inline-flex ms-1"
                        // disabled={pendingApiCall}
                        onClick={() => {
                            setFocused(false);
                        }}
                    >
                        <i className="material-icons">close</i>
                        {t('cancel')}
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default HoaxSubmit;