/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";

import { button, dateInput } from "@nextui-org/theme";
import { ClockCircleLinearIcon } from "@nextui-org/shared-icons";
import {
  TimeInput,
  TimeInputProps,
  TimeInputValue as TimeValue,
} from "@nextui-org/date-input";

import { Meta } from "@storybook/react";

import { useDateFormatter } from "@react-aria/i18n";
import { ValidationResult } from "@react-types/shared";
import {
  Time,
  ZonedDateTime,
  parseZonedDateTime,
  parseAbsoluteToLocal,
} from "@internationalized/date";

export default {
  component: TimeInput,
  title: "Atoms/TimeInput",
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    validationBehavior: {
      options: ["aria", "native"],
      control: {
        type: "select",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
} as Meta<typeof TimeInput>;

const defaultProps = {
  label: "Event Time",
  ...dateInput.defaultVariants,
};

const Template = (args: TimeInputProps) => <TimeInput {...args} />;

const FormTemplate = (args: TimeInputProps) => (
  <form
    className="flex flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      alert(`Submitted: ${(e.target as HTMLFormElement)["time"].value}`);
    }}
  >
    <TimeInput {...args} name="time" />
    <button type="submit" className={button({ className: "max-w-fit" })}>
      Submit
    </button>
  </form>
);

const LabelPlacementTemplate = (args: TimeInputProps) => (
  <div className="flex w-full max-w-xl flex-col items-end gap-4">
    <TimeInput {...args} description="inside" />
    <TimeInput {...args} description="outside" labelPlacement="outside" />
    <TimeInput
      {...args}
      description="outside-left"
      labelPlacement="outside-left"
    />
  </div>
);

const ControlledTemplate = (args: TimeInputProps) => {
  const [value, setValue] = React.useState<TimeValue>(
    parseAbsoluteToLocal("2024-04-08T18:45:22Z")
  );

  const formatter = useDateFormatter({ timeStyle: "long", dateStyle: "short" });

  return (
    <div className="flex w-full flex-row gap-2">
      <div className="flex w-full flex-col gap-y-2">
        <TimeInput
          {...args}
          value={value}
          onChange={setValue}
          label="Time (controlled)"
        />
        <p className="text-sm text-default-500">
          {value instanceof ZonedDateTime
            ? (value?.toDate && formatter.format(value.toDate())) ||
              (value && value.toString()) ||
              "--"
            : ""}
        </p>
      </div>

      <TimeInput
        {...args}
        label="Time (uncontrolled)"
        defaultValue={new Time(11, 45)}
      />
    </div>
  );
};

const TimeZonesTemplate = (args: TimeInputProps) => (
  <div className="flex w-full max-w-xl flex-col items-end gap-4">
    <TimeInput
      {...args}
      labelPlacement="outside"
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
    />
    <TimeInput
      {...args}
      labelPlacement="outside"
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
    />
  </div>
);

const GranularityTemplate = (args: TimeInputProps) => {
  const [date, setDate] = React.useState<TimeValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z")
  );

  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-4">
      <TimeInput
        {...args}
        label="Hour"
        value={date}
        granularity="hour"
        onChange={setDate}
      />
      <TimeInput
        {...args}
        value={date}
        label="Minute"
        onChange={setDate}
        granularity="minute"
      />
      <TimeInput
        {...args}
        value={date}
        label="Second"
        onChange={setDate}
        granularity="second"
      />
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Required = {
  render: FormTemplate,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
    defaultValue: new Time(11, 45),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: new Time(11, 45),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Event Time",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your meeting time",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid time",
  },
};

export const WithErrorMessageFunction = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: (value: ValidationResult) => {
      if (value.isInvalid) {
        return "Please enter a valid date";
      }
    },
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    startContent: (
      <ClockCircleLinearIcon className="pointer-events-none shrink-0 text-xl text-default-400" />
    ),
  },
};

export const EndContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    endContent: (
      <ClockCircleLinearIcon className="pointer-events-none shrink-0 text-xl text-default-400" />
    ),
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};

export const TimeZones = {
  render: TimeZonesTemplate,

  args: {
    ...defaultProps,
    label: "Event time",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const Granularity = {
  render: GranularityTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinTimeValue = {
  render: Template,

  args: {
    ...defaultProps,
    minValue: new Time(9),
    defaultValue: new Time(8),
  },
};

export const MaxTimeValue = {
  render: Template,

  args: {
    ...defaultProps,
    maxValue: new Time(17),
    defaultValue: new Time(18),
  },
};

export const PlaceholderValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Meeting time",
    placeholderValue: new Time(9),
  },
};

export const HideTimeZone = {
  render: Template,

  args: {
    ...defaultProps,
    hideTimeZone: true,
    label: "Meeting time",
    defaultValue: parseZonedDateTime("2022-11-07T10:45[America/Los_Angeles]"),
  },
};

export const HourCycle = {
  render: Template,

  args: {
    ...defaultProps,
    hourCycle: 24,
    label: "Meeting time",
    granularity: "minute",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};
export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Time (9 A.M. or later)",
    validate: (value: TimeValue) => {
      if (!value) {
        return "Please enter a time";
      }
      if (value.hour < 9) {
        return "Please select a time at 9 A.M. or later";
      }
    },
  },
};
