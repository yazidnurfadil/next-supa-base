import { useEffect } from "react";

import { Button } from "@nextui-org/button";

import styles from "@/styles/styles.module.css";

import { Paragraph, Title } from "@/components/atoms/Text";
import { FullScreenContainer } from "@/components/template/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <FullScreenContainer className={styles.background}>
      <div className="flex flex-col items-center justify-center text-center">
        <Title text="Oops!" className="mb-4 text-4xl font-bold text-primary" />
        <Paragraph
          text="Mohon maaf, terjadi kesalahan pada server kami."
          className="mb-8 text-secondary"
        />
        <Button onClick={() => reset()} color="primary">
          Coba lagi
        </Button>
      </div>
    </FullScreenContainer>
  );
}
