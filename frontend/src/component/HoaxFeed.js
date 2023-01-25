import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes, getHoaxesCount, getHoaxesCountOfUser, getNewHoaxes, getOldHoaxes, getUserHoaxes, getUserNewHoaxes, getUserOldHoaxes } from '../api/apiCall';
import { METHOD_GET } from '../redux/Constant';
import { callApi } from '../shared/ApiCallUtil';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../component/Spinner'
import { useParams } from 'react-router-dom';

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const [newHoaxCount, setNewHoaxCount] = useState(0);
    const { t } = useTranslation();
    const { username } = useParams();

    const pendingApiCall = useApiProgress(METHOD_GET, '/v1/hoaxes', false, ["/v1/hoaxes/count/"]);
    const firstHoaxId = hoaxPage.content.length > 0 ?
        hoaxPage.content[0].id : 0;
    const lastHoaxId = hoaxPage.content.length > 0 ?
        hoaxPage.content[hoaxPage.content.length - 1].id : 0;

    useEffect(() => {
        const getCount = async () => {
            const response = username !== undefined ?
                await callApi(getHoaxesCountOfUser, firstHoaxId, username) :
                await callApi(getHoaxesCount, firstHoaxId);
            setNewHoaxCount(response.data.detail.count);
        }
        let looper = setInterval(getCount, 10000)
        return function cleanUp() {
            clearInterval(looper);
        }
    }, [firstHoaxId, username])

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
        const response =
            username !== undefined ?
                await callApi(getUserOldHoaxes, username, lastHoaxId) :
                await callApi(getOldHoaxes, lastHoaxId);
        setHoaxPage(previousHoaxPage => ({
            ...response.data.detail,
            content: [...previousHoaxPage.content, ...response.data.detail.content]
        }));
    }

    const loadNewHoaxes = async () => {
        const response =
            username !== undefined ?
                await callApi(getUserNewHoaxes, username, firstHoaxId) :
                await callApi(getNewHoaxes, firstHoaxId);
        setNewHoaxCount(0);
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: [...response.data.detail, ...previousHoaxPage.content]
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
            {newHoaxCount > 0 && (
                <div
                    className="alert alert-secondary text-center mb-1"
                    style={{ cursor: pendingApiCall ? "not-allowed" : "pointer" }}
                    onClick={pendingApiCall ? () => { } : loadNewHoaxes}
                >
                    {pendingApiCall ? <Spinner /> : t('There are new hoaxes')}

                </div>
            )}
            {content.map(hoax => {
                return (
                    <HoaxView key={hoax.id} hoax={hoax} />
                )
            })}
            {!last &&
                <div
                    className="alert alert-secondary text-center"
                    style={{ cursor: pendingApiCall ? "not-allowed" : "pointer" }}
                    onClick={pendingApiCall ? () => { } : loadOldHoaxes}
                >
                    {pendingApiCall ? <Spinner /> : t('Load old hoaxes')}
                </div>}
        </div>
    );
};

export default HoaxFeed;