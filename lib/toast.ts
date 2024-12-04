import { toast, type ToasterProps } from "sonner";

interface ShowToastProps {
  message: string;
  duration?: number;
  visibleToasts?: number;
  promiseOnErrorMessage?: string;
  promiseOnLoadingMessage?: string;
  promiseOnSuccessMessage?: string;
  promiseFunction?: () => Promise<string>;
  type?: "default" | "success" | "warning" | "promise" | "error" | "info";
}

const showToast = ({
  message,
  duration = 2000,
  type = "default",
  visibleToasts = 5,
  promiseOnErrorMessage,
  promiseOnLoadingMessage,
  promiseOnSuccessMessage,
  promiseFunction = () =>
    new Promise((resolve) => setTimeout(() => resolve("Promise Toast"), 2000)),
}: ShowToastProps) => {
  const dataProps: ToasterProps = {
    duration,
    visibleToasts,
    richColors: true,
    closeButton: true,
    position: "bottom-right",
    pauseWhenPageIsHidden: true,
  };

  switch (type) {
    case "info":
      return toast.info(message, dataProps);

    case "error":
      return toast.error(message, dataProps);

    case "default":
      return toast(message, dataProps);

    case "success":
      return toast.success(message, dataProps);

    case "warning":
      return toast.warning(message, dataProps);

    case "promise":
      return toast.promise(promiseFunction, {
        error: promiseOnErrorMessage,
        loading: promiseOnLoadingMessage,
        success: promiseOnSuccessMessage,
      });

    default:
      return toast(message, dataProps);
  }
};

export default showToast;
