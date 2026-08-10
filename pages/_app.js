import "../styles/main.scss";
import { LenisScroll } from "components/Helpers/LenisScroll";
import { MousePointer } from "components/Parts/MousePointer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LenisScroll />
      <MousePointer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
