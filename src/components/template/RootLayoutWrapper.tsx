import localFont from "next/font/local";

import "@/styles/globals.css";
import Providers from "@/providers";

const geistSans = localFont({
  weight: "100 900",
  variable: "--font-geist-sans",
  src: "../../app/fonts/GeistVF.woff",
});
const geistMono = localFont({
  weight: "100 900",
  variable: "--font-geist-mono",
  src: "../../app/fonts/GeistMonoVF.woff",
});

type RootLayoutWrapperProps = {
  children: React.ReactNode;
};

export const RootLayoutWrapper = ({
  children,
}: Readonly<RootLayoutWrapperProps>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main className="flex min-h-screen flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
};
