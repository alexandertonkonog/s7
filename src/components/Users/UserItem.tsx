import React, { FC } from 'react';
import { Avatar, Box, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserModel } from "../../store/users/users.types";
import { Link } from "react-router-dom";

type UserItemProps = {
  user: UserModel;
  handleRemove?: () => void;
  isEditMode?: boolean;
};

const UserItem: FC<UserItemProps> = ({ user, handleRemove, isEditMode = true }) => {
  return (
    <Paper key={user.id} className={'users__list-item'}>
      <Grid container>
        <Grid xs={6} item display={'flex'}>
          {isEditMode
            ? (
              <Link to={'/users/' + user.id}>
                <Avatar className={'users__list-item-img'} src={user.avatar} alt={user.first_name + ' ' + user.last_name} />
              </Link>
            )
            : (
              <Avatar className={'users__list-item-img'} src={user.avatar} alt={user.first_name + ' ' + user.last_name} />
            )
          }
          <Box>
            {isEditMode
              ? (
                <Link to={'/users/' + user.id} className={'users__list-item-title'}>
                  <Typography component={'h3'} variant={'subtitle2'}>{user.first_name + ' ' + user.last_name}</Typography>
                </Link>
              )
              : (
                <Typography component={'h3'} variant={'subtitle2'}>{user.first_name + ' ' + user.last_name}</Typography>
              )
            }
            <Typography component={'p'} variant={'caption'}>{user.email}</Typography>
          </Box>
        </Grid>
        {isEditMode && handleRemove && (
          <Grid xs={6} item display={'flex'} justifyContent={'flex-end'}>
            <Tooltip title={'Remove user'}>
              <IconButton color={'error'} onClick={handleRemove}>
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default UserItem;