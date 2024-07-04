import { SessionProvider } from "next-auth/react";
import NavBar from "ui/components/NavBar";
import "../styles/globals.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
