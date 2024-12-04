import type { Preview } from "@storybook/react";

import { NextUIProvider } from "../providers/NextUIProvider";
import "../app/globals.css";

const preview: Preview = {
  decorators: [
    (story, context) => <NextUIProvider>{story(context)}</NextUIProvider>,
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
