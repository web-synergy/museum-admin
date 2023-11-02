import { FC, useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';

import { IEventValues } from '@/types/events';
import { validationSchemaEventForm } from './validation';

import { EventStatus, FormEventFields } from '@/assets/constants/formEnums';
import { editEvent, addEvent } from '@/api';
import Form from './parts/Form';

interface EventFormProps {
  defaultValues: IEventValues;
  type: 'add' | 'edit';
  id: string | null;
}

const EventForm: FC<EventFormProps> = ({ defaultValues, type, id }) => {
  const { control, handleSubmit, reset, getValues, formState, watch } = useForm<
    IEventValues,
    FormEventFields
  >({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchemaEventForm),
  });
  const navigate = useNavigate();
  const eventId = useRef<string | null>(id);
  const intervalRef = useRef<number | null>(null);

  const begin = watch('begin');
  const end = watch('end');
  const status = watch('status');
  const isFieldWasChanged = Object.keys(formState.dirtyFields);

  // Start the interval
  const startInterval = () => {
    console.log(
      'intervalRef in start interval in the beginning',
      intervalRef.current
    );

    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      onSaveDraft();
    }, 5000);

    console.log(
      'intervalRef in start interval in the end',
      intervalRef.current
    );
  };

  // Stop the interval
  const stopInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('stop interval');
    }
  };

  //start interval
  useEffect(() => {
    console.log('useEffect to define is need to start timer');
    if (
      isFieldWasChanged.length > 0 &&
      status === EventStatus.DRAFT &&
      !intervalRef.current
    ) {
      console.log('start interval');
      startInterval();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, status]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const onCancel = () => {
    if (type === 'add') {
      reset();
    } else {
      reset();
      navigate('/events', { replace: true });
    }
  };

  const onSubmit = (data: IEventValues) => {
    const event = { ...data, status: EventStatus.PUBLISHED };
    if (eventId.current) {
      editEvent(event, eventId.current);
      console.log('navigation to event list');
    } else {
      addEvent(event);
    }
    reset();
  };

  const onSaveDraft = () => {
    const values = getValues();
    console.log(values);
    console.log('eventId onSaveDraft', eventId.current);
    if (eventId.current) {
      console.log('change event');
    } else {
      console.log('add event');
      eventId.current = 'some id';
    }
  };

  const onClickSaveDraft = () => {
    stopInterval();
    // if (isFieldWasChanged.length === 0) {
    //   console.log('any field was not changed');
    //   return;
    // }
    // console.log('fields were changed');
    // onSaveDraft();
  };

  const requiredFieldsError = useMemo(() => {
    return Object.values(formState.errors)
      .map((item) => item.message)
      .join(', ');
  }, [formState]);

  const dateError = useMemo(() => {
    if (begin && end) {
      return DateTime.fromISO(begin) >= DateTime.fromISO(end);
    }
    return false;
  }, [begin, end]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      errorMessage={requiredFieldsError}
      control={control}
      errors={formState.errors}
      dateError={dateError}
      activeEndDate={!!begin}
      activeDraftBtn={isFieldWasChanged.length > 0}
      onSaveDraft={onClickSaveDraft}
      onCancel={onCancel}
      status={status}
    />
  );
};

export default EventForm;
