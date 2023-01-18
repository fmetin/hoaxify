import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes } from '../api/apiCall';
import { METHOD_GET } from '../redux/Constant';
import { callApi } from '../shared/ApiCallUtil';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../component/Spinner'

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const { t } = useTranslation();

    const pendingApiCall = useApiProgress(METHOD_GET, '/v1/hoaxes');

    useEffect(() => {
        loadHoaxes();
    }, []);

    const loadHoaxes = async (page) => {
        try {
            const response = await callApi(getHoaxes, page);
            setHoaxPage(previousHoaxPage => ({
                ...response.data.detail,
                content: [...previousHoaxPage.content, ...response.data.detail.content]
            }));
        } catch (error) {

        }
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
                            loadHoaxes(number + 1);
                        }
                    }}
                >
                    {pendingApiCall ? <Spinner /> : t('Load old hoaxes')}
                </div>}
        </div>
    );
};

export default HoaxFeed;