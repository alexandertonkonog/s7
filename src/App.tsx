import React, { FC, useCallback } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { authSelectors } from "./store/auth";
import privateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Login from "./components/Login";
import Users from "./components/Users";
import UserPage from "./components/Users/UserPage";
import StandardComponent from "./components/StandardComponent";
import UserForm from "./components/Users/UserForm";
import { usersActions } from "./store/users";
import Service from "./services";
import { ServicePayload } from "./constants/types";
import { UserModel } from "./store/users/users.types";
import { useDispatch } from "react-redux";

const App: FC = () => {
  const { isAuth, loading } = useAppSelector(authSelectors.getAuthState);
  const location = useLocation();
  const dispatch = useDispatch();
  const getUsers = useCallback(async () => {
    dispatch(usersActions.setLoading(true));
    try {
      const usersPayload = await Service.get<ServicePayload<UserModel>>('/users');
      dispatch(usersActions.setUsers(usersPayload));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(usersActions.setLoading(false));
    }
  }, [dispatch]);
  return (
    <>
      {location.pathname !== '/login' && <Header isAuth={isAuth}/>}
      <Container className={'wrapper'} maxWidth={'md'}>
        <Routes>
          <Route path={'/'} element={<StandardComponent title={'Home'} />} />
          <Route path={'/users'}>
            <Route path={''} element={<Users getUsers={getUsers} />} />
            <Route path={'create'} element={<UserForm  />} />
            <Route path={':id'} element={<UserPage getUsers={getUsers} />} />
          </Route>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/profile'} element={privateRoute(<StandardComponent title={'Profile'} />, loading, isAuth)} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
