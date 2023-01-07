import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileCard = (props) => {
    const pathUserName = props.match.params.username;
    let message = "We cannot edit";
    if (pathUserName === props.loggedInUsername) {
        message = "We can edit";
    }
    return (
        <div>
            {message}
        </div>
    );

};

const mapStateToProps = (store) => {
    const { username } = store;
    return {
        loggedInUsername: username
    }
}

export default connect(mapStateToProps)(withRouter(ProfileCard));