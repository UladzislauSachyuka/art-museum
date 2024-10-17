import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";
import styles from "./Layout.module.css";

const Layout = () => (
  <div className={styles.content}>
    <Header />
    <div className={styles.mainContent}>
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;
