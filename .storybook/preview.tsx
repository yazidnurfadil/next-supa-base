import type { Preview } from "@storybook/react";

import { HeroUIProvider } from "../providers/HeroUIProvider";
import "../app/globals.css";

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
