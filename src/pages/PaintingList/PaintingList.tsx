import { getPaintings, getSearchedPaintings } from "@api";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import PaintingCard from "@components/PaintingCard";
import PaintingSearchForm from "@components/SearchForm";
import Sort from "@components/Sort";
import { PAINTINGS_PER_PAGE } from "@constants/constants";
import { FetchPainting } from "@types";
import { useEffect, useState } from "react";

import styles from "./PaintingList.module.css";

const PaintingList: React.FC = () => {
  const [paintings, setPaintings] = useState<FetchPainting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [noData, setNoData] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<string>("title.keyword");

  const fetchPaintings = async (page: number) => {
    setLoading(true);
    try {
      const response = await getPaintings(page, PAINTINGS_PER_PAGE);
      const fetchedResults = response.data;
      setPaintings(fetchedResults);
      setTotalPages(Math.ceil(response.pagination.total / PAINTINGS_PER_PAGE));
      setNoData(fetchedResults.length === 0);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    }
    setLoading(false);
  };

  const fetchSearchedPaintings = async (search: string, page: number, sort: string) => {
    setLoading(true);
    try {
      const response = await getSearchedPaintings(search, page, sort, PAINTINGS_PER_PAGE);
      const fetchedResults = response.data;
      setPaintings(fetchedResults);
      setTotalPages(Math.ceil(response.pagination.total / PAINTINGS_PER_PAGE));
      setNoData(fetchedResults.length === 0);
    } catch (error) {
      console.error("Error fetching searched paintings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchedPaintings(searchTerm, currentPage, sortCriteria);
    } else {
      fetchPaintings(currentPage);
    }
  }, [currentPage, searchTerm, sortCriteria]);

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div className={styles.loaderOverlay}>
          <Loader />
        </div>
      ) : (
        <>
          <h1>Painting Gallery</h1>

          <PaintingSearchForm
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          />

          {searchTerm && (
            <Sort criteria={sortCriteria} setSortCriteria={setSortCriteria} />
          )}

          {noData ? (
            <h1>No paintings found</h1>
          ) : (
            <>
              <div className={`${styles.paintingList}`}>
                {paintings.map((painting) => (
                  <PaintingCard
                    key={painting.id}
                    id={painting.id}
                    imageUrl={`https://www.artic.edu/iiif/2/${painting.image_id}/full/400,/0/default.jpg`}
                    title={painting.title}
                    artist={painting.artist_title || "Unknown"}
                    label={painting.is_public_domain ? "Public" : "Private"}
                  />
                ))}
              </div>

              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={(page: number) => setCurrentPage(page)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PaintingList;
