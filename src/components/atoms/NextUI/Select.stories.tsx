/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useForm } from "react-hook-form";
import React, { ChangeEvent } from "react";

import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { button, select } from "@heroui/theme";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { PetBoldIcon, SelectorIcon } from "@heroui/shared-icons";
import {
  Select,
  SelectItem,
  SelectProps,
  SelectedItems,
  SelectSection,
} from "@heroui/select";
import {
  User,
  Animal,
  Pokemon,
  usersData,
  animalsData,
  usePokemonList,
} from "@heroui/stories-utils/dist";

import { Meta } from "@storybook/react";

import type { ValidationResult } from "@react-types/shared";

import { Selection } from "@react-types/shared";

export default {
  component: Select,
  title: "Atoms/Select",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-start justify-center">
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
} as Meta<typeof Select>;

const defaultProps = {
  ...select.defaultVariants,
};

const items = animalsData.map((item) => (
  <SelectItem key={item.value}>{item.label}</SelectItem>
));

const Template = ({ color, variant, ...args }: SelectProps) => (
  <Select
    color={color}
    variant={variant}
    className="max-w-xs"
    label="Favorite Animal"
    {...args}
  >
    {items}
  </Select>
);

const DynamicTemplate = ({ color, variant, ...args }: SelectProps<Animal>) => (
  <Select
    color={color}
    variant={variant}
    items={animalsData}
    className="max-w-xs"
    label="Favorite Animal"
    {...args}
  >
    {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
  </Select>
);

const DynamicTemplateWithDescriptions = ({
  color,
  variant,
  ...args
}: SelectProps<Animal>) => (
  <Select
    color={color}
    variant={variant}
    items={animalsData}
    className="max-w-xs"
    label="Favorite Animal"
    {...args}
  >
    {(item) => (
      <SelectItem key={item.value} description={item.description}>
        {item.label}
      </SelectItem>
    )}
  </Select>
);

const ItemStartContentTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<Animal>) => (
  <Select
    color={color}
    variant={variant}
    className="max-w-xs"
    label="Select country"
    {...args}
  >
    <SelectItem
      key="argentina"
      startContent={
        <Avatar
          alt="Argentina"
          className="size-6"
          src="https://flagcdn.com/ar.svg"
        />
      }
    >
      Argentina
    </SelectItem>
    <SelectItem
      key="venezuela"
      startContent={
        <Avatar
          alt="Venezuela"
          className="size-6"
          src="https://flagcdn.com/ve.svg"
        />
      }
    >
      Venezuela
    </SelectItem>
    <SelectItem
      key="brazil"
      startContent={
        <Avatar
          alt="Brazil"
          className="size-6"
          src="https://flagcdn.com/br.svg"
        />
      }
    >
      Brazil
    </SelectItem>
    <SelectItem
      key="switzerland"
      startContent={
        <Avatar
          alt="Switzerland"
          className="size-6"
          src="https://flagcdn.com/ch.svg"
        />
      }
    >
      Switzerland
    </SelectItem>
    <SelectItem
      key="germany"
      startContent={
        <Avatar
          alt="Germany"
          className="size-6"
          src="https://flagcdn.com/de.svg"
        />
      }
    >
      Germany
    </SelectItem>
    <SelectItem
      key="spain"
      startContent={
        <Avatar
          alt="Spain"
          className="size-6"
          src="https://flagcdn.com/es.svg"
        />
      }
    >
      Spain
    </SelectItem>
    <SelectItem
      key="france"
      startContent={
        <Avatar
          alt="France"
          className="size-6"
          src="https://flagcdn.com/fr.svg"
        />
      }
    >
      France
    </SelectItem>
    <SelectItem
      key="italy"
      startContent={
        <Avatar
          alt="Italy"
          className="size-6"
          src="https://flagcdn.com/it.svg"
        />
      }
    >
      Italy
    </SelectItem>
    <SelectItem
      key="mexico"
      startContent={
        <Avatar
          alt="Mexico"
          className="size-6"
          src="https://flagcdn.com/mx.svg"
        />
      }
    >
      Mexico
    </SelectItem>
  </Select>
);

const ControlledTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<Animal>) => {
  const [value, setValue] = React.useState<Selection>(new Set(["cat"]));

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        color={color}
        variant={variant}
        items={animalsData}
        selectedKeys={value}
        label="Favorite Animal"
        onChange={handleSelectionChange}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">Selected: {value}</p>
    </div>
  );
};

const ControlledOpenTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<Animal>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <Select
        color={color}
        isOpen={isOpen}
        variant={variant}
        className="max-w-xs"
        label="Favorite Animal"
        onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
        {...args}
      >
        {items}
      </Select>
      <Button onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </Button>
    </div>
  );
};

const ControlledMultipleTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<Animal>) => {
  const [values, setValues] = React.useState<Selection>(
    new Set(["cat", "dog"])
  );

  const handleSelectionChange = (items: Selection) => {
    setValues(items);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        fullWidth
        color={color}
        variant={variant}
        items={animalsData}
        selectedKeys={values}
        label="Favorite Animal"
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
        {...args}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
      <p className="text-default-500">
        Selected: {Array.from(values).join(", ")}
      </p>
    </div>
  );
};

const FormTemplate = ({ color, variant, ...args }: SelectProps) => {
  return (
    <form
      className="flex w-full max-w-xs flex-col items-end gap-4"
      onSubmit={(e) => {
        alert(
          `Submitted value: ${
            (e.target as HTMLFormElement)["favorite-animal"].value
          }`
        );
        e.preventDefault();
      }}
    >
      <Select
        color={color}
        variant={variant}
        name="favorite-animal"
        label="Favorite Animal"
        {...args}
      >
        {items}
      </Select>
      <button type="submit" className={button({ className: "max-w-fit" })}>
        Submit
      </button>
    </form>
  );
};

const MirrorTemplate = ({ color, variant, ...args }: SelectProps) => (
  <div className="flex w-full max-w-xl flex-row gap-4">
    <Select
      color={color}
      variant={variant}
      className="max-w-xs"
      label="Select an animal"
      {...args}
    >
      {items}
    </Select>
    <Select
      color={color}
      variant={variant}
      className="max-w-xs"
      label="Favorite Animal"
      placeholder="Select an animal"
      {...args}
    >
      {items}
    </Select>
  </div>
);

const LabelPlacementTemplate = ({ color, variant, ...args }: SelectProps) => (
  <div className="flex w-full flex-col items-center gap-12">
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="flex w-full flex-row items-end gap-4">
        <Select
          color={color}
          variant={variant}
          label="Select an animal"
          {...args}
        >
          {items}
        </Select>
        <Select
          color={color}
          variant={variant}
          label="Select an animal"
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          variant={variant}
          label="Select an animal"
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="flex w-full flex-row items-end gap-4">
        <Select
          color={color}
          variant={variant}
          label="Favorite Animal"
          placeholder="Select an animal"
          {...args}
        >
          {items}
        </Select>
        <Select
          color={color}
          variant={variant}
          label="Favorite Animal"
          placeholder="Select an animal"
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Select>
        <Select
          color={color}
          variant={variant}
          label="Favorite Animal"
          placeholder="Select an animal"
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Select>
      </div>
    </div>
  </div>
);

const StartContentTemplate = ({ color, variant, ...args }: SelectProps) => (
  <Select
    color={color}
    variant={variant}
    className="max-w-xs"
    label="Favorite Animal"
    defaultSelectedKeys={["cat"]}
    startContent={<PetBoldIcon />}
    {...args}
  >
    {items}
  </Select>
);

const CustomItemsTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<User>) => (
  <div className="flex w-full justify-center gap-2">
    <Select
      color={color}
      items={usersData}
      variant={variant}
      label="Assigned to"
      className="mt-8 max-w-xs"
      {...args}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              alt={item.name}
              src={item.avatar}
              className="shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-default-400 text-tiny">{item.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
    <Select
      color={color}
      items={usersData}
      variant={variant}
      label="Assigned to"
      className="mt-8 max-w-xs"
      placeholder="Assigned to"
      {...args}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              alt={item.name}
              src={item.avatar}
              className="shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-default-400 text-tiny">{item.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  </div>
);

const WithSectionsTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<User>) => (
  <Select
    color={color}
    variant={variant}
    className="max-w-xs"
    label="Favorite Animal"
    {...args}
  >
    <SelectSection showDivider title="Mammals">
      <SelectItem key="Lion">Lion</SelectItem>
      <SelectItem key="Tiger">Tiger</SelectItem>
      <SelectItem key="Elephant">Elephant</SelectItem>
      <SelectItem key="Kangaroo">Kangaroo</SelectItem>
      <SelectItem key="Panda">Panda</SelectItem>
      <SelectItem key="Giraffe">Giraffe</SelectItem>
      <SelectItem key="Zebra">Zebra</SelectItem>
      <SelectItem key="Cheetah">Cheetah</SelectItem>
    </SelectSection>
    <SelectSection title="Birds">
      <SelectItem key="Eagle">Eagle</SelectItem>
      <SelectItem key="Parrot">Parrot</SelectItem>
      <SelectItem key="Penguin">Penguin</SelectItem>
      <SelectItem key="Ostrich">Ostrich</SelectItem>
      <SelectItem key="Peacock">Peacock</SelectItem>
      <SelectItem key="Swan">Swan</SelectItem>
      <SelectItem key="Falcon">Falcon</SelectItem>
      <SelectItem key="Flamingo">Flamingo</SelectItem>
    </SelectSection>
  </Select>
);

const WithCustomSectionsStylesTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<User>) => {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Select
      color={color}
      variant={variant}
      className="max-w-xs"
      label="Favorite Animal"
      scrollShadowProps={{
        isEnabled: false,
      }}
      {...args}
    >
      <SelectSection
        title="Mammals"
        classNames={{
          heading: headingClasses,
        }}
      >
        <SelectItem key="Lion">Lion</SelectItem>
        <SelectItem key="Tiger">Tiger</SelectItem>
        <SelectItem key="Elephant">Elephant</SelectItem>
        <SelectItem key="Kangaroo">Kangaroo</SelectItem>
        <SelectItem key="Panda">Panda</SelectItem>
        <SelectItem key="Giraffe">Giraffe</SelectItem>
        <SelectItem key="Zebra">Zebra</SelectItem>
        <SelectItem key="Cheetah">Cheetah</SelectItem>
      </SelectSection>
      <SelectSection
        title="Birds"
        classNames={{
          heading: headingClasses,
        }}
      >
        <SelectItem key="Eagle">Eagle</SelectItem>
        <SelectItem key="Parrot">Parrot</SelectItem>
        <SelectItem key="Penguin">Penguin</SelectItem>
        <SelectItem key="Ostrich">Ostrich</SelectItem>
        <SelectItem key="Peacock">Peacock</SelectItem>
        <SelectItem key="Swan">Swan</SelectItem>
        <SelectItem key="Falcon">Falcon</SelectItem>
        <SelectItem key="Flamingo">Flamingo</SelectItem>
      </SelectSection>
    </Select>
  );
};

const WithAriaLabelTemplate = ({ color, variant, ...args }: SelectProps) => (
  <Select
    color={color}
    variant={variant}
    className="max-w-xs"
    label="Favorite Animal"
    {...args}
  >
    {items}
  </Select>
);

const CustomStylesTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<User>) => {
  return (
    <Select
      color={color}
      items={usersData}
      variant={variant}
      label="Assigned to"
      className="max-w-xs"
      classNames={{
        trigger: "min-h-16",
        listboxWrapper: "max-h-[400px]",
        label: "group-data-[filled=true]:-translate-y-5",
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        },
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      {...args}
    >
      {(item) => (
        <SelectItem key={item.id} textValue={item.name}>
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              alt={item.name}
              src={item.avatar}
              className="shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-default-400 text-tiny">{item.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

const AsyncLoadingTemplate = ({
  color,
  variant,
  ...args
}: SelectProps<Pokemon>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, hasMore, isLoading, onLoadMore } = usePokemonList({
    fetchDelay: 1500,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore,
    distance: 20,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
  });

  return (
    <Select
      color={color}
      items={items}
      variant={variant}
      className="max-w-xs"
      isLoading={isLoading}
      label="Pick a Pokemon"
      selectionMode="single"
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      placeholder="Select a Pokemon"
      {...args}
    >
      {(item) => (
        <SelectItem key={item.name} className="capitalize">
          {item.name}
        </SelectItem>
      )}
    </Select>
  );
};

const WithReactHookFormTemplate = (args: SelectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      requiredField: "",
      withDefaultValue: "cat",
      withoutDefaultValue: "",
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xs flex-col gap-2"
    >
      <Select
        data-testid="select-1"
        {...args}
        {...register("withDefaultValue")}
      >
        {items}
      </Select>

      <Select
        data-testid="select-2"
        {...args}
        {...register("withoutDefaultValue")}
      >
        {items}
      </Select>

      <Select
        data-testid="select-3"
        {...args}
        {...register("requiredField", { required: true })}
      >
        {items}
      </Select>

      {errors.requiredField && (
        <span className="text-danger">This field is required</span>
      )}
      <button type="submit" className={button({ class: "w-fit" })}>
        Submit
      </button>
    </form>
  );
};

const ScrollableContainerTemplate = (args: SelectProps) => {
  const categories = [
    {
      target: "Animals",
      items: [
        { emoji: "🦁", name: "Lion" },
        { emoji: "🐅", name: "Tiger" },
        { emoji: "🐘", name: "Elephant" },
        { emoji: "🦘", name: "Kangaroo" },
        { emoji: "🐼", name: "Panda" },
        { emoji: "🦒", name: "Giraffe" },
        { emoji: "🦓", name: "Zebra" },
        { emoji: "🐆", name: "Cheetah" },
      ],
    },
    {
      target: "Birds",
      items: [
        { emoji: "🦅", name: "Eagle" },
        { emoji: "🦜", name: "Parrot" },
        { emoji: "🐧", name: "Penguin" },
        { emoji: "🦢", name: "Ostrich" },
        { emoji: "🦚", name: "Peacock" },
        { emoji: "🦢", name: "Swan" },
        { emoji: "🦅", name: "Falcon" },
        { emoji: "🦩", name: "Flamingo" },
      ],
    },
  ];
  const DEFAULT_CATEGORY = "Animals";

  return (
    <>
      <form className="h-full overflow-auto">
        <div className="flex h-[1500px] justify-between">
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
              <Select
                name="Category"
                className="w-52"
                label="Category"
                aria-label="Favourite Animals"
                defaultSelectedKeys={[DEFAULT_CATEGORY]}
                {...args}
              >
                {categories.map((category, idx, arr) => (
                  <SelectSection
                    key={category.target}
                    title={category.target}
                    showDivider={idx !== arr.length - 1}
                  >
                    {category.items.map((item) => (
                      <SelectItem
                        key={item.name}
                      >{`${item.emoji} ${item.name}`}</SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export const Default = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
  },
};

export const Multiple = {
  render: Template,

  args: {
    ...defaultProps,
    selectionMode: "multiple",
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
    selectedKey: "cat",
  },
};

export const DisabledOptions = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["zebra", "tiger", "lion", "elephant", "crocodile", "whale"],
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultSelectedKeys: ["dog"],
    errorMessage: "Please select a valid animal",
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const AsyncLoading = {
  render: AsyncLoadingTemplate,

  args: {
    ...defaultProps,
  },
};

export const StartContent = {
  render: StartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
  },
};

export const WithoutLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: null,
    placeholder: "Select an animal",
    "aria-label": "Select an animal",
  },
};

export const WithoutScrollShadow = {
  render: Template,

  args: {
    ...defaultProps,
    scrollShadowProps: {
      isEnabled: false,
    },
  },
};

export const WithItemDescriptions = {
  args: {
    ...defaultProps,
  },

  render: DynamicTemplateWithDescriptions,
};

export const WithItemStartContent = {
  render: ItemStartContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithErrorMessage = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: "Please select an animal",
  },
};

export const WithErrorMessageFunction = {
  render: DynamicTemplate,

  args: {
    ...defaultProps,
    isInvalid: true,
    errorMessage: (value: ValidationResult) => {
      if (value.isInvalid) {
        return "Please select an animal";
      }
    },
  },
};

export const WithChips = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
    isMultiline: true,
    variant: "bordered",
    selectionMode: "multiple",
    labelPlacement: "outside",
    classNames: {
      base: "max-w-xs",
      trigger: "min-h-12 py-2",
    },
    renderValue: (items: SelectedItems<User>) => {
      return (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Chip key={item.key}>{item.data?.name}</Chip>
          ))}
        </div>
      );
    },
  },
};

export const WithSections = {
  render: WithSectionsTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithCustomSectionsStyles = {
  args: {
    ...defaultProps,
  },

  render: WithCustomSectionsStylesTemplate,
};

export const WithAriaLabel = {
  render: WithAriaLabelTemplate,

  args: {
    ...defaultProps,
    label: "Select an animal 🐹",
    "aria-label": "Select an animal",
  },
};

export const WithReactHookForm = {
  args: {
    ...defaultProps,
  },

  render: WithReactHookFormTemplate,
};

export const WithScrollableContainer = {
  args: {
    ...defaultProps,
  },

  render: ScrollableContainerTemplate,
};

export const Controlled = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const ControlledMultiple = {
  args: {
    ...defaultProps,
  },

  render: ControlledMultipleTemplate,
};

export const ControlledOpen = {
  render: ControlledOpenTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomSelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    selectorIcon: <SelectorIcon />,
    disableSelectorIconRotation: true,
  },
};

export const CustomItems = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomRenderValue = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
    labelPlacement: "outside",
    classNames: {
      trigger: "h-12",
    },
    renderValue: (items: SelectedItems<User>) => {
      return items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Avatar
            size="sm"
            className="shrink-0"
            alt={item.data?.name}
            src={item.data?.avatar}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
            <span className="text-default-500 text-tiny">
              ({item.data?.email})
            </span>
          </div>
        </div>
      ));
    },
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
    renderValue: (items: SelectedItems<User>) => {
      return items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <Avatar
            size="sm"
            className="shrink-0"
            alt={item.data?.name}
            src={item.data?.avatar}
          />
          <div className="flex flex-col">
            <span>{item.data?.name}</span>
            <span className="text-default-500 text-tiny">
              ({item.data?.email})
            </span>
          </div>
        </div>
      ));
    },
  },
};
