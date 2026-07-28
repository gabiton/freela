import "../styles/main.scss";
import { LenisScroll } from "components/Helpers/LenisScroll";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LenisScroll />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
