"use client";

import { useState, useEffect } from "react";

import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { SunFilledIcon, MoonFilledIcon } from "@heroui/shared-icons";

import { useTheme } from "next-themes";

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
          size="sm"
          isIconOnly
          radius="full"
          color="secondary"
          title={resolvedTheme}
          aria-label="Toggle Light Mode"
          onClick={() => setTheme(Theme.Light)}
        >
          <SunFilledIcon />
        </Button>
      ) : (
        <Button
          size="sm"
          isIconOnly
          radius="full"
          color="secondary"
          title={resolvedTheme}
          aria-label="Toggle Dark Mode"
          onClick={() => setTheme(Theme.Dark)}
        >
          <MoonFilledIcon />
        </Button>
      )}
    </>
  );
};
