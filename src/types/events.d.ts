import { Control } from 'react-hook-form';
import {
  EventStatus,
  TypeEvent,
  FormEventFields,
} from '@/assets/constants/formEnums';

export interface IEventValues {
  title: string;
  type: TypeEvent | null;
  begin?: string | null;
  end?: string | null;
  summary: string;
  description: string;
  banner: string | null;
  status: EventStatus;
}

export interface IEvent extends IEventValues {
  slug: string;
  created: string;
}

interface IContactInfo {
  id?: string;
  phoneNumber: string;
  email: string;
  subwayRoute: string;
  funicularRoute: string;
  busRoute: string;
}

export interface InputFormProps {
  name: FormEventFields;
  label: string;
  control: Control<IEventValues>;
  required: boolean;
  maxLength?: number;
  placeholder: string;
}

export interface IImageState {
  id: string;
  url: string;
}
