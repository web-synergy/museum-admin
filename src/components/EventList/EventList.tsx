import { useState, useEffect, useRef } from 'react';
import { Stack } from '@mui/material';

import PageTemplate from '../Common/PageTemplate';

import { ListContainer, ShowMoreBtn } from './parts/styles';
import { IEvent } from '@/types/events';
import { getEvents, deleteEvent } from '@/api';
import EventTable from './parts/EventTable';
// import Loader from '../Common/Loader';

const EventList = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([] as IEvent[]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const initialRef = useRef<boolean | null>(null);

  console.log(loading);

  useEffect(() => {
    console.log('useEffect');

    if (!initialRef.current && page === 0) {
      console.log('initial request');
      initialRef.current = true;
      getEventList(page);
    }

    if (page > 0) {
      console.log('change page');
      getEventList(page);
    }
  }, [page]);

  const getEventList = async (page: number) => {
    console.log('getEventList');
    setLoading(true);
    const {
      data: { content, totalPages },
    } = await getEvents(page);

    setEvents((prev) => [...prev, ...content]);
    setTotalPages(totalPages - 1);
    setLoading(false);
  };

  const onDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      const newEvents = events.filter((event) => event.id !== id);
      setEvents(newEvents);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PageTemplate title="Редагувати події">
      <ListContainer>
        {loading ? (
          // <Loader visible={loading} />
          <div>loading...</div>
        ) : (
          <>
            <EventTable events={events} onDeleteEvent={onDeleteEvent} />
            {totalPages > page && (
              <Stack alignItems="center">
                <ShowMoreBtn
                  variant="secondary"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Показати більше
                </ShowMoreBtn>
              </Stack>
            )}
          </>
        )}
      </ListContainer>
    </PageTemplate>
  );
};

export default EventList;
