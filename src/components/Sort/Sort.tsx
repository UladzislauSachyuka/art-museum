import { SortProps } from "@types";

import styles from "./Sort.module.css";

const Sort: React.FC<SortProps> = ({ criteria, setSortCriteria }) => {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort" className={styles.sortLabel}>
        Sort by:
      </label>
      <select
        id="sort"
        className={styles.sortSelect}
        value={criteria}
        onChange={(e) => setSortCriteria(e.target.value)}>
        <option value="title.keyword">Title</option>
        <option value="artist_title.keyword">Artist</option>
      </select>
    </div>
  );
};

export default Sort;
