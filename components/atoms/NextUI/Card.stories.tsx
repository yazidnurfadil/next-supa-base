import { Code } from "@nextui-org/code";
import { Link } from "@nextui-org/link";
import { card } from "@nextui-org/theme";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardProps,
  CardFooter,
  CardHeader,
} from "@nextui-org/card";

import { Meta } from "@storybook/react";

export default {
  component: Card,
  title: "Atoms/Card",
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isHoverable: {
      control: {
        type: "boolean",
      },
    },
    isPressable: {
      control: {
        type: "boolean",
      },
    },
    disableRipple: {
      control: {
        type: "boolean",
      },
    },
    isFooterBlurred: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    shadow: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
    radius: {
      options: ["none", "sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  },
} as Meta<typeof Card>;

const defaultProps = {
  ...card.defaultVariants,
  disableRipple: false,
};

const Template = (args: CardProps) => (
  <Card {...args} className="max-w-md">
    <CardBody>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
    </CardBody>
  </Card>
);

const WithDividerTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-md">
    <CardHeader className="border-b border-divider">
      <strong>Description</strong>
    </CardHeader>
    <CardBody className="py-8">
      <p>
        The Object constructor creates an object wrapper for the given value.
      </p>
    </CardBody>
    <CardFooter className="border-t border-divider">
      <p>
        When called in a non-constructor context, Object behaves identically to{" "}
        <Code color="primary">new Object()</Code>.
      </p>
    </CardFooter>
  </Card>
);

const WithFooterTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-md p-4">
    <CardHeader className="flex gap-3">
      <Image
        width={34}
        height={34}
        radius="lg"
        alt="nextui logo"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
      />
      <div className="flex flex-col">
        <b className="text-lg">NextUI</b>
        <p className="text-default-500">nextui.org</p>
      </div>
    </CardHeader>
    <CardBody className="py-2">
      <p>Make beautiful websites regardless of your design experience.</p>
    </CardBody>
    <CardFooter>
      <Link
        isExternal
        showAnchorIcon
        href="https://github.com/nextui-org/nextui"
      >
        Visit source code on GitHub.
      </Link>
    </CardFooter>
  </Card>
);

const WithAbsImageHeaderTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-[330px]">
    <CardHeader className="absolute top-2 z-20">
      <div className="flex flex-col">
        <p className="text-xs font-bold uppercase text-white/60">
          What to watch
        </p>
        <p className="text-2xl text-white">Stream the Apple event</p>
      </div>
    </CardHeader>
    <Image
      width={330}
      height={440}
      alt="Card background"
      src={"/images/assets/apple-event.jpeg"}
      className="h-[440px] w-full object-cover"
    />
  </Card>
);

const WithAbsImgHeaderFooterTemplate = (args: CardProps) => (
  <Card className="w-[330px] bg-zinc-100 dark:bg-zinc-100" {...args}>
    <CardHeader className="absolute top-2 z-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase text-black/40">New</p>
        <h4 className="text-3xl font-medium text-black">HomePod mini</h4>
        <p className="pr-1.5 text-sm text-black/80">
          Room-filling sound, Intelligent assistant. Smart home control. Works
          seamlessly with iPhone. Check it out
        </p>
      </div>
    </CardHeader>
    <Image
      width={300}
      height={440}
      alt="Card background"
      src={"/images/assets/homepod.jpeg"}
      className="h-[440px] w-full object-contain pt-10"
    />
    <CardFooter className="absolute bottom-0 z-10 justify-between">
      <div>
        <p className="text-xs text-black/80">Available soon.</p>
        <p className="text-xs text-black/80">Get notified.</p>
      </div>
      <Button size="sm" radius="full" color="primary" className="text-tiny">
        Notify Me
      </Button>
    </CardFooter>
  </Card>
);

