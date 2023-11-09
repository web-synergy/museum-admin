import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import ModalBase from '@/components/Common/ModalBase';

interface InfoModalProps {
  text: string;
  open: boolean;
  onClose: () => void;
}

const InfoModal: FC<InfoModalProps> = ({ text, open, onClose }) => {
  return (
    <ModalBase open={open} onClose={onClose}>
      <Typography mx={3} mb={3} textAlign="center" whiteSpace="break-spaces">
        {text}
      </Typography>
      <Button
        sx={{
          mb: 4,
          mx: { xs: 3, md: 'auto' },
          width: { md: 180, lg: 220 },
        }}
        onClick={onClose}
      >
        OK
      </Button>
    </ModalBase>
  );
};

export default InfoModal;
