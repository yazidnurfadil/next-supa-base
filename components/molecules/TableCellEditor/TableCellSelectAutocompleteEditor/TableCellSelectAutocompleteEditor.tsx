import { useRef, useEffect, useCallback } from "react";

import { Tooltip } from "@heroui//react";

import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";
import {
  useGridCellEditor,
  CustomCellEditorProps,
} from "@ag-grid-community/react";

import { SelectAutocompleteProps } from "@/components/molecules/SelectAutocomplete";
import SelectAutocomplete from "@/components/molecules/SelectAutocomplete/SelectAutocomplete";

export type TableCellSelectAutocompleteEditorProps = Partial<
  SelectAutocompleteProps & {
    customCell?: CustomCellEditorProps;
    validationValueSetter?: (value: SelectAutocompleteProps["value"]) => void;
  }
>;

export const TableCellSelectAutocompleteEditor = ({
  value,
  isInvalid,
  errorMessage,
  onSelectionChange,
  validationValueSetter,
  ...inputProps
}: TableCellSelectAutocompleteEditorProps) => {
  useEffect(
    () =>
      void setTimeout(() => {
        validationValueSetter?.(value);
      }, 0),
    [value]
  );

  const onChangeInner = useCallback(
    (value: SelectAutocompleteProps["selectedKey"]) => {
      onSelectionChange?.(value!);
    },
    []
  );

  const refInput = useRef<HTMLInputElement>(null);

  const focusIn = useCallback(() => {
    refInput.current?.focus();
    refInput.current?.select();
  }, []);

  const focusOut = useCallback(() => {
    console.log("TableCellTextEditor.focusOut()");
  }, []);

  useGridCellEditor({
    focusIn,
    focusOut,
  });

  return (
    <SelectAutocomplete
      size="sm"
      value={value}
      ref={refInput}
      variant="underlined"
      isInvalid={isInvalid}
      labelPlacement="outside"
      onSelectionChange={onChangeInner}
      classNames={{
        listboxWrapper: ["p-0"],
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
};
