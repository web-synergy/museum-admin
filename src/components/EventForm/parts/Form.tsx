import { FC, FormEventHandler } from 'react';
import { Box, Typography, Button, Stack, Alert, Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import TypeSelect from './TypeSelect';
import EventField from './EventField';
import CalendarField from './CalendarField';
import ImageField from './ImageField';
import EventTextArea from './EventTextArea';
import { SaveDraftBtn } from './styles';
import { IEventValues } from '@/types/events';
import { EventStatus, FormEventFields } from '@/assets/constants/formEnums';

interface FormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  errorMessage: string | undefined;
  control: Control<IEventValues>;
  errors: FieldErrors<IEventValues>;
  dateError: boolean;
  activeEndDate: boolean;
  onSaveDraft: () => void;
  onCancel: () => void;
  status: EventStatus;
  activeDraftBtn: boolean;
  btnTitle: { publish: string; draft: string };
}

const Form: FC<FormProps> = ({
  onSubmit,
  errorMessage,
  control,
  errors,
  dateError,
  activeEndDate,
  onSaveDraft,
  onCancel,
  status,
  activeDraftBtn,
  btnTitle,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      {errorMessage && (
        <Alert
          variant="outlined"
          severity="error"
          icon={false}
          sx={{ marginBottom: { xs: 4, lg: 5 }, padding: '7px 8px' }}
        >
          Заповніть поля: {errorMessage}
        </Alert>
      )}
      <Stack gap={{ xs: 2, md: 4 }}>
        <Grid
          container
          columnSpacing={{ lg: '30px' }}
          rowSpacing={{ xs: 2, md: 4, lg: 0 }}
        >
          <Grid item xs={12} lg={6}>
            <EventField
              control={control}
              label="Назва події"
              required={true}
              name={FormEventFields.TITLE}
              placeholder="Введіть назву події"
              maxLength={100}
            />
          </Grid>
          <Grid item xs={12} lg={6} marginBottom={{ xs: '28px', md: 4 }}>
            <TypeSelect
              label="Тип події"
              control={control}
              required={true}
              name={FormEventFields.TYPE}
              error={!!errors.type}
            />
          </Grid>
        </Grid>
        <Box>
          <Grid container columnSpacing={{ lg: '30px' }}>
            <Grid item xs={12} lg={6} mb={{ xs: '44px', md: 8, lg: 0 }}>
              <CalendarField
                control={control}
                label="Дата початку події"
                required={false}
                name={FormEventFields.BEGIN}
                placeholder="дд/мм/рррр"
                error={dateError}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CalendarField
                control={control}
                label="Дата закічення події"
                required={false}
                name={FormEventFields.END}
                placeholder="дд/мм/рррр"
                error={dateError}
                disabled={!activeEndDate}
              />
            </Grid>
          </Grid>
          <Typography
            variant="helperText"
            component={'p'}
            color={dateError ? 'error.main' : 'transparent'}
            mt={1}
          >
            Дата початку повинна бути раніше за дату закінчення
          </Typography>
        </Box>
        <Box>
          <EventTextArea
            control={control}
            label="Короткий опис події"
            required={true}
            name={FormEventFields.SUMMARY}
            placeholder="Введіть Ваш текст"
            maxLength={150}
          />
        </Box>

        <Box>
          <EventTextArea
            control={control}
            label="Розгорнутий опис події"
            required={true}
            name={FormEventFields.DESCRIPTION}
            placeholder="Введіть Ваш текст"
            maxLength={2000}
          />
        </Box>

        <Box>
          <ImageField
            control={control}
            label="Додати зображення події"
            required={true}
            name={FormEventFields.BANNER}
            placeholder="Введіть Ваш текст"
            error={!!errors.banner}
          />
        </Box>
        <Box>
          <Stack
            direction={{ xs: 'column-reverse', lg: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', lg: 'center' }}
            gap={{ xs: 2, md: 4, lg: 1 }}
          >
            <Stack
              gap={{ xs: 2, md: 3 }}
              direction={{ xs: 'column', md: 'row' }}
              width={{ xs: '100%', md: 'auto' }}
            >
              <Button type="submit" sx={{ width: { xs: '100%', md: 248 } }}>
                {btnTitle.publish}
              </Button>
              <Button
                sx={{ width: { xs: '100%', md: 248 } }}
                variant="secondary"
                onClick={onCancel}
              >
                Скасувати
              </Button>
            </Stack>
            {status === EventStatus.DRAFT && (
              <Box>
                <SaveDraftBtn
                  variant="text"
                  type="button"
                  onClick={onSaveDraft}
                  disabled={!activeDraftBtn}
                >
                  {btnTitle.draft}
                </SaveDraftBtn>
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Form;
