import { usePagination } from "@mantine/hooks";
import styles from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  value: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, value, onChange }) => {
  const pagination = usePagination({
    total,
    initialPage: value,
    onChange: (page: number) => onChange(page),
  });

  return (
    <div className={styles.paginationContainer}>
      {pagination.range.map((pageNumber, index) => {
        if (typeof pageNumber === "number") {
          return (
            <button
              key={index}
              className={`${styles.paginationControl} ${
                pagination.active === pageNumber ? styles.activeControl : ""
              }`}
              onClick={() => onChange(pageNumber)}>
              {pageNumber}
            </button>
          );
        } else if (pageNumber === "dots") {
          return (
            <span key={index} className={styles.dots}>
              ...
            </span>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Pagination;
