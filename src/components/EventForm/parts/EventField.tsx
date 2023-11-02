import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { InputLabel, TextField, Typography } from '@mui/material';
import { InputFormProps } from '@/types/events';

const EventField: FC<InputFormProps> = ({
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

          <TextField
            {...field}
            id={field.name}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: maxLength || 'auto' }}
            fullWidth
            error={!!error}
            placeholder={placeholder}
          />
          {maxLength && (
            <Typography textAlign="end" variant="body2" mt={1}>
              {field.value?.length ?? 0}/{maxLength}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default EventField;
