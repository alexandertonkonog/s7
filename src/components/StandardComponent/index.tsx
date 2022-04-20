import React, { FC } from 'react';
import { Container, Typography } from "@mui/material";

type StandardComponentProps = {
  title?: string;
};

const StandardComponent: FC<StandardComponentProps> = ({ title = 'Page' }) => {
  return (
    <Container className={'component'}>
      <Typography component={'h1'} variant={'h5'} align={'center'}>{title}</Typography>
    </Container>
  );
};

export default StandardComponent;