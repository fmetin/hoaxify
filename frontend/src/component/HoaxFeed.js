import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHoaxes } from '../api/apiCall';
import { callApi } from '../shared/ApiCallUtil';
import HoaxView from './HoaxView';

const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({ content: [] });
    const { t } = useTranslation();

    useEffect(() => {
        const loadHoaxes = async () => {
            try {
                const response = await callApi(getHoaxes);
                setHoaxPage(response.data.detail);
            } catch (error) {

            }
        }
        loadHoaxes();
    }, []);

    const { content } = hoaxPage;

    if (content.length === 0) {
        return <div className="alert alert-secondar text-center">
            {t('There are no hoaxes')}
        </div>
    }
    return (
        <div>
            {content.map(hoax => {
                return (
                    <HoaxView key={hoax.id} hoax={hoax}/>
                )
            })}
        </div>
    );
};

export default HoaxFeed;