import "../core/styles/globals.css";
import "../core/styles/variables.css";
import type { AppProps } from "next/app";
import { motion } from "framer-motion";
import { Navbar } from "../app/interface/presentation/pages/Navbar";
import { menuPaths } from "../shared/contants/menuPaths";
import { Footer } from "../app/interface/presentation/pages/Footer";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar buttons={menuPaths} />
      <Component {...pageProps} />
      <Footer />
    </motion.div>
  );
}
export default MyApp;
