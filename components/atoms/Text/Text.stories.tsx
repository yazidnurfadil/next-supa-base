import { Meta } from "@storybook/react";

import { Paragraph, Subtitle, Title } from "./Text";

export default {
  title: "Atoms/Text",
} as Meta;

const defaultProps = {};

const ListOfText = () => {
  return (
    <div>
      <Title text="Title" />
      <Subtitle text="Subtitle" />
      <Paragraph text="So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist." />
    </div>
  );
};

export const Default = {
  render: ListOfText,
  args: {
    ...defaultProps,
  },
};
