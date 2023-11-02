import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTemplate from '../Common/PageTemplate';
import { Container } from '@mui/material';
import { IEvent } from '@/types/events';
import { getEventById } from '@/api';
import EventForm from '../EventForm/EventForm';
import Loader from '../Common/Loader';

const EditEvent = () => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<IEvent | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    const getEvent = async () => {
      if (slug) {
        const event = await getEventById(slug);
        if (event) {
          setEvent(event);
          setLoading(false);
        }
      }
    };

    getEvent();
  }, [slug]);

  return (
    <PageTemplate title="Редагувати подію">
      {loading ? (
        <Loader visible={loading} />
      ) : (
        <Container
          sx={{
            pt: { xs: 4, md: 4, lg: 5 },
            pb: { xs: '60px', md: 10, lg: 15 },
          }}
        >
          {event && (
            <EventForm defaultValues={event} type="edit" id={event.id} />
          )}
        </Container>
      )}
    </PageTemplate>
  );
};

export default EditEvent;
