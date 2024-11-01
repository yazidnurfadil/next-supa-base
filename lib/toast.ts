import { toast, type ToasterProps } from "sonner";

interface ShowToastProps {
  message: string;
  type?: "default" | "success" | "error" | "warning" | "info" | "promise";
  promiseFunction?: () => Promise<string>;
  promiseOnLoadingMessage?: string;
  promiseOnSuccessMessage?: string;
  promiseOnErrorMessage?: string;
  duration?: number;
  visibleToasts?: number;
}

const showToast = ({
  message,
  type = "default",
  promiseFunction = () =>
    new Promise((resolve) => setTimeout(() => resolve("Promise Toast"), 2000)),
  promiseOnLoadingMessage,
  promiseOnSuccessMessage,
  promiseOnErrorMessage,
  duration = 2000,
  visibleToasts = 5,
}: ShowToastProps) => {
  const dataProps: ToasterProps = {
    duration,
    visibleToasts,
    richColors: true,
    position: "bottom-right",
    pauseWhenPageIsHidden: true,
    closeButton: true,
  };

  switch (type) {
    case "default":
      return toast(message, dataProps);

    case "success":
      return toast.success(message, dataProps);

    case "error":
      return toast.error(message, dataProps);

    case "warning":
      return toast.warning(message, dataProps);

    case "info":
      return toast.info(message, dataProps);

    case "promise":
      return toast.promise(promiseFunction, {
        loading: promiseOnLoadingMessage,
        success: promiseOnSuccessMessage,
        error: promiseOnErrorMessage,
      });

    default:
      return toast(message, dataProps);
  }
};

export default showToast;
