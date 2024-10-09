import { useEffect, useState } from "react";
import axios from "axios";
import PaintingCard from "components/PaintingCard";
import Loader from "components/Loader";
import Pagination from "components/Pagination";
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
  const [loading, setLoading] = useState(true);

  const fetchPaintings = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${PAINTINGS_PER_PAGE}&fields=id,image_id,title,artist_title,is_on_view`
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

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div className={styles.loaderOverlay}>
          <Loader />
        </div>
      ) : (
        <>
          <h1>Painting Gallery</h1>
          <div className={`${styles.paintingList}`}>
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

          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default PaintingList;
