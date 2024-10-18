import { ReactComponent as SearchIcon } from "@assets/icons/search.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchFormProps } from "@types";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import styles from "./SearchForm.module.css";

const schema = yup.object().shape({
  search: yup
    .string()
    .trim()
    .strict()
    .min(3, "Search term must be at least 3 characters")
    .required("Search term is required")
    .matches(/\S/, "Search term cannot be just spaces"),
});

const SearchForm: React.FC<SearchFormProps> = ({ setSearchTerm, setCurrentPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => setSearchTerm(searchTerm), 1000),
    []
  );

  const onSubmit = (data: { search: string }) => {
    setCurrentPage(1);
    debouncedSearch(data.search);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.searchInput}
          type="text"
          autoComplete="off"
          placeholder="Search Art, Artist, Work..."
          {...register("search")}
        />
        <SearchIcon className={styles.searchIcon} onClick={handleSubmit(onSubmit)} />
        {errors.search && <p className={styles.errorMessage}>{errors.search.message}</p>}
      </form>
    </div>
  );
};

export default SearchForm;
