/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from "react";

import { cn } from "@heroui/theme";
import { button, dateInput } from "@heroui/theme";
import { Button, ButtonGroup } from "@heroui/button";
import { Radio, RadioGroup, RadioProps } from "@heroui/radio";
import { DatePicker, DatePickerProps } from "@heroui/date-picker";

import { Meta } from "@storybook/react";

import { ValidationResult } from "@react-types/shared";
import { useLocale, I18nProvider, useDateFormatter } from "@react-aria/i18n";
import {
  now,
  today,
  DateValue,
  isWeekend,
  parseDate,
  startOfWeek,
  startOfMonth,
  getLocalTimeZone,
  parseZonedDateTime,
  parseAbsoluteToLocal,
} from "@internationalized/date";

export default {
  component: DatePicker,
  title: "Atoms/DatePicker",
  decorators: [
    (Story) => (
      <div className="flex items-center justify-start">
        <Story />
      </div>
    ),
  ],
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
} as Meta<typeof DatePicker>;

const defaultProps = {
  label: "Birth Date",
  className: "max-w-[256px]",
  ...dateInput.defaultVariants,
};

const Template = (args: DatePickerProps) => <DatePicker {...args} />;

const FormTemplate = (args: DatePickerProps) => (
  <form
    className="flex w-full flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();
      alert(`Submitted: ${(e.target as HTMLFormElement)["date"].value}`);
    }}
  >
    <DatePicker {...args} name="date" />
    <button type="submit" className={button({ className: "max-w-fit" })}>
      Submit
    </button>
  </form>
);

const LabelPlacementTemplate = (args: DatePickerProps) => (
  <div className="flex w-full max-w-xl flex-col items-start gap-4">
    <DatePicker {...args} description="inside" />
    <DatePicker {...args} description="outside" labelPlacement="outside" />
    <DatePicker
      {...args}
      description="outside-left"
      labelPlacement="outside-left"
    />
  </div>
);

const ControlledTemplate = (args: DatePickerProps) => {
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-04-04"));

  const formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <div className="flex flex-row gap-2">
      <div className="flex w-full flex-col gap-y-2">
        <DatePicker
          {...args}
          value={value}
          label="Date (controlled)"
          onChange={(data) => setValue(data as DateValue)}
        />
        <p className="text-sm text-default-500">
          Selected date:{" "}
          {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
        </p>
      </div>
      <DatePicker
        {...args}
        label="Date (uncontrolled)"
        defaultValue={parseDate("2024-04-04")}
      />
    </div>
  );
};

const TimeZonesTemplate = (args: DatePickerProps) => (
  <div className="flex w-full max-w-xl flex-col items-start gap-4">
    <DatePicker
      {...args}
      className="max-w-xs"
      labelPlacement="outside"
      defaultValue={parseZonedDateTime("2022-11-07T00:45[America/Los_Angeles]")}
    />
    <DatePicker
      // {...args}
      className="max-w-xs"
      labelPlacement="outside"
      defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:00Z")}
    />
  </div>
);

const GranularityTemplate = (args: DatePickerProps) => {
  const [date, setDate] = React.useState<DateValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z")
  );

  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-4">
      <DatePicker
        {...args}
        value={date}
        className="max-w-md"
        granularity="second"
        label="Date and time"
        onChange={(data) => setDate(data as DateValue)}
      />
      <DatePicker
        {...args}
        label="Date"
        value={date}
        granularity="day"
        className="max-w-md"
        onChange={(data) => setDate(data as DateValue)}
      />
      <DatePicker
        {...args}
        label="Event date"
        className="max-w-md"
        granularity="second"
      />
      <DatePicker
        {...args}
        label="Event date"
        className="max-w-md"
        granularity="second"
        placeholderValue={now("America/New_York")}
      />
    </div>
  );
};

const InternationalCalendarsTemplate = (args: DatePickerProps) => {
  const [date, setDate] = React.useState<DateValue>(
    parseAbsoluteToLocal("2021-04-07T18:45:22Z")
  );

  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="hi-IN-u-ca-indian">
        <DatePicker
          {...args}
          value={date}
          className="max-w-md"
          label="Appointment date"
          onChange={(data) => setDate(data as DateValue)}
        />
      </I18nProvider>
    </div>
  );
};

