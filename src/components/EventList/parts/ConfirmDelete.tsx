import { FC } from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          mb={4}
          paddingRight={3}
          paddingLeft={3}
        >
          <Button sx={{ flexGrow: 1 }} onClick={onDeleteItem}>
            Видалити
          </Button>
          <Button
            sx={{ flexGrow: 1 }}
            variant="secondary"
            onClick={onCloseModal}
          >
            Скасувати
          </Button>
        </Stack>
      </ModalBase>
    </>
  );
};

export default ConfirmDelete;
