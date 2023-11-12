import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { Description } from '../../styles'

interface HeadlinesProps {
  title: string
  subtitle: string
}

const ResetHeadlines: FC<HeadlinesProps> = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography variant="h3" textAlign={'center'}>
        {title}
      </Typography>
      <Description sx={{ maxWidth: '300px', marginTop: '16px' }}>{subtitle}</Description>
    </Box>
  )
}

export default ResetHeadlines
