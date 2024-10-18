import React from "react";
import { useForm } from "react-hook-form";
import { useFilter } from "@react-aria/i18n";
import { useAsyncList } from "@react-stately/data";
import type { Key, ValidationResult } from "@react-types/shared";
import { Meta } from "@storybook/react";

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  AutocompleteSection,
  MenuTriggerAction,
} from "@nextui-org/autocomplete";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  PetBoldIcon,
  SearchLinearIcon,
  SelectorIcon,
} from "@nextui-org/shared-icons";
import {
  Animal,
  animalsData,
  Pokemon,
  usePokemonList,
  User,
  usersData,
} from "@nextui-org/stories-utils";
import { autocomplete, button, input } from "@nextui-org/theme";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

export default {
  title: "Atoms/Autocomplete",
  component: Autocomplete,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
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
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isReadonly: {
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
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-start justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Autocomplete>;

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

const defaultProps = {
  ...input.defaultVariants,
  ...autocomplete.defaultVariants,
  className: "max-w-xs",
};

const items = animalsData.map((item) => (
  <AutocompleteItem key={item.value} value={item.value}>
    {item.label}
  </AutocompleteItem>
));

const Template = (args: AutocompleteProps) => (
  <Autocomplete label="Favorite Animal" {...args}>
    <AutocompleteItem key="red_panda">Red Panda</AutocompleteItem>
    <AutocompleteItem key="cat">Cat</AutocompleteItem>
    <AutocompleteItem key="dog">Dog</AutocompleteItem>
    <AutocompleteItem key="crocodile">Crocodile</AutocompleteItem>
    <AutocompleteItem key="elephant">Elephant</AutocompleteItem>
    <AutocompleteItem key="lion">Lion</AutocompleteItem>
    <AutocompleteItem key="tiger">Tiger</AutocompleteItem>
    <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
    <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
    <AutocompleteItem key="koala">Koala</AutocompleteItem>
    <AutocompleteItem key="panda">Panda</AutocompleteItem>
    <AutocompleteItem key="giraffe">Giraffe</AutocompleteItem>
    <AutocompleteItem key="otter">Otter</AutocompleteItem>
    <AutocompleteItem key="snake">Snake</AutocompleteItem>
    <AutocompleteItem key="dolphin">Dolphin</AutocompleteItem>
    <AutocompleteItem key="penguin">Penguin</AutocompleteItem>
    <AutocompleteItem key="whale">Whale</AutocompleteItem>
    <AutocompleteItem key="zebra">Zebra</AutocompleteItem>
    <AutocompleteItem key="shark">Shark</AutocompleteItem>
  </Autocomplete>
);

const DynamicTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<Animal>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultItems={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => (
      <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
    )}
  </Autocomplete>
);

const FormTemplate = ({ color, variant, ...args }: AutocompleteProps) => {
  return (
    <form
      className="flex w-full max-w-xs flex-col items-start gap-4"
      onSubmit={(e) => {
        alert(
          `Submitted value: ${
            (e.target as HTMLFormElement)["favorite-animal"].value
          }`
        );
        e.preventDefault();
      }}
    >
      <Autocomplete
        color={color}
        label="Favorite Animal"
        name="favorite-animal"
        variant={variant}
        {...args}
      >
        {items}
      </Autocomplete>
      <button className={button({ className: "max-w-fit" })} type="submit">
        Submit
      </button>
    </form>
  );
};
interface FieldState {
  selectedKey?: Key | string | null;
  inputValue: string;
  items: Animal[]; // Assuming animalsData is an array of objects
}
const FullyControlledTemplate = () => {
  // Store Autocomplete input value, selected option, open state, and items
  // in a state tracker
  const [fieldState, setFieldState] = React.useState<FieldState>({
    selectedKey: "",
    inputValue: "",
    items: animalsData,
  });

  // Implement custom filtering logic and control what items are
  // available to the Autocomplete.
  const { startsWith } = useFilter({ sensitivity: "base" });

  // Specify how each of the Autocomplete values should change when an
  // option is selected from the list box
  const onSelectionChange = (key?: Key | string | null) => {
    // eslint-disable-next-line no-console
    console.log(`onSelectionChange ${key}`);
    setFieldState((prevState: FieldState) => {
      const selectedItem = prevState.items.find(
        (option) => option.value === key
      );

      return {
        inputValue: selectedItem?.label || "",
        selectedKey: key,
        items: animalsData.filter((item) =>
          startsWith(item.label, selectedItem?.label || "")
        ),
      };
    });
  };

  // Specify how each of the Autocomplete values should change when the input
  // field is altered by the user
  const onInputChange = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(`onInputChange ${value}`);
    setFieldState((prevState: FieldState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: animalsData.filter((item) => startsWith(item.label, value)),
    }));
  };

  // Show entire list if user opens the menu manually
  const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
    if (menuTrigger === "manual" && isOpen) {
      setFieldState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: animalsData,
      }));
    }
  };

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={fieldState.inputValue}
      items={fieldState.items}
      label="Favorite Animal"
      placeholder="Search an animal"
      selectedKey={fieldState.selectedKey}
      variant="bordered"
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const MirrorTemplate = ({ color, variant, ...args }: AutocompleteProps) => (
  <div className="flex w-full max-w-xl flex-row gap-4">
    <Autocomplete
      className="max-w-xs"
      color={color}
      label="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Autocomplete>
    <Autocomplete
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      placeholder="Select an animal"
      variant={variant}
      {...args}
    >
      {items}
    </Autocomplete>
  </div>
);

const LabelPlacementTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps) => (
  <div className="flex w-full flex-col items-center gap-12">
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <h3>Without placeholder</h3>
      <div className="flex w-full flex-row items-end gap-4">
        <Autocomplete
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Autocomplete>
      </div>
    </div>
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <h3>With placeholder</h3>
      <div className="flex w-full flex-row items-end gap-4">
        <Autocomplete
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside"
        >
          {items}
        </Autocomplete>
        <Autocomplete
          color={color}
          label="Favorite Animal"
          placeholder="Select an animal"
          variant={variant}
          {...args}
          labelPlacement="outside-left"
        >
          {items}
        </Autocomplete>
      </div>
    </div>
  </div>
);

const AsyncFilteringTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<SWCharacter>) => {
  const list = useAsyncList<SWCharacter>({
    async load({ signal, filterText }) {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete
      className="max-w-xs"
      color={color}
      inputValue={list.filterText}
      isLoading={list.isLoading}
      items={list.items}
      label="Select a character"
      placeholder="Type to search..."
      variant={variant}
      onInputChange={list.setFilterText}
      {...args}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const AsyncLoadingTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<Pokemon>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { items, hasMore, isLoading, onLoadMore } = usePokemonList({
    fetchDelay: 1500,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    distance: 20,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  return (
    <Autocomplete
      className="max-w-xs"
      color={color}
      defaultItems={items}
      isLoading={isLoading}
      label="Pick a Pokemon"
      placeholder="Select a Pokemon"
      scrollRef={scrollerRef}
      variant={variant}
      onOpenChange={setIsOpen}
      {...args}
    >
      {(item) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const StartContentTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultSelectedKey={"cat"}
    label="Favorite Animal"
    startContent={<PetBoldIcon className="text-xl" />}
    variant={variant}
    {...args}
  >
    {items}
  </Autocomplete>
);

const EndContentTemplate = ({ color, variant, ...args }: AutocompleteProps) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultSelectedKey={"cat"}
    endContent={<PetBoldIcon className="text-xl" />}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {items}
  </Autocomplete>
);

const DynamicTemplateWithDescriptions = ({
  color,
  variant,
  ...args
}: AutocompleteProps<Animal>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    defaultItems={animalsData}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {(item) => (
      <AutocompleteItem key={item.value} description={item.description}>
        {item.label}
      </AutocompleteItem>
    )}
  </Autocomplete>
);

const ItemStartContentTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<Animal>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    label="Select country"
    variant={variant}
    {...args}
  >
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
    <AutocompleteItem
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
    </AutocompleteItem>
  </Autocomplete>
);

const ControlledTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<Animal>) => {
  const [value, setValue] = React.useState<Key | null>("cat");

  const handleSelectionChange = (key: Key | null) => {
    setValue(key);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Autocomplete
        fullWidth
        color={color}
        defaultItems={animalsData}
        label="Favorite Animal"
        selectedKey={value}
        variant={variant}
        onSelectionChange={handleSelectionChange}
        {...args}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <p className="text-default-500">Selected: {value}</p>
    </div>
  );
};

const CustomItemsTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<User>) => (
  <Autocomplete
    className="mt-8 max-w-xs"
    color={color}
    defaultItems={usersData}
    label="Assigned to"
    placeholder="Select a user"
    variant={variant}
    {...args}
    labelPlacement="outside"
  >
    {(item) => (
      <AutocompleteItem key={item.id} textValue={item.name}>
        <div className="flex items-center gap-2">
          <Avatar
            alt={item.name}
            className="shrink-0"
            size="sm"
            src={item.avatar}
          />
          <div className="flex flex-col">
            <span className="text-small">{item.name}</span>
            <span className="text-tiny text-default-400">{item.email}</span>
          </div>
        </div>
      </AutocompleteItem>
    )}
  </Autocomplete>
);

const WithSectionsTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<User>) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    <AutocompleteSection showDivider title="Mammals">
      <AutocompleteItem key="Lion">Lion</AutocompleteItem>
      <AutocompleteItem key="Tiger">Tiger</AutocompleteItem>
      <AutocompleteItem key="Elephant">Elephant</AutocompleteItem>
      <AutocompleteItem key="Kangaroo">Kangaroo</AutocompleteItem>
      <AutocompleteItem key="Panda">Panda</AutocompleteItem>
      <AutocompleteItem key="Giraffe">Giraffe</AutocompleteItem>
      <AutocompleteItem key="Zebra">Zebra</AutocompleteItem>
      <AutocompleteItem key="Cheetah">Cheetah</AutocompleteItem>
    </AutocompleteSection>
    <AutocompleteSection title="Birds">
      <AutocompleteItem key="Eagle">Eagle</AutocompleteItem>
      <AutocompleteItem key="Parrot">Parrot</AutocompleteItem>
      <AutocompleteItem key="Penguin">Penguin</AutocompleteItem>
      <AutocompleteItem key="Ostrich">Ostrich</AutocompleteItem>
      <AutocompleteItem key="Peacock">Peacock</AutocompleteItem>
      <AutocompleteItem key="Swan">Swan</AutocompleteItem>
      <AutocompleteItem key="Falcon">Falcon</AutocompleteItem>
      <AutocompleteItem key="Flamingo">Flamingo</AutocompleteItem>
    </AutocompleteSection>
  </Autocomplete>
);

const WithCustomSectionsStylesTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<User>) => {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

  return (
    <Autocomplete
      className="max-w-xs"
      color={color}
      label="Favorite Animal"
      scrollShadowProps={{
        isEnabled: false,
      }}
      variant={variant}
      {...args}
    >
      <AutocompleteSection
        classNames={{
          heading: headingClasses,
        }}
        title="Mammals"
      >
        <AutocompleteItem key="Lion">Lion</AutocompleteItem>
        <AutocompleteItem key="Tiger">Tiger</AutocompleteItem>
        <AutocompleteItem key="Elephant">Elephant</AutocompleteItem>
        <AutocompleteItem key="Kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="Panda">Panda</AutocompleteItem>
        <AutocompleteItem key="Giraffe">Giraffe</AutocompleteItem>
        <AutocompleteItem key="Zebra">Zebra</AutocompleteItem>
        <AutocompleteItem key="Cheetah">Cheetah</AutocompleteItem>
      </AutocompleteSection>
      <AutocompleteSection
        classNames={{
          heading: headingClasses,
        }}
        title="Birds"
      >
        <AutocompleteItem key="Eagle">Eagle</AutocompleteItem>
        <AutocompleteItem key="Parrot">Parrot</AutocompleteItem>
        <AutocompleteItem key="Penguin">Penguin</AutocompleteItem>
        <AutocompleteItem key="Ostrich">Ostrich</AutocompleteItem>
        <AutocompleteItem key="Peacock">Peacock</AutocompleteItem>
        <AutocompleteItem key="Swan">Swan</AutocompleteItem>
        <AutocompleteItem key="Falcon">Falcon</AutocompleteItem>
        <AutocompleteItem key="Flamingo">Flamingo</AutocompleteItem>
      </AutocompleteSection>
    </Autocomplete>
  );
};

const WithAriaLabelTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps) => (
  <Autocomplete
    className="max-w-xs"
    color={color}
    label="Favorite Animal"
    variant={variant}
    {...args}
  >
    {items}
  </Autocomplete>
);

const CustomStylesTemplate = ({
  color,
  variant,
  ...args
}: AutocompleteProps<User>) => {
  return (
    <Autocomplete
      className="max-w-xs"
      classNames={{
        base: "min-h-16",
        listboxWrapper: "max-h-[400px]",
      }}
      color={color}
      defaultItems={usersData}
      label="Assigned to"
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
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        },
      }}
      variant={variant}
      {...args}
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className="flex items-center gap-2">
            <Avatar
              alt={item.name}
              className="shrink-0"
              size="sm"
              src={item.avatar}
            />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const CustomStylesWithCustomItemsTemplate = ({
  color,
  ...args
}: AutocompleteProps<User>) => {
  return (
    <Autocomplete
      aria-label="Select an employee"
      className="max-w-xs"
      classNames={{
        listboxWrapper: "max-h-[400px]",
      }}
      color={color}
      defaultItems={usersData}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[48px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      placeholder="Enter employee name"
      popoverProps={{
        offset: 10,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      startContent={
        <SearchLinearIcon
          className="text-xl text-default-400"
          strokeWidth="2.5"
        />
      }
      {...args}
      radius="full"
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                alt={item.name}
                className="shrink-0"
                size="sm"
                src={item.avatar}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-default-400">{item.team}</span>
              </div>
            </div>
            <Button
              className="border-small font-medium shadow-small"
              radius="full"
              size="sm"
              variant="bordered"
            >
              Add
            </Button>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

const WithReactHookFormTemplate = (args: AutocompleteProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      withDefaultValue: "cat",
      withoutDefaultValue: "",
      requiredField: "",
    },
  });

  const onSubmit = (data: Record<string, string>) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + JSON.stringify(data));
  };

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Autocomplete {...args} {...register("withDefaultValue")}>
        {items}
      </Autocomplete>
      <Autocomplete {...args} {...register("withoutDefaultValue")}>
        {items}
      </Autocomplete>
      <Autocomplete
        {...args}
        {...register("requiredField", { required: true })}
      >
        {items}
      </Autocomplete>

      {errors.requiredField && (
        <span className="text-danger">This field is required</span>
      )}
      <button className={button({ class: "w-fit" })} type="submit">
        Submit
      </button>
    </form>
  );
};

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
    placeholder: "Select an animal",
  },
};

