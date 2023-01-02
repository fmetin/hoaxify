import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {
    // return (
    //     <Authentication.Consumer>
    //         {value => {
    //             const pathUserName = props.match.params.username;
    //             const loggedInUsername = value.state.username;
    //             let message = "We cannot edit";
    //             if (pathUserName === loggedInUsername) {
    //                 message = "We can edit";
    //             }
    //             return (
    //                 <div>
    //                     {message}
    //                 </div>
    //             );
    //         }}
    //     </Authentication.Consumer>
    // )

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