import React, { FC, useCallback } from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import { Form, FormErrors, InjectedFormProps, reduxForm } from "redux-form";
import InputField from "../inputs/InputField";
import { USER_CREATE_FORM } from "../../constants";
import ReduxFileField from "../inputs/FileField";
import { UserModel } from "../../store/users/users.types";
import { useDispatch } from "react-redux";
import { usersActions } from "../../store/users";
import { useNavigate } from "react-router-dom";
import { isLengthValidate, isRequired } from "../../utils/validate";

const isLength = isLengthValidate(5, 40);

const validate = (values: UserModel): FormErrors<UserModel> => {
  return {
    email: isLength(values.email),
    last_name: isLength(values.last_name),
    first_name: isLength(values.first_name),
    avatar: isRequired(values.avatar)
  };
};

const UserForm: FC<InjectedFormProps<UserModel>> = ({ form, handleSubmit, reset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = useCallback((values: UserModel) => {
    dispatch(usersActions.createUser(values));
    navigate('/users');
  }, [dispatch, reset]);
  return (
    <Container className={'component'}>
      <Form name={form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={'login__title'} component={'h1'} variant={'h4'}>Create user</Typography>
        <Stack spacing={2} marginTop={2}>
          <ReduxFileField name={'avatar'} title={'Avatar'} id={'avatar'} />
          <InputField name={'email'} title={'Email'} />
          <InputField name={'first_name'} title={'Firstname'} />
          <InputField name={'last_name'} title={'Lastname'} />
          <Button type={'submit'} variant={'contained'} style={{ width: 200 }} color={'primary'}>Create</Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default reduxForm<UserModel>({
  form: USER_CREATE_FORM,
  initialValues: { local: true },
  validate
})(UserForm);