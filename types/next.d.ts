interface NextErrorPage extends Error {
  digest: number;
}
type NextErrorPageProps = {
  error: NextErrorPage;
  reset: () => void;
};
