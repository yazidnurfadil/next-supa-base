// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: (params?: any) => void, delay: number = 1000) => {
  setTimeout(() => {
    func();
  }, delay);
};

export const sleep = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default debounce;
