import { Typography } from '@mui/joy';
import React from 'react';

function Title({ text, textAlign }) {
  return (
    <Typography
      level="h4"
      color="white"
      sx={{
        fontWeight: '700',
        textAlign,
      }}
    >
      {text}
    </Typography>
  );
}

export default Title;
