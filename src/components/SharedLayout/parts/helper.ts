import * as yup from 'yup';

export enum ChangeLoginFields {
  EMAIL = 'email',
  CONFIRM = 'confirm',
}

export interface ChangeLoginValues {
  [ChangeLoginFields.EMAIL]: string;
  [ChangeLoginFields.CONFIRM]: string;
}

export const defaultValues = {
  email: '',
  confirm: '',
};

const emailRule =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

export const validationSchema: yup.ObjectSchema<ChangeLoginValues> = yup.object(
  {
    email: yup.string().email().matches(emailRule).required(),
    confirm: yup.string().matches(emailRule).required(),
  }
);
