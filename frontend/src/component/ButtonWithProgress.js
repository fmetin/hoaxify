import React from 'react';

const ButtonWithProgress = (props) => {

    const {onClick, pendingApiCall, disabled, text} = props;
    return (
        <div className="text-center">
            <button className="btn btn-primary"
                onClick={onClick}
                disabled={disabled}>
                {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                {text}
            </button>
        </div>
    );
};

export default ButtonWithProgress;