import { MouseEvent as ReactMouseEvent } from "react";

const smoothScroll = (
  event:
    | ReactMouseEvent<HTMLAnchorElement, MouseEvent>
    | ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  id: string
) => {
  event.preventDefault();
  document
    .querySelector(id)
    ?.scrollIntoView({ block: "start", behavior: "smooth" });
  setTimeout(() => {
    window.location.hash = id;
  }, 500);
};

export default smoothScroll;
