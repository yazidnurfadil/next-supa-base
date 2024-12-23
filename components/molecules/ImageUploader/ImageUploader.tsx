"use client";

import React, { useId, useRef, useMemo, useState, useEffect } from "react";

import { Image, Button } from "@nextui-org/react";
type ImageUploaderProps = React.HTMLAttributes<HTMLDivElement> & {
  id?: string;
  name?: string;
  label?: string;
  color?: string;
  value?: string;
  className?: Partial<ImageUploaderClassObject>;
};

const textColor = {
  danger: "text-danger",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  secondary: "text-secondary",
};

const borderColor = {
  danger: "border-default-200 focus-within:border-danger",
  primary: "border-default-200 focus-within:border-primary",
  success: "border-default-200 focus-within:border-success",
  warning: "border-default-200 focus-within:border-warning",
  secondary: "border-default-200 focus-within:border-secondary",
};

type ImageUploaderClassObject = Record<
  | "helperWrapper"
  | "inputWrapper"
  | "innerWrapper"
  | "errorMessage"
  | "mainWrapper"
  | "clearButton"
  | "description"
  | "label"
  | "input"
  | "base",
  string
>;

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  name,
  label,
  value,
  color,
  className,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [wrapperClass, setWrapperClass] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const randomId = useId();
  const fixedId = useMemo(
    () => id || `image-upload-${randomId}`,
    [id, randomId]
  ); // Use useMemo to ensure the id is stable

  useEffect(() => {
    if (value) {
      setImage(value);
    }
  }, []);

  useEffect(() => {
    console.log("className", className);
    if (typeof className === "string") {
      setWrapperClass(className);
    }
  }, [className]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const colorBorder = color
    ? borderColor[color as keyof typeof borderColor]
    : "focus-within:border-black";

  const colorText = color
    ? textColor[color as keyof typeof textColor]
    : "text-foreground-500 group-hover:text-default-600";
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={[
        wrapperClass,
        colorBorder,
        "flex flex-col items-center justify-center rounded-lg border-2 p-2",
      ].join(" ")}
    >
      {image ? (
        <div className="relative w-full">
          <Image
            src={image}
            alt="Preview"
            className="max-h-64 w-full rounded-lg object-contain"
          />
          <Button
            size="sm"
            isIconOnly
            color="warning"
            variant="light"
            className="absolute bottom-1 left-1 z-10 backdrop-blur-sm"
            onPress={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            O
          </Button>
          <Button
            size="sm"
            isIconOnly
            color="danger"
            variant="light"
            onPress={handleRemoveImage}
            className="absolute bottom-1 right-1 z-10 backdrop-blur-sm"
          >
            X
          </Button>
          {/* </div> */}
        </div>
      ) : (
        <label
          htmlFor={fixedId}
          className={[
            colorText,
            "group relative flex size-full cursor-pointer flex-col items-center justify-center outline-none focus-within:outline-none",
          ].join(" ")}
        >
          <svg
            fill="none"
            aria-hidden="true"
            viewBox="0 0 48 48"
            stroke="currentColor"
            className="mx-auto size-12"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            />
          </svg>
          <span className="text-center text-xs font-medium">
            Upload {label}
          </span>
        </label>
      )}
      <input
        type="file"
        name={name}
        id={fixedId}
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="sr-only outline-none"
      />
    </div>
  );
};
