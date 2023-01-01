import React from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCall'; 

const LanguageSelector = (props) => {

    const onChangeLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    return (
        <div className="container">
            <img src="https://www.countryflagicons.com/FLAT/24/TR.png" alt="Turkish Flag" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }}></img>
            <img src="https://www.countryflagicons.com/FLAT/24/US.png" alt="USA Flag" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }}></img>
        </div>
    );
};

export default withTranslation()(LanguageSelector);