import { FC, useCallback, useState } from "react";
import { Paper, Grid, Typography, Button, CircularProgress, Box, Tooltip } from "@mui/material";
import { Form, reduxForm, InjectedFormProps, FormErrors } from "redux-form";
import InputField from "../inputs/InputField";
import { isLengthValidate } from "../../utils/validate";
import Service from '../../services';
import { useDispatch } from "react-redux";
import { authActions, authSelectors } from "../../store/auth";
import { setToken } from "../../utils";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { DEFAULT_TOKEN, LOGIN_FORM } from "../../constants";

type FormValues = {
  email: string;
  password: string;
};

const isLength = isLengthValidate(5, 40);

const validate = ({ email, password }: Partial<FormValues>): FormErrors<FormValues> => {
  return {
    email: isLength(email),
    password: isLength(password)
  };
}

const Login: FC<InjectedFormProps<FormValues>> =
  ({ submitting, pristine, handleSubmit, reset }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { isAuth } = useAppSelector(authSelectors.getAuthState);
  const [warning, setWarning] = useState<null | string>(null);

  const onSubmit = useCallback(async (values: FormValues) => {
    setWarning(null);
    dispatch(authActions.setLoading(true));
    try {
      const result = await Service.post('/login', values);
      dispatch(authActions.setAuth(DEFAULT_TOKEN));
      setToken(DEFAULT_TOKEN);
      // у меня ошибка все время, не знаю, какая структура приходит в ответе поэтому буду свои данные хранить
    } catch (e) {
      setWarning((e as Error).message);
      reset();
    } finally {
      dispatch(authActions.setLoading(false));
    }
  }, [dispatch]);

  const loginWithoutPasswordHandle = () => {
    dispatch(authActions.setAuth(DEFAULT_TOKEN));
    setToken(DEFAULT_TOKEN);
  }

  if (isAuth) {
    const path = searchParams.get('path') || '/';
    return <Navigate to={path} />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={'login-wrapper'}
      >
        <Paper className={'login'}>
          <Typography className={'login__title'} component={'h1'} variant={'h4'}>Login</Typography>
          {warning && <Typography className={'login__error'} component={'h5'} variant={'caption'}>{warning}</Typography>}
          <InputField name={'email'} title={'Email'} />
          <InputField name={'password'} title={'Password'} type={'password'} />
          <Box display={'flex'} marginTop={2}>
            <Button disabled={submitting || pristine} className={'login__btn'} type={'submit'} variant="contained">
              {submitting ? <CircularProgress size={20} color={'inherit'} /> : 'Login'}
            </Button>
            <Tooltip title={'У меня не получилось подключиться к вашему апи, все время ошибка, поэтому сделал данную кнопку'}>
              <Button onClick={loginWithoutPasswordHandle} className={'login__btn login__btn_enter'} variant={'outlined'}>Enter without login</Button>
            </Tooltip>
          </Box>
        </Paper>
      </Grid>
    </Form>
  );
};

export default reduxForm<FormValues>({
  form: LOGIN_FORM,
  validate
})(Login);