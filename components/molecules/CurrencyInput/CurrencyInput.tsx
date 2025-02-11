import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import type { NumericFormatProps } from "react-number-format";

import { Input } from "@heroui//react";

import type { InputProps } from "@heroui//react";

export type CurrencyInputProps = NumericFormatProps<InputProps>;

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (props, ref) => {
    return (
      <NumericFormat
        type="tel"
        decimalScale={0}
        getInputRef={ref}
        fixedDecimalScale
        customInput={Input}
        decimalSeparator=","
        thousandSeparator="."
        valueIsNumericString={true}
        {...props}
      />
    );
  }
);

export default CurrencyInput;
