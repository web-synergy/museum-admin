import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { InputLabel, Typography } from '@mui/material';
import { CustomTextArea, TextAreaContainer } from './styles';
import { InputFormProps } from '@/types/events';

const EventTextArea: FC<InputFormProps> = ({
  control,
  label,
  name,
  required,
  maxLength,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <InputLabel shrink={false} htmlFor={field.name} required={required}>
            {label}
          </InputLabel>

          <TextAreaContainer errorValue={!!error}>
            <CustomTextArea
              {...field}
              value={field.value ?? ''}
              id={field.name}
              maxLength={maxLength}
              placeholder={placeholder}
            />
          </TextAreaContainer>

          {maxLength && (
            <Typography
              textAlign="end"
              variant="helperText"
              component={'p'}
              mt={1}
            >
              {field.value?.length ?? 0}/{maxLength}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default EventTextArea;
