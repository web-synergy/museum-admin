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
      <Typography mb={3} textAlign="center" whiteSpace="break-spaces">
        {text}
      </Typography>
      <Button
        sx={{
          width: { xs: '100%', md: 180, lg: 220 },
          margin: '0 auto',
        }}
        onClick={onClose}
      >
        OK
      </Button>
    </ModalBase>
  );
};

export default InfoModal;
