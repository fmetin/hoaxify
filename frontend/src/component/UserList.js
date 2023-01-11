import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getUsers } from "../api/apiCall";
import UserListItem from "./UserListItem";

class UserList extends Component {
  state = {
    page: {
      content: [],
      number: 0,
      size: 3
    },
  };

  componentDidMount() {
    this.loadUsers();
  }

  onClickNext = () => {
    const nextPage = this.state.page.number + 1;
    this.loadUsers(nextPage);
  }

  onClickPrevious = () => {
    const nextPage = this.state.page.number - 1;
    this.loadUsers(nextPage);
  }

  loadUsers = page => {
    getUsers(page).then((response) => {
      this.setState({
        page: response.data.detail,
      });
    });
  }
  render() {
    const { t } = this.props;
    const { content : users, first, last } = this.state.page;
    return (
      <div className="card">
        <h3 className="card-header text-center">{t('users')}</h3>
        <div className="list-group list-group-flush">
          {users.map((user) => {
            return (
              <UserListItem key={user.username} user={user} />
            );
          })}
        </div>
        <div>
        {first === false && 
          <button
          className="btn btn-sm btn-light"
          onClick={this.onClickPrevious}
          >
            {t('previous')}
            </button>}
          {last === false && 
          <button
          className="btn btn-sm btn-light float-end"
          onClick={this.onClickNext}
          >
            {t('next')}
            </button>}
        </div>
      </div>
    );
  }
}

export default withTranslation()(UserList);
