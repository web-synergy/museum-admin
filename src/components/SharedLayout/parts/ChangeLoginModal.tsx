import { FC, useMemo, useState, useEffect } from 'react';
import { Dialog, Stack, Typography, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultValues,
  validationSchema,
  ChangeLoginValues,
  ChangeLoginFields,
} from './helper';
import InputField from './InputField';
import { changeLogin } from '@/api';

interface ChangeLoginModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangeLoginModal: FC<ChangeLoginModalProps> = ({ open, onClose }) => {
  const { control, watch, formState, handleSubmit } = useForm<
    ChangeLoginValues,
    ChangeLoginFields
  >({
    defaultValues: defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const email = watch(ChangeLoginFields.EMAIL);
  const confirm = watch(ChangeLoginFields.CONFIRM);

  const [compareError, setCompareError] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const alertText = useMemo(() => {
    if (compareError) {
      return 'Логіни не співпадають. Спробуйте ще раз.';
    }
    if (Object.values(formState.errors).length > 0 && email === confirm) {
      return 'Логін може бути лише електронною адресою!';
    }
    if (submitError) {
      return 'Помилка від серверу';
    }
    return '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareError, formState]);

  const disableBtn = useMemo(() => {
    if (email === '' || confirm === '') {
      return true;
    }

    if (compareError) {
      return true;
    }

    if (email !== confirm) {
      return true;
    }

    return false;
  }, [email, confirm, compareError]);

  const compareFields = (base: string, compare: string) => {
    if (compare === '') {
      return;
    }
    const baseLength = base.length;
    const comparePart = compare.slice(0, baseLength);
    if (base !== comparePart) {
      setCompareError(true);
    } else {
      setCompareError(false);
    }
  };

  useEffect(() => {
    compareFields(email, confirm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    compareFields(confirm, email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);

  const onSubmitForm = async (data: ChangeLoginValues) => {
    const response = await changeLogin(data[ChangeLoginFields.EMAIL]);
    if (!response) {
      setSubmitError(true);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={open} PaperProps={{ sx: { maxWidth: '100%' } }}>
      <Stack
        pt={7}
        pb={3}
        px={{ xs: 2, md: 5 }}
        width={{ xs: 280, md: 460, lg: 532 }}
        gap={{ xs: 1, md: 2 }}
      >
        <Stack gap={4} component="form" onSubmit={handleSubmit(onSubmitForm)}>
          <Typography variant="h3" textAlign="center">
            Змініть логін, щоб продовжити
          </Typography>
          <InputField
            control={control}
            name={ChangeLoginFields.EMAIL}
            label="Новий логін"
            error={compareError}
          />
          <InputField
            control={control}
            name={ChangeLoginFields.CONFIRM}
            label="Повторіть новий логін"
            error={compareError}
            
          />
          <Button disabled={disableBtn} type="submit">
            Увійти
          </Button>
        </Stack>

        <Alert
          variant="outlined"
          severity="error"
          icon={false}
          sx={{
            padding: '7px 8px',
            opacity: alertText.length > 0 ? 1 : 0,
            height: { xs: 56, md: 40 },
            '& .MuiAlert-message': {
              margin: '0 auto',
              textAlign: 'center',
              maxWidth: { xs: 187, md: '100%' },
            },
          }}
        >
          {alertText}
        </Alert>
      </Stack>
    </Dialog>
  );
};

export default ChangeLoginModal;
