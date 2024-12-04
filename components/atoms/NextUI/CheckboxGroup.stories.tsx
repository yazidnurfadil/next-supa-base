/* eslint-disable @typescript-eslint/no-base-to-string */

import React from "react";

import { button } from "@nextui-org/theme";
import { checkbox } from "@nextui-org/theme";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
} from "@nextui-org/checkbox";

import { Meta } from "@storybook/react";

import type { ValidationResult } from "@react-types/shared";

export default {
  component: CheckboxGroup,
  title: "Atoms/CheckboxGroup",
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    lineThrough: {
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
} as Meta<typeof Checkbox>;

const defaultProps = {
  ...checkbox.defaultVariants,
};

const Template = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args}>
    <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
    <Checkbox value="sydney">Sydney</Checkbox>
    <Checkbox value="san-francisco">San Francisco</Checkbox>
    <Checkbox value="london">London</Checkbox>
    <Checkbox value="tokyo">Tokyo</Checkbox>
  </CheckboxGroup>
);

const InvalidTemplate = (args: CheckboxGroupProps) => {
  const [isInvalid, setIsInvalid] = React.useState(true);

  return (
    <>
      <CheckboxGroup
        {...args}
        isRequired
        isInvalid={isInvalid}
        label="Select cities"
        description="Select the cities you want to visit"
        onValueChange={(value) => {
          setIsInvalid(value.length < 1);
        }}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
    </>
  );
};

const FormTemplate = (args: CheckboxGroupProps) => {
  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);
        const selectedCities = formData.getAll("favorite-cities");

        alert(`Submitted values: ${selectedCities.join(", ")}`);
        e.preventDefault();
      }}
    >
      <CheckboxGroup {...args} label="Select cities" name="favorite-cities">
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
      <button type="submit" className={button({ color: "primary" })}>
        Submit
      </button>
    </form>
  );
};

const ControlledTemplate = (args: CheckboxGroupProps) => {
  const [selected, setSelected] = React.useState<string[]>(["buenos-aires"]);

  React.useEffect(() => {
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <CheckboxGroup
        {...args}
        value={selected}
        label="Select cities"
        onValueChange={setSelected}
      >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
      </CheckboxGroup>
      <p className="text-default-500">Selected: {selected.join(", ")}</p>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const WithLabel = {
  render: Template,

  args: {
    label: "Select cities",
  },
};

export const DefaultValue = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Select cities",
    defaultValue: ["buenos-aires", "london"],
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const Horizontal = {
  render: Template,

  args: {
    label: "Select cities",
    orientation: "horizontal",
  },
};

export const IsDisabled = {
  render: Template,

  args: {
    isDisabled: true,
    label: "Select cities",
  },
};

export const LineThrough = {
  render: Template,

  args: {
    lineThrough: true,
    label: "Select cities",
  },
};

export const WithDescription = {
  render: Template,

  args: {
    ...defaultProps,
    description: "Select the cities you want to visit",
  },
};

export const IsInvalid = {
  render: InvalidTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "The selected cities cannot be visited at the same time",
  },
};

export const WithErrorMessageFunction = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.valueMissing) {
        return "At least one option must be selected";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    description: "Please select at least 2 options",
    validate: (value: string[]) => {
      if (value.length < 2) {
        return "You must select at least 2 options";
      }

      return null;
    },
  },
};

export const DisableAnimation = {
  render: Template,

  args: {
    label: "Select cities",
    disableAnimation: true,
  },
};

export const IsRequired = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};
