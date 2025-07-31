import type { Preview } from "@storybook/react";

import { HeroUIProvider } from "../src/providers/HeroUIProvider";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (story, context) => <HeroUIProvider>{story(context)}</HeroUIProvider>,
  ],
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
        string: /(background|color)$/i,
      },
    },
  },
};

export default preview;
