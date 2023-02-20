import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps,
  // pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
