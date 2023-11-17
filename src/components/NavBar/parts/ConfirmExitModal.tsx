import { FC } from 'react';
import { Typography, Button } from '@mui/material';
import ModalBase from '@/components/Common/ModalBase';
import useAuth from '@/hooks/useAuth';

interface ConfirmExitModalProps {
  open: boolean;
  closeModal: () => void;
}

const ConfirmExitModal: FC<ConfirmExitModalProps> = ({ open, closeModal }) => {
  const { signOut } = useAuth();
  return (
    <ModalBase open={open} onClose={closeModal}>
      <Typography
        textAlign="center"
        mb={3}
        width={{ xs: 190, md: '100%' }}
        mx="auto"
      >
        Ви впевнені, що бажаєте вийти із системи?
      </Typography>
      <Button
        onClick={() => signOut()}
        sx={{
          width: { xs: '100%', md: 280 },
          margin: '0 auto',
        }}
      >
        Вийти
      </Button>
      <Button
        variant="secondary"
        onClick={closeModal}
        sx={{
          width: { xs: '100%', md: 280 },
          margin: '0 auto',
        }}
      >
        Скасувати
      </Button>
    </ModalBase>
  );
};

export default ConfirmExitModal;
