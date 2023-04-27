import { Typography } from '@mui/joy'
import React from 'react'

const Title = ({ text, textAlign }) => {
  return (
    <Typography
      level='h4'
      color="white"
      sx={{
        fontWeight: '700',
        textAlign: textAlign,
      }}
    >
      {text}
    </Typography>
  )
}

export default Title