import PropTypes from "prop-types";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={`${styles.layout} --pad`}>{children}</div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
