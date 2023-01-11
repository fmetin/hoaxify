import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUsers } from "../api/apiCall";
import UserListItem from "./UserListItem";

const UserList = (props) => {
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 3
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1
    changePage(nextPage);
  }

  const onClickPrevious = () => {
    const nextPage = page.number - 1
    changePage(nextPage);
  }

  const loadUsers = page => {
    getUsers(page).then((response) => {
      setPage(response.data.detail);
    });
  }

  const changePage = nextPage => {
    loadUsers(nextPage);
  }


  const { t } = useTranslation();
  const { content: users, first, last } = page;
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
            onClick={onClickPrevious}
          >
            {t('previous')}
          </button>}
        {last === false &&
          <button
            className="btn btn-sm btn-light float-end"
            onClick={onClickNext}
          >
            {t('next')}
          </button>}
      </div>
    </div>
  );

}

export default UserList;
