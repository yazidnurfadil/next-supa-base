import { memo, useRef, useEffect, useCallback } from "react";

import { Input, Tooltip, InputProps } from "@heroui//react";

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import {
  useGridCellEditor,
  CustomCellEditorProps,
} from "@ag-grid-community/react";

export type TableCellTextEditorProps = Partial<InputProps> & {
  customCell?: CustomCellEditorProps;
  validationValueSetter?: (value: InputProps["value"]) => void;
};

export const TableCellTextEditor = memo(
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
          validationValueSetter?.(value);
        }, 0),
      [value]
    );

    const refInput = useRef<HTMLInputElement>(null);

    const focusIn = useCallback(() => {
      refInput.current?.focus();
      refInput.current?.select();
      // console.log("TableCellTextEditor.focusIn()");
    }, []);

    // const focusOut = useCallback(() => {
    //   console.log("TableCellTextEditor.focusOut()");
    // }, []);

    useGridCellEditor({
      focusIn,
      // focusOut,
    });

    return (
      <Input
        size="sm"
        type="text"
        value={value}
        ref={refInput}
        variant="underlined"
        isInvalid={isInvalid}
        labelPlacement="outside"
        classNames={{
          inputWrapper: ["p-0"],
        }}
        endContent={
          isInvalid ? (
            <Tooltip className="p-1" content={errorMessage as string}>
              <ExclamationTriangleIcon height="16" className="text-red-500" />
            </Tooltip>
          ) : null
        }
        {...inputProps}
      />
    );
  }
);
