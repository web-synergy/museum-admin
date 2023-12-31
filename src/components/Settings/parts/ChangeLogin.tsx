import { Box, Button } from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';

import { verificationNewEmail } from '@/api';
import { isValuesSame } from '../helpers';
import { ErrorText, InputsBox } from '../styles';
import { validationSchema } from '../validationSchema/email';
import InputWithLabel from './InputWithLabel';
import LoginModalWind from './LoginModalWind';

interface ChangeLoginProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
}

const ChangeLogin: FC<ChangeLoginProps> = ({ setOpen, setLoading }) => {
  const [openCodeWindow, setOpenCodeWindow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState({
    isError: false,
    isModalError: false,
    errorMsg: '',
  });
  const [data, setData] = useState({
    newLogin: '',
    repeatLogin: '',
  });
  const { newLogin, repeatLogin } = data;

  const openModal = () => setOpenCodeWindow(true);
  const closeModal = () => {
    setOpenCodeWindow(false);
    error.isModalError && setError({ ...error, isModalError: false });
  };

  const handleChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const newVal = event.target.value.trim().toLowerCase();
      setData({ ...data, [key]: newVal });
      setError({ ...error, isError: false });
    };

  useEffect(() => {
    if (newLogin && repeatLogin) {
      setError({
        ...error,
        isError: !isValuesSame(newLogin, repeatLogin),
        errorMsg: 'Логіни не співпадають. Спробуйте ще раз.',
      });
    }
    if (newLogin.length === repeatLogin.length)
      setIsDisabled(!isValuesSame(newLogin, repeatLogin));
    else setIsDisabled(true);
  }, [newLogin, repeatLogin]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    const isValid = await validationSchema.isValid(data);
    if (!isValid) {
      const msg = 'Логін може бути тільки електронною адресою!';
      return setError({ ...error, errorMsg: msg, isError: !isValid });
    } else {
      const sendCodeToUserEmail = async (userEmail: string) => {
        try {
          setLoading(true);
          const res = await verificationNewEmail(userEmail);
          setLoading(false);
          if (!res) throw new Error();
          openModal();
          setData({ ...data, newLogin: '', repeatLogin: '' });
          setError({ ...error, isError: false, errorMsg: '' });
        } catch (e) {
          setError({
            ...error,
            isError: true,
            errorMsg: 'Something went wrong',
          });
        }
      };
      sendCodeToUserEmail(newLogin);
    }
  };
  return (
    <>
      <Box component={'form'} onSubmit={onSubmit} position={'relative'}>
        <InputsBox>
          <InputWithLabel
            label="Новий логін"
            type="text"
            placeholder="olenapetrova@gmail.com"
            value={newLogin}
            onChange={handleChange('newLogin')}
            error={error.isError}
          />
          <InputWithLabel
            label="Повторіть новий логін"
            type="text"
            placeholder="olenapetrova@gmail.com"
            value={repeatLogin}
            onChange={handleChange('repeatLogin')}
            error={error.isError}
          />
          <Button type="submit" variant="adminPrimaryBtn" disabled={isDisabled}>
            Зберегти зміни
          </Button>
          {error.isError && <ErrorText>{error.errorMsg}</ErrorText>}
        </InputsBox>
      </Box>

      <LoginModalWind
        {...{ closeModal, open: openCodeWindow, setOpen, error, setError }}
      />
    </>
  );
};

export default ChangeLogin;
