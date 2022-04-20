import { Container, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { usersSelectors } from "../../store/users";
import UserItem from "./UserItem";
import Loading from "../Loading";

type Params = {
  id: string;
};

type UserPageProps = {
  getUsers: () => Promise<void>;
};

const UserPage: FC<UserPageProps> = ({ getUsers }) => {
  const params = useParams<Params>();
  const id = Number(params?.id);
  const user = useAppSelector(usersSelectors.getUser(id || 0));
  const loading = useAppSelector(usersSelectors.getLoading);
  const isFetched = useAppSelector(usersSelectors.getFetchedStatus);

  useEffect(() => {
    if (!isFetched) {
      getUsers();
    }
  }, []);

  if (loading) {
    return (
      <Container className={'component'}>
        <Loading />
      </Container>
    );
  }

  return (
    <Container className={'component'}>
      {user
        ? <UserItem user={user} handleRemove={() => {}} isEditMode={false} />
        : <Typography component={'h1'} variant={'subtitle2'} align={'center'}>There is no such user</Typography>
      }
    </Container>
  );
};

export default UserPage;