import React from "react";
import { IMaskInput } from "react-imask";

export const PhoneInputMask = React.forwardRef<HTMLInputElement>(
  function TextMaskCustom(props, ref) {
    const { ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(###) ###-##-##"
        definitions={{
          "#": /[0-9]/,
        }}
        inputRef={ref}
      />
    );
  }
);
