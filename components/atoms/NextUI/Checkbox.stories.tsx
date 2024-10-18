import React, { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Meta } from "@storybook/react";

import {
  Checkbox,
  CheckboxIconProps,
  CheckboxProps,
} from "@nextui-org/checkbox";
import { CloseIcon } from "@nextui-org/shared-icons";
import { button, checkbox } from "@nextui-org/theme";

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
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
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    lineThrough: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
} as Meta<typeof Checkbox>;

const defaultProps: CheckboxProps = {
  ...checkbox.defaultVariants,
  children: "Option",
};

const ControlledTemplate = (args: CheckboxProps) => {
  const [selected, setSelected] = React.useState<boolean>(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isSelected={selected} onValueChange={setSelected} {...args}>
        Subscribe (controlled)
      </Checkbox>
      <p className="text-default-500">
        Selected: {selected ? "true" : "false"}
      </p>
      <button onClick={() => setSelected(!selected)}>Toggle</button>
    </div>
  );
};

const FormTemplate = (args: CheckboxProps) => {
  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const checkbox = e.currentTarget.elements.namedItem(
          "check"
        ) as HTMLInputElement;

        if (checkbox.checked) {
          alert(`Submitted value: ${checkbox.value}`);
        } else {
          alert("Checkbox is not checked");
        }
      }}
    >
      <Checkbox name="check" value="checked" {...args}>
        Check
      </Checkbox>
      <button className={button({ color: "primary" })} type="submit">
        Submit
      </button>
    </form>
  );
};

const GroupTemplate = (args: CheckboxProps) => {
  const items = ["Apple", "Banana", "Orange", "Mango"];

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const isSelected = (value: string) => {
    return selectedItems.some((selected) => selected === value);
  };

  const handleValueChange = (value: string) => {
    setSelectedItems([value]);
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      <h2>List of Fruits</h2>

      {items.map((item, index) => (
        <Checkbox
          {...args}
          key={index}
          className="text-white"
          color="primary"
          isSelected={isSelected(item)}
          onValueChange={() => handleValueChange(item)}
        >
          {item} {isSelected(item) ? "/ state: true" : "/ state: false"}
        </Checkbox>
      ))}
    </div>
  );
};

const WithReactHookFormTemplate = (args: CheckboxProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + data.example);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Checkbox {...args} {...register("example", { required: true })} />
      {errors.example && (
        <span className="text-danger">This field is required</span>
      )}
      <button className={button({ class: "w-fit" })} type="submit">
        Submit
      </button>
    </form>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DefaultSelected = {
  args: {
    ...defaultProps,
    defaultSelected: true,
  },
};

export const CustomIconNode = {
  args: {
    ...defaultProps,
    icon: <CloseIcon />,
  },
};

export const Group = {
  render: GroupTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithReactHookForm = {
  render: WithReactHookFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomIconFunction = {
  args: {
    ...defaultProps,
    // eslint-disable-next-line react/display-name
    icon: (props: CheckboxIconProps) => <CloseIcon {...props} />,
  },
};

export const AlwaysSelected = {
  args: {
    ...defaultProps,
    isSelected: true,
  },
};

export const IsIndeterminate = {
  args: {
    ...defaultProps,
    isIndeterminate: true,
  },
};

export const LineThrough = {
  args: {
    ...defaultProps,
    lineThrough: true,
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
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
