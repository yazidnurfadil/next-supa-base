"use client";

import { ErrorpageContainer } from "@/components/pages/public/ErrorpageContainer";

export default function GlobalError(props: NextErrorPageProps) {
  return (
    <html>
      <body>
        <ErrorpageContainer {...props} />
      </body>
    </html>
  );
}
