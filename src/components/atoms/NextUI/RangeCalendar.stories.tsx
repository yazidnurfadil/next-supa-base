import React from "react";

import { calendar } from "@heroui/theme";
import { RadioProps } from "@heroui/react";
import { clsx } from "@heroui/shared-utils";
import { Radio, RadioGroup } from "@heroui/radio";
import { Button, ButtonGroup } from "@heroui/button";
import {
  DateValue,
  RangeValue,
  RangeCalendar,
  RangeCalendarProps,
} from "@heroui/calendar";

import { Meta } from "@storybook/react";

import { useLocale, I18nProvider } from "@react-aria/i18n";
import {
  today,
  endOfWeek,
  isWeekend,
  endOfMonth,
  startOfWeek,
  CalendarDate,
  startOfMonth,
  getLocalTimeZone,
} from "@internationalized/date";

export default {
  component: RangeCalendar,
  title: "Atoms/RangeCalendar",
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
} as Meta<typeof RangeCalendar>;

delete calendar.defaultVariants?.showMonthAndYearPickers;

const defaultProps = {
  ...calendar.defaultVariants,
  visibleMonths: 1,
};

const Template = (args: RangeCalendarProps) => <RangeCalendar {...args} />;

const ControlledTemplate = (args: RangeCalendarProps) => {
  const defaultValue = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  };

  const [value, setValue] = React.useState<RangeValue<DateValue>>(defaultValue);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (uncontrolled)</p>
        <RangeCalendar
          defaultValue={defaultValue}
          aria-label="Date range (uncontrolled)"
          {...args}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-small text-default-600">Date (controlled)</p>
        <RangeCalendar
          value={value}
          onChange={setValue}
          aria-label="Date range (controlled)"
          {...args}
          color="secondary"
        />
      </div>
    </div>
  );
};

const UnavailableDatesTemplate = (args: RangeCalendarProps) => {
  const now = today(getLocalTimeZone());

  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const isDateUnavailable = (date: DateValue) =>
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  return (
    <RangeCalendar
      minValue={now}
      aria-label="Stay dates"
      isDateUnavailable={isDateUnavailable}
      {...args}
    />
  );
};

const NonContiguousRangesTemplate = (args: RangeCalendarProps) => {
  const { locale } = useLocale();

  return (
    <RangeCalendar
      allowsNonContiguousRanges
      aria-label="Time off request"
      isDateUnavailable={(date) => isWeekend(date, locale)}
      {...args}
    />
  );
};

const ControlledFocusedValueTemplate = (args: RangeCalendarProps) => {
  const defaultDate = new CalendarDate(2024, 3, 1);
  const [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <div className="flex flex-col gap-4">
      <RangeCalendar
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

const InvalidDatesTemplate = (args: RangeCalendarProps) => {
  const [date, setDate] = React.useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const { locale } = useLocale();
  const isInvalid =
    isWeekend(date.start, locale) || isWeekend(date.end, locale);

  return (
    <RangeCalendar
      {...args}
      value={date}
      onChange={setDate}
      isInvalid={isInvalid}
      aria-label="Stay dates"
      errorMessage={
        isInvalid ? "Stay dates cannot fall on weekends" : undefined
      }
    />
  );
};

const InternationalCalendarsTemplate = (args: RangeCalendarProps) => {
  return (
    <div className="flex flex-col gap-4">
      <I18nProvider locale="zh-CN-u-ca-chinese">
        <RangeCalendar aria-label="Appointment date" {...args} />
      </I18nProvider>
    </div>
  );
};

const PresetsTemplate = (args: RangeCalendarProps) => {
  const [value, setValue] = React.useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 3, weeks: 1 }),
  });

  const [focusedValue, setFocusedValue] = React.useState<DateValue>(
    today(getLocalTimeZone())
  );

  const { locale } = useLocale();

  const now = today(getLocalTimeZone());
  const nextMonth = now.add({ months: 1 });

  const nextWeek = {
    end: endOfWeek(now.add({ weeks: 1 }), locale),
    start: startOfWeek(now.add({ weeks: 1 }), locale),
  };
  const thisMonth = { end: endOfMonth(now), start: startOfMonth(now) };
  const nextMonthValue = {
    end: endOfMonth(nextMonth),
    start: startOfMonth(nextMonth),
  };

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
      <RangeCalendar
        value={value}
        onChange={setValue}
        focusedValue={focusedValue}
        onFocusChange={setFocusedValue}
        classNames={{
          content: "w-full",
        }}
        nextButtonProps={{
          variant: "bordered",
        }}
        prevButtonProps={{
          variant: "bordered",
        }}
        bottomContent={
          <RadioGroup
            orientation="horizontal"
            defaultValue="exact_dates"
            aria-label="Date precision"
            classNames={{
              base: "w-full pb-2",
              wrapper:
                "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[280px] overflow-x-scroll",
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
        topContent={
          <ButtonGroup
            fullWidth
            size="sm"
            radius="full"
            variant="bordered"
            className="max-w-full bg-content1 px-3 pt-3 pb-2 [&>button]:border-default-200/60 [&>button]:text-default-500"
          >
            <Button
              onPress={() => {
                setValue(nextWeek);
                setFocusedValue(nextWeek.end);
              }}
            >
              Next week
            </Button>
            <Button
              onPress={() => {
                setValue(thisMonth);
                setFocusedValue(thisMonth.start);
              }}
            >
              This month
            </Button>
            <Button
              onPress={() => {
                setValue(nextMonthValue);
                setFocusedValue(nextMonthValue.start);
              }}
            >
              Next month
            </Button>
          </ButtonGroup>
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
    value: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ weeks: 1 }),
    },
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
    defaultValue: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ weeks: 1 }),
    },
  },
};

export const MaxDateValue = {
  render: Template,
  args: {
    ...defaultProps,
    maxValue: today(getLocalTimeZone()),
    defaultValue: {
      end: today(getLocalTimeZone()),
      start: today(getLocalTimeZone()).subtract({ weeks: 1 }),
    },
  },
};

export const UnavailableDates = {
  render: UnavailableDatesTemplate,
  args: {
    ...defaultProps,
    defaultValue: {
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ weeks: 1 }),
    },
  },
};

export const NonContiguousRanges = {
  args: {
    ...defaultProps,
  },
  render: NonContiguousRangesTemplate,
};

export const ControlledFocusedValue = {
  args: {
    ...defaultProps,
  },
  render: ControlledFocusedValueTemplate,
};

export const InvalidDates = {
  render: InvalidDatesTemplate,
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
