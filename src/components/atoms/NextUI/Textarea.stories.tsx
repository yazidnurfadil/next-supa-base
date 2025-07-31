import React, { FormEvent } from "react";

import { input, button } from "@heroui/theme";
import { Textarea, TextAreaProps } from "@heroui/input";
import { PlusFilledIcon, SendFilledIcon } from "@heroui/shared-icons";

import { Meta } from "@storybook/react";

import type { ValidationResult } from "@react-types/shared";

export default {
  component: Textarea,
  title: "Atoms/Textarea",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
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
    disableAutosize: {
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
} as Meta<typeof Textarea>;

const defaultProps = {
  ...input.defaultVariants,
  label: "Description",
  disableAutosize: false,
  placeholder: "Enter your description",
};

const Template = (args: TextAreaProps) => (
  <div className="w-full max-w-[440px]">
    <Textarea {...args} />
  </div>
);

const ControlledTemplate = (args: TextAreaProps) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-[440px] flex-col gap-2">
      <Textarea {...args} value={value} onValueChange={setValue} />
      <p className="text-small text-default-500">Textarea value: {value}</p>
    </div>
  );
};

const MinRowsTemplate = (args: TextAreaProps) => (
  <div className="flex w-full max-w-xl flex-row gap-4">
    <Textarea {...args} description="Default minRows is 3" />
    <Textarea {...args} minRows={5} description="minRows is 5" />
    <Textarea {...args} minRows={10} description="minRows is 10" />
  </div>
);

const MaxRowsTemplate = (args: TextAreaProps) => (
  <div className="flex w-full max-w-xl flex-row gap-4">
    <Textarea {...args} description="Default maxRows is 8" />
    <Textarea {...args} maxRows={5} description="maxRows is 5" />
    <Textarea {...args} maxRows={3} description="maxRows is 3" />
  </div>
);

const FormTemplate = (args: TextAreaProps) => (
  <form
    className="flex w-full max-w-xl flex-row items-end gap-4"
    onSubmit={(e: FormEvent<HTMLFormElement>) => {
      alert(
        `Submitted value: ${
          (e.currentTarget.elements.namedItem("textarea") as HTMLInputElement)
            .value
        }`
      );
      e.preventDefault();
    }}
  >
    <div className="w-full max-w-[440px]">
      <Textarea name="textarea" {...args} />
    </div>

    <button type="submit" className={button({ color: "primary" })}>
      Submit
    </button>
  </form>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const FullRounded = {
  render: Template,

  args: {
    ...defaultProps,
    minRows: 1,
    label: null,
    radius: "full",
    variant: "bordered",
    "aria-label": "Description",
    placeholder: "Enter your description",
    classNames: {
      input: "py-1",
    },
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
    variant: "faded",
    isDisabled: true,
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    isReadOnly: true,
    variant: "bordered",
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};

export const WithStartContent = {
  render: Template,

  args: {
    ...defaultProps,
    startContent: <PlusFilledIcon className="text-xl" />,
  },
};

export const WithEndContent = {
  render: Template,

  args: {
    ...defaultProps,
    minRows: 1,
    label: null,
    radius: "full",
    variant: "bordered",
    "aria-label": "Description",
    placeholder: "Enter your description",
    classNames: {
      input: "py-1",
    },
    endContent: (
      <div className="p-1">
        <SendFilledIcon className="text-xl" />
      </div>
    ),
  },
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const MinRows = {
  render: MinRowsTemplate,

  args: {
    ...defaultProps,
  },
};

export const MaxRows = {
  render: MaxRowsTemplate,

  args: {
    ...defaultProps,
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget tincidunt nunc nisl eget nisl. Nullam euismod, nisl nec",
  },
};

export const WithErrorMessage = {
  render: Template,

  args: {
    ...defaultProps,
    IsInvalid: true,
    errorMessage: "Please enter a valid description",
  },
};

export const WithErrorMessageFunction = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    maxLength: "",
    minLength: "10",
    isRequired: true,
    label: "Comment",
    placeholder: "Enter your comment (10-100 characters)",
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.tooLong) {
        return "Comment is too short. Min 10 characters.";
      }
      if (value.validationDetails.tooShort) {
        return "Comment is too long. Max 100 characters.";
      }
      if (value.validationDetails.valueMissing) {
        return "Comment is required";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    label: "Comment",
    placeholder: "Enter your comment (10-100 characters)",
    validate: (value: string) => {
      if (value.length < 10) {
        return "Comment is too short. Min 10 characters.";
      }
      if (value.length > 100) {
        return "Comment is too long. Max 100 characters.";
      }
    },
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please enter a valid description",
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};
