import React from 'react';
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 3 }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;