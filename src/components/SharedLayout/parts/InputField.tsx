import { FC, useState } from 'react';
import {
  InputLabel,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import SvgSpriteIcon from '@/components/Common/SvgSprite';
import { Controller, Control } from 'react-hook-form';
import { ChangeLoginValues, ChangeLoginFields } from './helper';

interface InputFieldProps {
  name: ChangeLoginFields;
  label: string;
  control: Control<ChangeLoginValues>;
  error: boolean;
}

const InputField: FC<InputFieldProps> = ({
  name,
  control,
  label,
  error: compareError,
}) => {
  const [infoTooltip, setInfoTooltip] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const onClickInfoBtn = () => {
    if (isDesktop) {
      return;
    }
    setInfoTooltip(true);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <InputLabel shrink={false} htmlFor={field.name}>
            {label}
          </InputLabel>

          <TextField
            {...field}
            id={field.name}
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!error || compareError}
            placeholder="olenapetrova@gmail.com"
            autoComplete="off"
            sx={{
              '.MuiInputBase-input': {
                fontSize: { xs: 14, md: 16 },
              },
              '.MuiOutlinedInput-root': { height: '52px' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Лише у форматі зразок@зразок.зразок"
                    placement="top-end"
                    id="info tooltip"
                    open={infoTooltip}
                    onOpen={() => setInfoTooltip(true)}
                    onClose={() => setInfoTooltip(false)}
                    sx={{
                      p: 0,
                      color: (theme) => theme.palette.common.black,
                    }}
                  >
                    <IconButton
                      aria-label="info tooltip"
                      aria-describedby={`tooltip-${field.name}`}
                      onClick={onClickInfoBtn}
                    >
                      <SvgSpriteIcon iconId="info" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    />
  );
};

export default InputField;
