import { FC, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import PageTemplate from '../Common/PageTemplate';
import EventForm from '../EventForm/EventForm';
import ModalBase from '../Common/ModalBase';
import { IEventValues } from '@/types/events';
import { addEvent } from '@/api';

const AddEvent: FC = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const defaultValues: IEventValues = {
    type: '',
    title: '',
    summary: '',
    description: '',
    banner: '',
    begin: null,
    end: null,
  };

  const onAddEventSubmit = async (data: IEventValues) => {
    await addEvent(data);
    setConfirmModal(true);
  };

  return (
    <PageTemplate title="Додати подію">
      <Container
        sx={{
          pt: { xs: 4, md: 4, lg: 5 },
          pb: { xs: '60px', md: 10, lg: 15 },
        }}
      >
        <EventForm
          onPublish={onAddEventSubmit}
          defaultValues={defaultValues}
          type="add"
        />
      </Container>
      <ModalBase open={confirmModal} onClose={() => setConfirmModal(false)}>
        <Box sx={{ padding: '0 24px 56px 24px', textAlign: 'center' }}>
          <Typography>Подія була успішно опублікована.</Typography>
        </Box>
      </ModalBase>
    </PageTemplate>
  );
};

export default AddEvent;