export const Required = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const ReadOnly = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: "cat",
    isReadOnly: true,
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...defaultProps,
    selectedKey: "cat",
    variant: "faded",
    isDisabled: true,
  },
};

export const DisabledOptions = {
  render: Template,

  args: {
    ...defaultProps,
    disabledKeys: ["zebra", "tiger", "lion", "elephant", "crocodile", "whale"],
  },
};

export const LabelPlacement = {
  render: LabelPlacementTemplate,

  args: {
    ...defaultProps,
  },
};

export const AsyncFiltering = {
  render: AsyncFilteringTemplate,

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

export const EndContent = {
  render: EndContentTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsInvalid = {
  render: Template,

  args: {
    ...defaultProps,
    isInvalid: true,
    variant: "bordered",
    defaultSelectedKey: "dog",
    errorMessage: "Please select a valid animal",
  },
};

export const WithDescription = {
  render: MirrorTemplate,

  args: {
    ...defaultProps,
    description: "Select your favorite animal",
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
  render: DynamicTemplateWithDescriptions,

  args: {
    ...defaultProps,
  },
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
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
    errorMessage: (value: ValidationResult) => {
      if (value.validationDetails.valueMissing) {
        return "Value is required";
      }
    },
  },
};

export const WithValidation = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    label: "Select Cat or Dog",
    validate: (value: FieldState) => {
      if (
        value.selectedKey == null ||
        value.selectedKey === "cat" ||
        value.selectedKey === "dog"
      ) {
        return;
      }

      return "Please select a valid animal";
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
  render: WithCustomSectionsStylesTemplate,

  args: {
    ...defaultProps,
  },
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
  render: WithReactHookFormTemplate,

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

export const CustomSelectorIcon = {
  render: Template,

  args: {
    ...defaultProps,
    disableSelectorIconRotation: true,
    selectorIcon: <SelectorIcon />,
  },
};

export const CustomItems = {
  render: CustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomStyles = {
  render: CustomStylesTemplate,

  args: {
    ...defaultProps,
    variant: "bordered",
  },
};

export const CustomStylesWithCustomItems = {
  render: CustomStylesWithCustomItemsTemplate,

  args: {
    ...defaultProps,
  },
};

export const FullyControlled = {
  render: FullyControlledTemplate,
  args: {
    ...defaultProps,
  },
};
