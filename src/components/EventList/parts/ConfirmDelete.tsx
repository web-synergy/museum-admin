import { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ModalBase from '@/components/Common/ModalBase';

interface ConfirmDeleteProps {
  open: boolean;
  title: string;
  onCloseModal: () => void;
  onDeleteItem: () => void;
}

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  open,
  onCloseModal,
  onDeleteItem,
  title,
}) => {
  return (
    <>
      <ModalBase open={open} onClose={onCloseModal}>
        <Box sx={{ padding: '0 24px 24px', textAlign: 'center' }}>
          <Typography>Ви дійсно хочете видалити {title}?</Typography>
        </Box>

        <Button
          sx={{
            width: { xs: '100%', md: 280 },
            margin: '0 auto',
          }}
          onClick={onDeleteItem}
        >
          Видалити
        </Button>
        <Button
          sx={{
            width: { xs: '100%', md: 280 },
            margin: '0 auto',
          }}
          variant="secondary"
          onClick={onCloseModal}
        >
          Скасувати
        </Button>
      </ModalBase>
    </>
  );
};

export default ConfirmDelete;
