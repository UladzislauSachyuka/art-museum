import { ReactComponent as Logo } from "@assets/icons/museum-logo-footer.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo />
    </footer>
  );
};

export default Footer;
