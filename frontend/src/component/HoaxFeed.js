import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes, getOldHoaxes, getUserHoaxes, getUserOldHoaxes } from '../api/apiCall';
import { METHOD_GET } from '../redux/Constant';
import { callApi } from '../shared/ApiCallUtil';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../component/Spinner'
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const { t } = useTranslation();
    const { username } = useParams();

    const pendingApiCall = useApiProgress(METHOD_GET, '/v1/hoaxes');

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response =
                    username !== undefined ?
                        await callApi(getUserHoaxes, page, username) :
                        await callApi(getHoaxes, page);
                setHoaxPage(previousHoaxPage => ({
                    ...response.data.detail,
                    content: [...previousHoaxPage.content, ...response.data.detail.content]
                }));
            } catch (error) {

            }
        }
        loadHoaxes();
    }, [username]);


    const loadOldHoaxes = async () => {
        const lastHoaxIndex = hoaxPage.content.length - 1;
        const lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
        const response =
            username !== undefined ?
                await callApi(getUserOldHoaxes, username, lastHoaxId) :
                await callApi(getOldHoaxes, lastHoaxId);
        setHoaxPage(previousHoaxPage => ({
            ...response.data.detail,
            content: [...previousHoaxPage.content, ...response.data.detail.content]
        }));
    }

    const { content, last, number } = hoaxPage;

    if (content.length === 0) {
        return <div className="alert alert-secondary text-center">
            {pendingApiCall ? <Spinner /> : t('There are no hoaxes')}
        </div>
    }
    return (
        <div>
            {content.map(hoax => {
                return (
                    <HoaxView key={hoax.id} hoax={hoax} />
                )
            })}
            {!last &&
                <div
                    className="alert alert-secondary text-center"
                    style={{ cursor: pendingApiCall ? "not-allowed" : "pointer" }}
                    onClick={() => {
                        if (!pendingApiCall) {
                            loadOldHoaxes();
                        }
                    }}
                >
                    {pendingApiCall ? <Spinner /> : t('Load old hoaxes')}
                </div>}
        </div>
    );
};

export default HoaxFeed;