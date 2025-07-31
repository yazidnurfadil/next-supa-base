import { heroui, commonColors } from "@heroui/react";

export default heroui({
  themes: {
    dark: {
      colors: {
        background: commonColors.zinc[900],
      },
    },
    light: {
      colors: {
        background: commonColors.zinc[100],
      },
    },
  },
});
