import { useEffect, useState } from "react";
import axios from "axios";
import PaintingCard from "components/PaintingCard";
import Loader from "components/Loader";
import { PAINTINGS_PER_PAGE } from "constants/constants";
import styles from "./PaintingList.module.css";

interface Painting {
  id: number;
  title: string;
  artist_title: string | null;
  image_id: string;
  is_on_view: boolean;
}

const PaintingList: React.FC = () => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPaintings = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${PAINTINGS_PER_PAGE}`
      );
      setPaintings(response.data.data);
      setTotalPages(Math.ceil(response.data.pagination.total / PAINTINGS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching paintings:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPaintings(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Painting Gallery</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.paintingList}>
          {paintings.map((painting) => (
            <PaintingCard
              key={painting.id}
              id={painting.id}
              imageUrl={`https://www.artic.edu/iiif/2/${painting.image_id}/full/400,/0/default.jpg`}
              title={painting.title}
              artist={painting.artist_title || "Unknown"}
              label={painting.is_on_view ? "Public" : "Private"}
            />
          ))}
        </div>
      )}

      <div className={styles.paginationControls}>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaintingList;
