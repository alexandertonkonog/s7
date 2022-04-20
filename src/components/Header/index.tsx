import React, { FC, useCallback } from "react";
import { AppBar, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions, authSelectors } from "../../store/auth";

type Link = {
  id: number;
  name: string;
  link: string;
  private?: boolean;
};

type HeaderProps = {
  isAuth: boolean;
};

const links: Link[] = [
  { id: 1, name: 'Home', link: '/'},
  { id: 2, name: 'Users', link: '/users'},
  { id: 3, name: 'Profile', link: '/profile', private: true}
];

const Header: FC<HeaderProps> = ({ isAuth }) => {
  const dispatch = useDispatch();
  const logoutHandle = useCallback(() => {
    dispatch(authActions.setAuth(null));
  }, []);
  return (
    <AppBar position={'sticky'}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={6} display={'flex'} alignItems={'center'}>
              {links.map(item => {
                if (item.private && !isAuth) {
                  return null;
                }
                return (
                  <Link key={item.id} to={item.link} className={'header__link'}>
                    <Typography className={'header__link-text'} textAlign="center">{item.name}</Typography>
                  </Link>
                );
              })}
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
              {isAuth
                ? <Button onClick={logoutHandle} color={'inherit'} variant={'outlined'}>Logout</Button>
                : (
                  <Link to={'/login'} className={'header__link'}>
                    <Typography className={'header__link-text'} textAlign="center">Login</Typography>
                  </Link>
                )}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;