import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getUsers } from "../api/apiCall";

class UserList extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getUsers().then((response) => {
      this.setState({
        users: response.data.detail,
      });
    });
  }
  render() {
    const { t } = this.props;
    const { users } = this.state;
    return (
      <div className="card">
        <h3 className="card-header text-center">{t('users')}</h3>
        <div className="list-group list-group-flush">
          {users.map((user, index) => {
            return (
              <div className="list-group-item list-group-item-action" key={user.username}>
                {user.username}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withTranslation()(UserList);
