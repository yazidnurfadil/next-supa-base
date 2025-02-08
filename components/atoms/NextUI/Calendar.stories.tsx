import React from "react";

import { calendar } from "@heroui/theme";
import { RadioProps } from "@heroui/react";
import { clsx } from "@heroui/shared-utils";
import { Radio, RadioGroup } from "@heroui/radio";
import { Button, ButtonGroup } from "@heroui/button";
import { Calendar, DateValue, CalendarProps } from "@heroui/calendar";

import { Meta } from "@storybook/react";

import { useLocale, I18nProvider } from "@react-aria/i18n";
import {
  today,
  isWeekend,
  parseDate,
  startOfWeek,
  startOfMonth,
  getLocalTimeZone,
} from "@internationalized/date";

export default {
  component: Calendar,
  title: "Atoms/Calendar",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    visibleMonths: {
      control: { min: 1, max: 3, type: "number" },
    },
    weekdayStyle: {
      options: ["narrow", "short", "long"],
      control: {
        type: "select",
      },
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "foreground",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
} as Meta<typeof Calendar>;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: CalendarProps) => <Calendar {...args} />;

const ControlledTemplate = (args: CalendarProps) => {
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-03-07"));

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (uncontrolled)</p>
        <Calendar
          aria-label="Date (uncontrolled)"
          defaultValue={parseDate("2024-03-07")}
          {...args}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (controlled)</p>
        <Calendar
          value={value}
          onChange={setValue}
          aria-label="Date (controlled)"
          {...args}
          color="secondary"
        />
      </div>
    </div>
  );
};

const UnavailableDatesTemplate = (args: CalendarProps) => {
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
    <Calendar
      aria-label="Appointment date"
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      {...args}
    />
  );
};

const ControlledFocusedValueTemplate = (args: CalendarProps) => {
  const defaultDate = today(getLocalTimeZone());
  const [focusedDate, setFocusedDate] = React.useState<DateValue>(defaultDate);

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        value={defaultDate}
        focusedValue={focusedDate}
        onFocusChange={setFocusedDate}
        {...args}
      />
      <Button
        variant="flat"
        color="primary"
        className="max-w-fit"
        onPress={() => setFocusedDate(defaultDate)}
      >
        Reset focused date
      </Button>
    </div>
  );
};

const InvalidDateTemplate = (args: CalendarProps) => {
  const [date, setDate] = React.useState<DateValue>(today(getLocalTimeZone()));
  const { locale } = useLocale();
  const isInvalid = isWeekend(date, locale);

  return (
    <Calendar
      {...args}
      value={date}
      onChange={setDate}
      isInvalid={isInvalid}
      aria-label="Appointment date"
      errorMessage={isInvalid ? "We are closed on weekends" : undefined}
    />
  );
};

const InternationalCalendarsTemplate = (args: CalendarProps) => {
  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="zh-CN-u-ca-chinese">
        <Calendar aria-label="Appointment date" {...args} />
      </I18nProvider>
    </div>
  );
};

const PresetsTemplate = (args: CalendarProps) => {
  const defaultDate = today(getLocalTimeZone());
  const [value, setValue] = React.useState<DateValue>(defaultDate);
  const { locale } = useLocale();

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
          base: clsx(
            "m-0 h-8 flex-none items-center justify-between bg-content1 hover:bg-content2",
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
    <div className="flex flex-col gap-4">
      <Calendar
        value={value}
        onChange={setValue}
        focusedValue={value}
        onFocusChange={setValue}
        classNames={{
          content: "w-full",
        }}
        nextButtonProps={{
          variant: "bordered",
        }}
        prevButtonProps={{
          variant: "bordered",
        }}
        topContent={
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
        bottomContent={
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

export const Disabled = {
  render: Template,
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const ReadOnly = {
  render: Template,
  args: {
    ...defaultProps,
    isReadOnly: true,
    value: today(getLocalTimeZone()),
  },
};

export const Controlled = {
  render: ControlledTemplate,
  args: {
    ...defaultProps,
  },
};

export const MinDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    minValue: today(getLocalTimeZone()),
    defaultValue: today(getLocalTimeZone()),
  },
};

export const MaxDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    maxValue: today(getLocalTimeZone()),
    defaultValue: today(getLocalTimeZone()),
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

export const ControlledFocusedValue = {
  args: {
    ...defaultProps,
  },
  render: ControlledFocusedValueTemplate,
};

export const InvalidDate = {
  render: InvalidDateTemplate,
  args: {
    ...defaultProps,
  },
};

export const WithMonthAndYearPickers = {
  render: Template,
  args: {
    ...defaultProps,
    showMonthAndYearPickers: true,
  },
};

export const InternationalCalendars = {
  render: InternationalCalendarsTemplate,
  args: {
    ...defaultProps,
    showMonthAndYearPickers: true,
  },
};

export const VisibleMonths = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 3,
  },
};

export const PageBehavior = {
  render: Template,
  args: {
    ...defaultProps,
    visibleMonths: 3,
    pageBehavior: "single",
  },
};

export const Presets = {
  render: PresetsTemplate,
  args: {
    ...defaultProps,
  },
};
