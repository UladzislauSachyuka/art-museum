import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => (
  <div className={styles.notFoundContainer}>
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist</p>
    <Link to="/">Home</Link>
  </div>
);

export default NotFoundPage;
