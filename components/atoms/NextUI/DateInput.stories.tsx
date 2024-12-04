/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from "react";

import { button, dateInput } from "@nextui-org/theme";
import { CalendarBoldIcon } from "@nextui-org/shared-icons";
import { DateInput, DateInputProps } from "@nextui-org/date-input";

import { Meta } from "@storybook/react";

import { ValidationResult } from "@react-types/shared";
import { I18nProvider, useDateFormatter } from "@react-aria/i18n";
import {
  now,
  today,
  DateValue,
  parseDate,
  CalendarDate,
  getLocalTimeZone,
  parseZonedDateTime,
  parseAbsoluteToLocal,
} from "@internationalized/date";

export default {
  component: DateInput,
  title: "Atoms/DateInput",
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
} as Meta<typeof DateInput>;

const defaultProps = {
  label: "Birth date",
  ...dateInput.defaultVariants,
};

const Template = (args: DateInputProps) => (
  <DateInput {...args} placeholderValue={new CalendarDate(1995, 11, 6)} />
);

const FormTemplate = (args: DateInputProps) => (
  <form
    className="flex flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      alert(`Submitted: ${(e.target as HTMLFormElement)["date"].value}`);
    }}
  >
    <DateInput {...args} name="date" />
    <button type="submit" className={button({ className: "max-w-fit" })}>
      Submit
    </button>
  </form>
);

const LabelPlacementTemplate = (args: DateInputProps) => (
  <div className="flex w-full max-w-xl flex-col items-end gap-4">
    <DateInput {...args} description="inside" />
    <DateInput {...args} description="outside" labelPlacement="outside" />
    <DateInput
      {...args}
      description="outside-left"
      labelPlacement="outside-left"
    />
  </div>
);

const ControlledTemplate = (args: DateInputProps) => {
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-04-04"));

  const formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <div className="flex w-full flex-row gap-2">
      <div className="flex w-full flex-col gap-y-2">
        <DateInput
          {...args}
          value={value}
          onChange={setValue}
          label="Date (controlled)"
        />
        <p className="text-sm text-default-500">
          Selected date:{" "}
          {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DateInput
        {...args}
        label="Date (uncontrolled)"
        defaultValue={parseDate("2024-04-04")}
      />
    </div>
  );
};

const TimeZonesTemplate = (args: DateInputProps) => (
  <div className="flex w-full max-w-xl flex-col items-end gap-4">
    <DateInput
      {...args}
      labelPlacement="outside"
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
    />
    <DateInput
      {...args}
      labelPlacement="outside"
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
    />
  </div>
);

const GranularityTemplate = (args: DateInputProps) => {
  const [date, setDate] = React.useState<DateValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z")
  );

  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-4">
      <DateInput
        {...args}
        value={date}
        onChange={setDate}
        granularity="second"
        label="Date and time"
      />
      <DateInput
        {...args}
        label="Date"
        value={date}
        granularity="day"
        onChange={setDate}
      />
      <DateInput {...args} label="Event date" granularity="second" />
      <DateInput
        {...args}
        label="Event date"
        granularity="second"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
};

const InternationalCalendarsTemplate = (args: DateInputProps) => {
  const [date, setDate] = React.useState<DateValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z")
  );

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DateInput
          {...args}
          value={date}
          onChange={setDate}
          label="Appointment date"
        />
      </I18nProvider>
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
    defaultValue: parseDate("2024-04-04"),
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultValue: parseDate("2024-04-04"),
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    "aria-label": "Birth date",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Please enter your birth date",
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
      <CalendarBoldIcon className="pointer-events-none shrink-0 text-2xl text-default-400" />
    ),
  },
};

export const EndContent = {
  render: Template,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    endContent: (
      <CalendarBoldIcon className="pointer-events-none shrink-0 text-2xl text-default-400" />
    ),
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid date",
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

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultValue: parseDate("2024-04-04"),
    errorMessage: "Please enter a valid date",
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
    label: "Event date",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const Granularity = {
  render: GranularityTemplate,

  args: {
    ...defaultProps,
  },
};

export const InternationalCalendars = {
  args: {
    ...defaultProps,
  },

  render: InternationalCalendarsTemplate,
};

export const MinDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    minValue: today(getLocalTimeZone()),
    defaultValue: parseDate("2024-04-03"),
  },
};

export const MaxDateValue = {
  render: Template,

  args: {
    ...defaultProps,
    maxValue: today(getLocalTimeZone()),
    defaultValue: today(getLocalTimeZone()).add({ days: 1 }),
  },
};

export const PlaceholderValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Appointment time",
    defaultValue: today(getLocalTimeZone()),
    placeholderValue: new CalendarDate(1995, 11, 6),
  },
};

export const HideTimeZone = {
  render: Template,

  args: {
    ...defaultProps,
    hideTimeZone: true,
    label: "Appointment time",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const HourCycle = {
  render: Template,

  args: {
    ...defaultProps,
    hourCycle: 24,
    granularity: "minute",
    label: "Appointment time",
    defaultValue: parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]"),
  },
};

export const UnavailableDates = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Appointment date (Unavailable: Jan 1 - Jan 8, 2024)",
    isDateUnavailable: (date: DateValue) => {
      return (
        date.compare(new CalendarDate(2024, 1, 1)) >= 0 &&
        date.compare(new CalendarDate(2024, 1, 8)) <= 0
      );
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Date (Year 2024 or later)",
    validate: (value: DateValue) => {
      if (!value) {
        return "Please enter a date";
      }
      if (value.year < 2024) {
        return "Please select a date in the year 2024 or later";
      }
    },
  },
};