const CoverImgTemplate = (args: CardProps) => (
  <div className="grid max-w-[900px] grid-cols-12 grid-rows-2 gap-2 px-8">
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute top-1 z-10 flex-col !items-start">
        <p className="text-xs font-bold uppercase text-white/60">
          What to watch
        </p>
        <h4 className="text-lg font-medium text-white">
          Stream the Acme event
        </h4>
      </CardHeader>
      <Image
        alt="Card background"
        className="size-full object-cover"
        src="https://nextui.org/images/card-example-4.jpeg"
      />
    </Card>
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute top-1 z-10 flex-col !items-start">
        <p className="text-xs font-bold uppercase text-white/60">
          Plant a tree
        </p>
        <h4 className="text-lg font-medium text-white">
          Contribute to the planet
        </h4>
      </CardHeader>
      <Image
        alt="Card background"
        className="size-full object-cover"
        src="https://nextui.org/images/card-example-3.jpeg"
      />
    </Card>
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute top-1 z-10 flex-col !items-start">
        <p className="text-xs font-bold uppercase text-white/60">
          Supercharged
        </p>
        <h4 className="text-lg font-medium text-white">
          Creates beauty like a beast
        </h4>
      </CardHeader>
      <Image
        alt="Card background"
        className="size-full object-cover"
        src="https://nextui.org/images/card-example-2.jpeg"
      />
    </Card>
    <Card
      {...args}
      isFooterBlurred
      className="col-span-12 h-[400px] w-full sm:col-span-5"
    >
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="text-xs font-bold uppercase text-white/60">New</p>
        <h4 className="text-2xl font-medium text-black">Acme camera</h4>
      </CardHeader>
      <Image
        alt="Card example background"
        src="https://nextui.org/images/card-example-6.jpeg"
        className="size-full -translate-y-10 scale-125 object-cover"
      />
      <CardFooter className="absolute bottom-0 z-10 justify-between border-t border-slate-300 bg-white/30">
        <div>
          <p className="text-xs text-black">Available soon.</p>
          <p className="text-xs text-black">Get notified.</p>
        </div>
        <Button size="sm" radius="full" variant="flat" color="secondary">
          Notify Me
        </Button>
      </CardFooter>
    </Card>
    <Card
      {...args}
      isFooterBlurred
      className="col-span-12 h-[400px] w-full sm:col-span-7"
    >
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="text-xs font-bold uppercase text-white/60">
          Your day your way
        </p>
        <h4 className="text-2xl font-medium text-white/90">
          Your checklist for better sleep
        </h4>
      </CardHeader>
      <Image
        alt="Relaxing app background"
        className="size-full object-cover"
        src="https://nextui.org/images/card-example-5.jpeg"
      />
      <CardFooter className="absolute bottom-0 z-10 border-t border-default-600 bg-black/40 dark:border-default-100">
        <div className="flex grow items-center gap-2">
          <Image
            alt="Breathing app icon"
            className="h-11 w-10 rounded-full bg-black"
            src={"/images/assets/breathing-app-icon.jpeg"}
          />
          <div className="flex flex-col">
            <p className="text-xs text-white/60">Breathing App</p>
            <p className="text-xs text-white/60">
              Get a good night&apos;s sleep.
            </p>
          </div>
        </div>
        <Button radius="full">Get App</Button>
      </CardFooter>
    </Card>
  </div>
);

const CenterImgTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-fit px-0 py-4">
    <CardHeader className="flex-col !items-start px-4 pb-0 pt-2">
      <p className="text-xs font-bold uppercase">Daily Mix</p>
      <small className="text-default-500">12 Tracks</small>
      <h4 className="text-lg font-bold">Frontend Radio</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image
        isBlurred
        width={300}
        alt="Card background"
        src={"/images/assets/local-image-1.jpeg"}
      />
    </CardBody>
  </Card>
);

const PrimaryActionTemplate = (args: CardProps) => {
  const list = [
    {
      price: "$5.50",
      title: "Orange",
      img: "/images/fruit-1.jpeg",
    },
    {
      price: "$3.00",
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
    },
    {
      price: "$10.00",
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
    },
    {
      title: "Lemon",
      price: "$5.30",
      img: "/images/fruit-4.jpeg",
    },
    {
      price: "$15.70",
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
    },
    {
      price: "$8.00",
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
    },
    {
      price: "$7.50",
      title: "Banana",
      img: "/images/fruit-7.jpeg",
    },
    {
      price: "$12.20",
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
    },
  ];

  type ListItem = (typeof list)[number];

  const handlePress = (item: ListItem) => {
    console.log("item pressed", item);
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          {...args}
          key={index}
          isPressable
          onPress={() => handlePress(item)}
        >
          <CardBody className="p-0">
            <Image
              alt={item.title}
              src={"https://nextui.org" + item.img}
              className="h-[140px] w-full object-cover"
            />
          </CardBody>
          <CardFooter className="justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const CenterImgWithHeaderTemplate = (args: CardProps) => {
  const list = [
    {
      title: "Mac",
      img: "/images/assets/mac.png",
    },
    {
      title: "iPhone",
      img: "/images/assets/iphone.png",
    },
    {
      title: "iPad",
      img: "/images/assets/ipad.png",
    },
    {
      title: "Apple Watch",
      img: "/images/assets/apple-watch.png",
    },
    {
      title: "AirPods",
      img: "/images/assets/airpods.png",
    },
    {
      title: "AirTag",
      img: "/images/assets/airtag.png",
    },
    {
      title: "Apple TV",
      img: "/images/assets/appletv.png",
    },
    {
      title: "HomePod mini",
      img: "/images/assets/homepod-mini.png",
    },
    {
      title: "Accessories",
      img: "/images/assets/accessories.png",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {list.map((item, index) => (
        <div key={index}>
          <Card {...args} isPressable className="size-[200px]">
            <CardHeader className="p-0">
              <h5 className="pl-6 pt-3">{item.title}</h5>
            </CardHeader>
            <CardBody className="h-full justify-center">
              <Image src={item.img} alt={item.title} className="w-[180px]" />
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const WithDivider = {
  render: WithDividerTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithFooter = {
  render: WithFooterTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAbsImageHeader = {
  args: {
    ...defaultProps,
  },

  render: WithAbsImageHeaderTemplate,
};

export const WithAbsImgHeaderFooter = {
  args: {
    ...defaultProps,
  },

  render: WithAbsImgHeaderFooterTemplate,
};

export const CoverImg = {
  render: CoverImgTemplate,

  args: {
    ...defaultProps,
  },
};

export const CenterImg = {
  render: CenterImgTemplate,

  args: {
    ...defaultProps,
  },
};

export const PrimaryAction = {
  render: PrimaryActionTemplate,

  args: {
    ...defaultProps,
  },
};

export const CenterImgWithHeader = {
  args: {
    ...defaultProps,
  },

  render: CenterImgWithHeaderTemplate,
};
