const debounce = (func: () => void, delay: number = 1000) => {
  setTimeout(() => {
    func();
  }, delay);
};

export const sleep = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default debounce;
