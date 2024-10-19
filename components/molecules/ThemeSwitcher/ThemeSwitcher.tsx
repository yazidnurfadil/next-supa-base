import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@nextui-org/button";
import { MoonFilledIcon, SunFilledIcon } from "@nextui-org/shared-icons";
import { Spinner } from "@nextui-org/spinner";

import { Theme } from "@/types/utils";

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Spinner />;

  return (
    <>
      {resolvedTheme === Theme.Dark ? (
        <Button
          radius="full"
          title={resolvedTheme}
          aria-label="Toggle Light Mode"
          color="secondary"
          isIconOnly
          onClick={() => setTheme(Theme.Light)}
          size="sm"
        >
          <SunFilledIcon />
        </Button>
      ) : (
        <Button
          radius="full"
          title={resolvedTheme}
          aria-label="Toggle Dark Mode"
          color="secondary"
          isIconOnly
          size="sm"
          onClick={() => setTheme(Theme.Dark)}
        >
          <MoonFilledIcon />
        </Button>
      )}
    </>
  );
};
