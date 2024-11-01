import localFont from "next/font/local";

import "@/app/globals.css";

import Providers from "@/providers";

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