const PresetsTemplate = (args: DatePickerProps) => {
  const defaultDate = today(getLocalTimeZone());

  const [value, setValue] = React.useState<DateValue>(defaultDate);

  const { locale } = useLocale();
  const formatter = useDateFormatter({ dateStyle: "full" });

  const now = today(getLocalTimeZone());
  const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
  const nextMonth = startOfMonth(now.add({ months: 1 }));

  const CustomRadio = (props: RadioProps) => {
    const { children, ...otherProps } = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          wrapper: "hidden",
          labelWrapper: "px-1 m-0",
          label: "text-tiny text-default-500",
          base: cn(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary"
          ),
        }}
      >
        {children}
      </Radio>
    );
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <DatePicker
        value={value}
        onChange={(data) => setValue(data as DateValue)}
        calendarProps={{
          focusedValue: value,
          onFocusChange: setValue,
          nextButtonProps: {
            variant: "bordered",
          },
          prevButtonProps: {
            variant: "bordered",
          },
        }}
        CalendarTopContent={
          <ButtonGroup
            fullWidth
            size="sm"
            radius="full"
            variant="bordered"
            className="bg-content1 px-3 pb-2 pt-3 [&>button]:border-default-200/60 [&>button]:text-default-500"
          >
            <Button onPress={() => setValue(now)}>Today</Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        CalendarBottomContent={
          <RadioGroup
            orientation="horizontal"
            defaultValue="exact_dates"
            aria-label="Date precision"
            classNames={{
              base: "w-full pb-2",
              wrapper:
                "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-scroll",
            }}
          >
            <CustomRadio value="exact_dates">Exact dates</CustomRadio>
            <CustomRadio value="1_day">1 day</CustomRadio>
            <CustomRadio value="2_days">2 days</CustomRadio>
            <CustomRadio value="3_days">3 days</CustomRadio>
            <CustomRadio value="7_days">7 days</CustomRadio>
            <CustomRadio value="14_days">14 days</CustomRadio>
          </RadioGroup>
        }
        {...args}
        label="Event date"
      />
      <p className="text-sm text-default-500">
        Selected date:{" "}
        {value ? formatter.format(value.toDate(getLocalTimeZone())) : "--"}
      </p>
    </div>
  );
};

const UnavailableDatesTemplate = (args: DatePickerProps) => {
  const now = today(getLocalTimeZone());

  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const { locale } = useLocale();

  const isDateUnavailable = (date: DateValue) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  return (
    <DatePicker
      aria-label="Appointment date"
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      {...args}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithMonthAndYearPickers = {
  render: Template,
  args: {
    ...defaultProps,
    variant: "bordered",
    showMonthAndYearPickers: true,
  },
};

export const WithTimeField = {
  render: Template,
  args: {
    ...defaultProps,
    hideTimeZone: true,
    label: "Event date",
    showMonthAndYearPickers: true,
    defaultValue: now(getLocalTimeZone()),
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,
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

export const SelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    selectorIcon: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <g
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 2v4m8-4v4" />
          <rect x="3" y="4" rx="2" width="18" height="18" />
          <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </g>
      </svg>
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
  render: InternationalCalendarsTemplate,

  args: {
    ...defaultProps,
    showMonthAndYearPickers: true,
  },
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
    defaultValue: parseDate("2024-04-05"),
  },
};

export const UnavailableDates = {
  render: UnavailableDatesTemplate,
  args: {
    ...defaultProps,
    defaultValue: today(getLocalTimeZone()),
    unavailableDates: [today(getLocalTimeZone())],
  },
};

export const VisibleMonths = {
  render: Template,

  args: {
    ...defaultProps,
    visibleMonths: 2,
  },
};

export const PageBehavior = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 2,
    pageBehavior: "single",
  },
};

export const Presets = {
  render: PresetsTemplate,
  args: {
    ...defaultProps,
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

export const WithDateInputClassNames = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
    description: "Please enter your birth date",
    dateInputClassNames: {
      description: "text-black",
      base: "bg-gray-200 p-2 rounded-md",
      label: "text-blue-400 font-semibold",
      inputWrapper: "border-3 border-solid border-blue-400 p-2 rounded-md",
    },
  },
};
