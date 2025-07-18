interface NextErrorPage extends Error {
  digest: number;
}
type NextErrorPageProps = {
  reset: () => void;
  error: NextErrorPage;
};
