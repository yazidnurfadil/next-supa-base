import { useRef, useEffect, useCallback } from "react";

import {
  Tooltip,
  DateValue,
  DatePicker,
  DatePickerProps,
} from "@heroui//react";

import { I18nProvider } from "@react-aria/i18n";
import { useGridCellEditor, CustomCellEditorProps } from "ag-grid-react";
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";
import {
  now,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";

export type TableCellDateEditorProps = Partial<
  Omit<DatePickerProps, "onChange" | "value">
> & {
  value?: string;
  customCell?: CustomCellEditorProps;
  onChange?: (value: string | null) => void;
  validationValueSetter?: (value: string) => void;
};

export const TableCellDateEditor = ({
  value,
  onChange,
  isInvalid,
  errorMessage,
  validationValueSetter,
  ...inputProps
}: TableCellDateEditorProps) => {
  const date = useRef<DateValue | undefined | null>(
    value ? parseAbsoluteToLocal(value) : null
  );

  useEffect(() => {
    const formattedVal = value ? parseAbsoluteToLocal(value) : null;
    date.current = formattedVal;
    void setTimeout(() => {
      validationValueSetter?.(value!);
    }, 0);
  }, [value]);

  const onChangeInner = (val: DatePickerProps["value"]) => {
    date.current = val!;
    onChange?.(val ? val.toDate(getLocalTimeZone()).toISOString() : null);
  };

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
    <I18nProvider locale="id-ID">
      <DatePicker
        size="sm"
        ref={refInput}
        value={date.current}
        variant="underlined"
        isInvalid={isInvalid}
        labelPlacement="outside"
        onChange={onChangeInner}
        placeholderValue={now(getLocalTimeZone())}
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
    </I18nProvider>
  );
};
