import { WrappedFieldProps, Field } from "redux-form";
import { FC } from "react";
import { TextField } from "@mui/material";
import { InputProps } from "./types";

const Input: FC<WrappedFieldProps & InputProps> =
  ({meta, input, title, type= 'text', size }) => {
    return (
      <TextField
        {...input}
        label={title}
        error={!!(meta.touched && meta.error)}
        className={'input'}
        type={type}
        size={size}
        helperText={meta.touched && meta.error ? meta.error : ''}
      />
    );
}

const InputField: FC<InputProps> = ({ name, validate, ...rest }) => {
  return <Field name={name} validate={validate} component={Input} {...rest} />;
}

export default InputField;