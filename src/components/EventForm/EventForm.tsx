import { FC, useMemo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import { IEventValues } from '@/types/events';
import { validationSchemaEventForm } from './validation';
import { EventStatus, FormEventFields } from '@/assets/constants/formEnums';
import { editEvent, addEvent, addDraft, editDraft } from '@/api';
import Form from './parts/Form';
import InfoModal from './parts/InfoModal';

interface EventFormProps {
  defaultValues: IEventValues;
  type: 'add' | 'edit';
  slug: string | null;
}

const TIMER = 1000 * 60 * 5;

const EventForm: FC<EventFormProps> = ({ defaultValues, type, slug }) => {
  const { control, handleSubmit, reset, getValues, formState, watch } = useForm<
    IEventValues,
    FormEventFields
  >({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(validationSchemaEventForm),
  });
  const navigate = useNavigate();
  const eventSlug = useRef<string | null>(slug);
  const intervalRef = useRef<number | null>(null);
  const wasResetRef = useRef(false);
  const [isPublishSuccess, setIsPublishSuccess] = useState(false);
  const [isDraftSaveSuccess, setIsDraftSaveSuccess] = useState(false);

  const begin = watch('begin');
  const end = watch('end');
  const status = watch('status');
  const isFieldWasChanged = Object.keys(formState.dirtyFields);

  //start interval
  useEffect(() => {
      if (wasResetRef.current) {
      wasResetRef.current = false;
      return;
    }
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

  // Start the interval
  const startInterval = () => {
    console.log(
      'intervalRef in start interval in the beginning',
      intervalRef.current
    );

    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      onSaveDraft();
    }, TIMER);

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

  const navigationAfterSaving = () => {
    if (type === 'edit') {
      navigate('/events', { replace: true });
    } else {
      stopInterval();
      wasResetRef.current = true;
    }
  };

  const onCancel = () => {
    stopInterval();
    reset();
    navigationAfterSaving();
  };

  const onSubmit = async (data: IEventValues) => {
    if (dateError) {
      return;
    }
    const event = { ...data, status: EventStatus.PUBLISHED };
    if (eventSlug.current) {
      console.log('change event');
      await editEvent(event, eventSlug.current);
    } else {
      await addEvent(event);
    }
    reset();
    setIsPublishSuccess(true);
  };

  const onSaveDraft = async () => {
    const values = getValues();
    console.log(values);
    console.log('eventId onSaveDraft', eventSlug.current);
    if (eventSlug.current) {
      console.log('change event');
      editDraft(values, eventSlug.current);
    } else {
      console.log('add event');
      eventSlug.current = 'other-1234456';
      addDraft(values).then((res) => (eventSlug.current = res.data.slug));
    }
  };

  const onClickSaveDraft = async () => {
    await onSaveDraft();
    setIsDraftSaveSuccess(true);
  };

  const onCloseSuccessPublish = () => {
    setIsPublishSuccess(false);
    navigationAfterSaving();
  };

  const onCloseSuccessDraftSave = () => {
    setIsDraftSaveSuccess(false);
    navigationAfterSaving();
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
    <>
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
      <InfoModal
        open={isPublishSuccess}
        onClose={onCloseSuccessPublish}
        text={'Подія була успішно опублікована.'}
      />
      <InfoModal
        open={isDraftSaveSuccess}
        onClose={onCloseSuccessDraftSave}
        text={'Чернетку збережено в розділі \n “Редагувати події”.'}
      />
    </>
  );
};

export default EventForm;
