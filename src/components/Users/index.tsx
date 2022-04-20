import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Stack, CircularProgress, Box } from "@mui/material";
import UsersFilter from "./UsersFilter";
import { useDispatch } from "react-redux";
import Service from '../../services';
import { useAppSelector } from "../../hooks";
import { ServicePayload, UsersFilterFormValues } from "../../constants/types";
import { formSelectors, setLocalStorageUsersFilter } from "../../utils";
import { USERS_FILTER_FORM } from "../../constants";
import { usersActions, usersSelectors } from "../../store/users";
import { UserModel } from "../../store/users/users.types";
import UserItem from "./UserItem";
import RemoveModal from "./RemoveModal";
import Loading from "../Loading";

type UsersProps = {
  getUsers: () => Promise<void>;
};

const getFilteredUsers = (users: UserModel[], { last_name, first_name, email }: Partial<UsersFilterFormValues>) => {
  if (!users.length) return users;
  let filteredUsers = users;
  if (last_name) {
    filteredUsers = filteredUsers.filter(item => item.last_name.toLowerCase().includes(last_name.trim().toLowerCase()));
  }
  if (first_name) {
    filteredUsers = filteredUsers.filter(item => item.first_name.toLowerCase().includes(first_name.trim().toLowerCase()));
  }
  if (email) {
    filteredUsers = filteredUsers.filter(item => item.email.toLowerCase().includes(email.trim().toLowerCase()));
  }
  return filteredUsers;
}

const Users: FC<UsersProps> = ({ getUsers }) => {
  const dispatch = useDispatch();
  const [removingUser, setRemovingUser] = useState<UserModel | null>(null);

  const formValues = useAppSelector<UsersFilterFormValues>(formSelectors.getFormValues(USERS_FILTER_FORM));
  const users = useAppSelector<UserModel[]>(usersSelectors.getUsers);
  const loading = useAppSelector<boolean>(usersSelectors.getLoading);
  const isFetched = useAppSelector<boolean>(usersSelectors.getFetchedStatus);
  const filteredUsers = useMemo(
() => formValues ? getFilteredUsers(users, formValues) : users,
[users.length, formValues?.email, formValues?.last_name, formValues?.first_name]
  );

  const handleModalOpen = useCallback((user: UserModel) => () => setRemovingUser(user), [setRemovingUser]);
  const handleStateRemove = useCallback(() => {
    if (removingUser) {
      dispatch(usersActions.removeUser(removingUser));
    }
  }, [setRemovingUser, removingUser]);

  useEffect(() => {
    if (!isFetched) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    if (formValues) {
      setLocalStorageUsersFilter(formValues);
    }
  }, [formValues?.email, formValues?.last_name, formValues?.first_name])
  return (
    <Container className={'component'}>
      <UsersFilter />
      {loading
        ? (
          <Loading />
        )
        : (
          <Stack spacing={2}>
            {filteredUsers.map(user => {
              const handleRemove = handleModalOpen(user);
              return (
                <UserItem handleRemove={handleRemove} key={user.id} user={user} />
              );
            })}
          </Stack>
        )
      }
      <RemoveModal
        origin={removingUser}
        handleClose={() => setRemovingUser(null)}
        handleRemove={handleStateRemove}
      />
    </Container>
  );
};

export default Users;