/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { useForm } from "react-hook-form";

import { clsx } from "@nextui-org/shared-utils";
import { button, toggle } from "@nextui-org/theme";
import { Switch, useSwitch, SwitchProps } from "@nextui-org/switch";
import { SunFilledIcon, MoonFilledIcon } from "@nextui-org/shared-icons";

import { Meta } from "@storybook/react";

import type { SwitchThumbIconProps } from "@nextui-org/switch";

import { VisuallyHidden } from "@react-aria/visually-hidden";

export default {
  component: Switch,
  title: "Atoms/Switch",
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
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
} as Meta<typeof Switch>;

const defaultProps = {
  ...toggle.defaultVariants,
};

const WithIconsTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch
        {...args}
        isSelected={isSelected}
        onValueChange={setIsSelected}
        endContent={<MoonFilledIcon />}
        startContent={<SunFilledIcon />}
        classNames={{
          startContent: "text-white",
        }}
      />
      <p className="text-default-500">
        Selected: {isSelected ? "true" : "false"}
      </p>
    </div>
  );
};

const ControlledTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch {...args} isSelected={isSelected} onValueChange={setIsSelected} />
      <p className="text-default-500">
        Selected: {isSelected ? "true" : "false"}
      </p>
    </div>
  );
};

const CustomWithClassNamesTemplate = (args: SwitchProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2">
      <Switch
        size="lg"
        isSelected={isSelected}
        onValueChange={setIsSelected}
        classNames={{
          base: clsx(
            "inline-flex w-full max-w-md cursor-pointer flex-row-reverse items-center justify-between gap-2 rounded-lg border-2 border-transparent bg-content1 p-4 hover:bg-content2",
            {
              "border-primary": isSelected,
            }
          ),
        }}
        {...args}
      >
        <div className="flex flex-col gap-1">
          <p className="text-base">Enable early access</p>
          <p className="text-xs text-default-400">
            Get access to new features before they are released.
          </p>
        </div>
      </Switch>
      <p className="text-default-500">
        Selected: {isSelected ? "true" : "false"}
      </p>
    </div>
  );
};

const CustomWithHooksTemplate = (args: SwitchProps) => {
  const {
    slots,
    Component,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(args);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "h-8 w-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {isSelected ? <SunFilledIcon /> : <MoonFilledIcon />}
        </div>
      </Component>
      <p className="select-none text-default-500">
        Lights: {isSelected ? "on" : "off"}
      </p>
    </div>
  );
};

const WithReactHookFormTemplate = (args: SwitchProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      defaultTrue: true,
      defaultFalse: false,
      requiredField: false,
    },
  });

  const onSubmit = (data: Record<string, boolean | string>) => {
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Switch {...args} {...register("defaultTrue")}>
        By default this switch is true
      </Switch>
      <Switch {...args} {...register("defaultFalse")}>
        By default this switch is false
      </Switch>
      <Switch {...args} {...register("requiredField", { required: true })}>
        This switch is required
      </Switch>
      {errors.requiredField && (
        <span className="text-danger">This switch is required</span>
      )}
      <button type="submit" className={button({ class: "w-fit" })}>
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

export const IsReadOnly = {
  args: {
    ...defaultProps,
    isReadOnly: true,
    defaultSelected: true,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    children: "Bluetooth",
  },
};

export const DisableAnimation = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const WithThumbIcon = {
  args: {
    ...defaultProps,
    size: "xl",
    thumbIcon: (props: SwitchThumbIconProps) =>
      props.isSelected ? (
        <SunFilledIcon className={props.className} />
      ) : (
        <MoonFilledIcon className={props.className} />
      ),
  },
};

export const WithIcons = {
  render: WithIconsTemplate,

  args: {
    ...defaultProps,
    size: "xl",
  },
};

export const WithReactHookForm = {
  args: {
    ...defaultProps,
  },

  render: WithReactHookFormTemplate,
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
  },

  render: CustomWithClassNamesTemplate,
};

export const CustomWithHooks = {
  render: CustomWithHooksTemplate,

  args: {
    ...defaultProps,
  },
};
