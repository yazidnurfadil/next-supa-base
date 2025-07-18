import { ReactNode, HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLHeadingElement> {
  text: ReactNode;
}

export const Title = ({ text, className = "" }: TextProps) => (
  <h1 className={"text-2xl " + className}>{text}</h1>
);

export const Subtitle = ({ text, className = "" }: TextProps) => (
  <h2 className={"text-xl " + className}>{text}</h2>
);

export const SectionTitle = ({ text, className = "" }: TextProps) => (
  <h3 className={"text-lg " + className}>{text}</h3>
);

export const SubsectionTitle = ({ text, className = "" }: TextProps) => (
  <h4 className={"text-base/7 " + className}>{text}</h4>
);

export const Paragraph = ({ text, className = "" }: TextProps) => (
  <p className={"text-base/6 " + className}>{text}</p>
);
