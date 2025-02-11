import { memo, useRef, useEffect, useCallback } from "react";

import { Tooltip, InputProps } from "@heroui//react";

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import {
  useGridCellEditor,
  CustomCellEditorProps,
} from "@ag-grid-community/react";

import type { CurrencyInputProps } from "@/components/molecules/CurrencyInput/CurrencyInput";

import { CurrencyInput } from "@/components/molecules/CurrencyInput/CurrencyInput";

export type TableCellTextEditorProps = Partial<CurrencyInputProps> & {
  customCell?: CustomCellEditorProps;
  validationValueSetter?: (value: InputProps["value"]) => void;
};

const ErrorMark = memo(({ message }: { message: string }) => {
  return (
    <Tooltip className="p-1" content={message}>
      <ExclamationTriangleIcon height="16" className="text-red-500" />
    </Tooltip>
  );
});

export const TableCellCurrencyEditor = memo(
  ({
    value,
    isInvalid,
    errorMessage,
    validationValueSetter,
    ...inputProps
  }: TableCellTextEditorProps) => {
    useEffect(
      () =>
        void setTimeout(() => {
          validationValueSetter?.(value as string);
        }, 0),
      [value]
    );

    const refInput = useRef<HTMLInputElement>(null);

    // when we tab into this editor, we want to focus the contents
    const focusIn = useCallback(() => {
      refInput.current?.focus();
      refInput.current?.select();
      // console.log("TableCellTextEditor.focusIn()");
    }, []);

    // when we tab out of the editor, this gets called
    // const focusOut = useCallback(() => {
    //   console.log("TableCellTextEditor.focusOut()");
    // }, []);

    useGridCellEditor({
      focusIn,
      // focusOut,
      // isCancelAfterEnd: (params) => {
      //   console.log("params", params);
      //   return false;
      // },
    });

    return (
      <CurrencyInput
        size="sm"
        value={value}
        ref={refInput}
        variant="underlined"
        isInvalid={isInvalid}
        labelPlacement="outside"
        endContent={
          isInvalid ? <ErrorMark message={errorMessage as string} /> : null
        }
        classNames={{
          input: ["text-right"],
          inputWrapper: ["p-0 text-right"],
        }}
        {...inputProps}
      />
    );
  }
);
