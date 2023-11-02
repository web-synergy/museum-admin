import { FC } from 'react';
import { Container } from '@mui/material';
import PageTemplate from '../Common/PageTemplate';
import EventForm from '../EventForm/EventForm';
import { EventStatus } from '@/assets/constants/formEnums';
import { IEventValues } from '@/types/events.d';

const AddEvent: FC = () => {
  const defaultValues: IEventValues = {
    type: null,
    title: '',
    summary: '',
    description: '',
    banner: null,
    status: EventStatus.DRAFT,
    begin: null,
    end: null,
  };

  return (
    <PageTemplate title="Додати подію">
      <Container
        sx={{
          pt: { xs: 4, md: 4, lg: 5 },
          pb: { xs: '60px', md: 10, lg: 15 },
        }}
      >
        <EventForm id={null} defaultValues={defaultValues} type="add" />
      </Container>
    </PageTemplate>
  );
};

export default AddEvent;
