import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Stack } from '@mui/material';
import PageTemplate from '../Common/PageTemplate';
import { ListContainer, ShowMoreBtn } from './parts/styles';
import { getEvents, deleteEvent } from '@/api';
import { IEvent } from '@/types/events';
import EventTable from './parts/EventTable';
import Loader from '../Common/Loader';
import { useFetch } from '@/hooks/useFetch';

const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>([] as IEvent[]);
  const [page, setPage] = useState(0);
  const getEventList = useCallback(() => getEvents(page), [page]);
  const { data, isLoading } = useFetch(getEventList);
  const initialRef = useRef<true | null>(null);

  useEffect(() => {
    if (data && data.content) {
      if (!initialRef.current && page === 0) {
        initialRef.current = true;
        setEvents(data.content);
      }

      if (page > 0) {
        setEvents((prev) => [...prev, ...data.content]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateState = async () => {
    for (let i = 0; i <= page; i++) {
      const response = await getEvents(i);
      if (i === 0) {
        setEvents(response.data.content);
      } else {
        setEvents((prev) => [...prev, ...response.data.content]);
      }
    }
  };

  const isShowMoreDisplay = useMemo(
    () => data && data.totalPages > page + 1,
    [data, page]
  );

  const onDeleteEvent = async (slug: string) => {
    try {
      await deleteEvent(slug);
      await updateState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageTemplate title="Редагувати події">
      <ListContainer>
        <>
          <EventTable events={events} onDeleteEvent={onDeleteEvent} />
          <Loader visible={isLoading} />
          {isShowMoreDisplay && (
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
      </ListContainer>
    </PageTemplate>
  );
};

export default EventList;
