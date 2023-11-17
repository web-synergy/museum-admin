import PassIcon from '@/components/Login/parts/PassIcon';
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import SvgSpriteIcon from '@/components/Common/SvgSprite';
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';

interface InputWithLabelProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

const InputWithLabel: FC<InputWithLabelProps> = ({
  label,
  placeholder,
  type,
  value,
  error,
  onChange,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const isPassType = type === 'password';

  const { palette, breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('lg'));

  const styles = {
    '.MuiInputBase-root': { height: '52px' },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: error ? palette.error.main : '',
      },
    },
  };

  const managePassInput: MouseEventHandler = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const onClickInfoBtn = () => {
    if (isDesktop) {
      return;
    }
    setInfoTooltip(true);
  };

  return (
    <Box>
      {isPassType ? (
        <>
          <Typography variant="body1" fontWeight={600} marginBottom={1}>
            {label}
          </Typography>
          <TextField
            fullWidth
            autoComplete="off"
            placeholder={placeholder}
            type={showPass ? 'text' : 'password'}
            sx={{ ...styles }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PassIcon onClick={managePassInput} showPassword={showPass} />
                </InputAdornment>
              ),
            }}
            value={value}
            onChange={onChange}
            error={error}
          />
        </>
      ) : (
        <>
          <Typography variant="body1" fontWeight={600} marginBottom={1}>
            {label}
          </Typography>
          <TextField
            fullWidth
            autoComplete="off"
            placeholder={placeholder}
            sx={{ ...styles }}
            value={value}
            onChange={onChange}
            error={error}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Лише у форматі зразок@зразок.зразок"
                    placement="top-end"
                    id="info-tooltip"
                    open={infoTooltip}
                    onOpen={() => setInfoTooltip(true)}
                    onClose={() => setInfoTooltip(false)}
                  >
                    <IconButton
                      aria-label="info tooltip"
                      aria-describedby={`info-tooltip`}
                      sx={{
                        p: 0,
                        color: (theme) => theme.palette.common.black,
                      }}
                      onClick={onClickInfoBtn}
                    >
                      <SvgSpriteIcon iconId="info" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
    </Box>
  );
};

export default InputWithLabel;
