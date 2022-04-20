import React, { ChangeEventHandler, FC, useState } from 'react';
import { Button, Box, Typography, Avatar } from "@mui/material";
import { WrappedFieldProps, Field } from "redux-form";
import { InputProps } from "./types";

type FileFieldProps = Omit<InputProps, 'type' | 'size' | 'id'> & { id: string; width?: number };

const getImageFromFile = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
});

export const FileField: FC<WrappedFieldProps & FileFieldProps> =
  ({ input: { onChange, value, ...input }, meta, width = 200, id, title }) => {
    const [loading, setLoading] = useState(false);
    const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
      setLoading(true);
      const image = await getImageFromFile((event.target.files as FileList)[0]);
      onChange(image);
      setLoading(false);
    }

    const hasError = !!(meta.touched && meta.error);

    return (
      <>
        <Box display={'flex'} alignItems={'center'}>
          <Typography style={{ marginRight: 20, color: hasError ? '#d32f2f' : '#666666' }} component={'label'}>{title}</Typography>
          {value
            ? (
              <Avatar src={value} />
            )
            : (
              <Button
                variant={'outlined'}
                component={'label'}
                color={hasError ? 'error' : 'primary'}
                disabled={loading}
                style={{ width }}
              >
                Upload file
                <input
                  type={'file'}
                  {...input}
                  onChange={handleChange}
                  id={id}
                  hidden
                />
              </Button>
            )
          }
        </Box>
        {hasError && (
          <Typography
            color={'#d32f2f'}
            component={'p'}
            variant={'caption'}
            className={'file__error'}
          >
            {meta.error}
          </Typography>
        )}
      </>
    );
  };

const ReduxFileField: FC<FileFieldProps> = (props) => {
  return <Field component={FileField} {...props} />
}

export default ReduxFileField;