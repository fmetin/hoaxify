import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';

const Modal = (props) => {
    const { visible, onClickCancel, message, onClickConfirm, pendingApiCall, title, okButton } = props;
    const { t } = useTranslation();
    let className = 'modal fade';
    if (visible) {
        className += ' show d-block'
    }
    return (
        <div className={className} style={{ backgroundColor: '#000000b0' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{t(title)}</h1>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" disabled={pendingApiCall} onClick={onClickCancel}>{t('cancel')}</button>
                        <ButtonWithProgress
                            className="btn btn-danger"
                            pendingApiCall={pendingApiCall}
                            disabled={pendingApiCall}
                            onClick={onClickConfirm}
                            text={okButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;