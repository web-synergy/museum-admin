import React, { memo } from "react";
import { Controller, Control } from "react-hook-form";
import {
  Box,
  TextField,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import SvgSpriteIcon from "../Common/SvgSprite";
import { TextMaskCustom } from "./Contacts";

interface ContactFieldProps {
  label: string;
  fieldName: string;
  control: Control;
  onChange: (value: string) => void;
  onSave: () => void;
  isChanged: boolean;
  isMulti?: boolean;
  rows?: number;
  iconId?: string;
  id?: string;
  inputComponent?: React.ElementType;
}

const ContactField: React.FC<ContactFieldProps> = memo(
  ({ label, fieldName, control, onChange, isMulti, rows, iconId }) => {
    const theme = useTheme();
    const shouldUseMaskedInput = fieldName === "phoneNumber";
    return (
      <Box>
        <Typography
          component={InputLabel}
          variant="body1"
          sx={{
            marginBottom: "8px",
            color: theme.palette.text.primary,
            fontWeight: "600",
          }}
        >
          {label}
        </Typography>

        <Controller
          name={fieldName}
          control={control}
          render={({ field }) =>
            shouldUseMaskedInput ? (
              <TextField
                sx={{
                  width: "100%",
                  input: {
                    fontSize: { xs: "14px", md: "16px" },
                  },
                }}
                {...field}
                multiline={isMulti}
                variant="outlined"
                rows={rows}
                InputProps={{
                  inputComponent: TextMaskCustom as never,
                  endAdornment: (
                    <SvgSpriteIcon
                      fontSize="small"
                      iconId={iconId ? iconId : ""}
                    />
                  ),
                }}
                onChange={(e) => onChange(e.target.value)}
              />
            ) : (
              <TextField
                sx={{
                  width: "100%",
                  input: {
                    fontSize: { xs: "14px", md: "16px" },
                  },
                }}
                {...(iconId && {
                  InputProps: {
                    endAdornment: (
                      <SvgSpriteIcon fontSize="small" iconId={iconId} />
                    ),
                  },
                })}
                {...field}
                multiline={isMulti}
                variant="outlined"
                rows={rows}
                onChange={(e) => onChange(e.target.value)}
              />
            )
          }
        />
      </Box>
    );
  }
);

export default ContactField;
