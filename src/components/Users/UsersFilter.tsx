import React, { FC } from 'react';
import { Box, Divider, Grid, Typography, IconButton, Tooltip } from "@mui/material";
import Add from "@mui/icons-material/Add";
import InputField from "../inputs/InputField";
import { Form, InjectedFormProps, reduxForm } from "redux-form";
import { USERS_FILTER_FORM } from "../../constants";
import { UsersFilterFormValues } from "../../constants/types";
import { Link } from "react-router-dom";
import { getLocalStorageUsersFilter } from "../../utils";

const UsersFilter: FC<InjectedFormProps<UsersFilterFormValues>> = () => {
  return (
    <Form>
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant={'h5'} component={'h1'}>Users</Typography>
        <Tooltip title={'Add user'}><Link to={'/users/create'}><IconButton><Add /></IconButton></Link></Tooltip>
      </Box>
      <Grid display={'flex'} justifyContent={'space-between'} marginY={2}>
        <InputField name={'email'} title={'Email'} size={'small'} />
        <InputField name={'first_name'} title={'Firstname'} size={'small'} />
        <InputField name={'last_name'} title={'Lastname'} size={'small'} />
      </Grid>
      <Divider />
    </Form>
  );
};

export default reduxForm<UsersFilterFormValues>({ form: USERS_FILTER_FORM, initialValues: getLocalStorageUsersFilter() })(UsersFilter);