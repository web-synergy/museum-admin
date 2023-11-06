import * as yup from 'yup';
import { IEventValues } from '@/types/events';
import { EventStatus, TypeEvent } from '@/assets/constants/formEnums';

export const validationSchemaEventForm: yup.ObjectSchema<IEventValues> =
  yup.object({
    title: yup.string().required('Назва події'),
    type: yup
      .mixed<TypeEvent>()
      .notOneOf([TypeEvent.CONTEST])
      .required('Тип події'),
    begin: yup.string().nullable().optional(),
    end: yup.string().nullable().optional(),
    summary: yup.string().trim().required('Скорочений опис події'),
    description: yup.string().trim().required('Розгорнутий опис події'),
    banner: yup.string().required('Зображення'),
    status: yup
      .mixed<EventStatus>()
      .oneOf(Object.values(EventStatus))
      .required(),
  });
