import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUsers } from "../api/apiCall";
import { METHOD_GET } from "../redux/Constant";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "./Spinner";
import UserListItem from "./UserListItem";

const UserList = (props) => {
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 3
  });

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress(METHOD_GET, '/v1/users?page');

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

  const loadUsers = async page => {
    setLoadFailure(false);
    try {
      const response = await getUsers(page);
      setPage(response.data.detail);
    } catch (error) {
      setLoadFailure(true);
    }
  }

  const changePage = nextPage => {
    loadUsers(nextPage);
  }


  const { t } = useTranslation();
  const { content: users, first, last } = page;
  let actionDiv = (
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
  );
  if (pendingApiCall) {
    actionDiv = (
      <Spinner />
    );
  }
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
      {actionDiv}
      {loadFailure && <div className="text-center text-danger">{t('load.failure')}</div>}
    </div>
  );

}

export default UserList;
