import { useState, useEffect } from "react";
import PaintingCard from "components/PaintingCard";
import Pagination from "components/Pagination";
import styles from "./Favorites.module.css";

interface Painting {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  label: string;
}

const ITEMS_PER_PAGE = 6;

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Painting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favoritePaintings = JSON.parse(storedFavorites);
      setFavorites(favoritePaintings);
    }
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, favorites.length);
  const paginatedFavorites = favorites.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <>
          <h1 className={styles.header}>Here Are Your Favorites</h1>
          <p className={styles.subHeader}>Your favorites list</p>

          <div className={styles.gridContainer}>
            {paginatedFavorites.map((painting) => (
              <PaintingCard
                key={painting.id}
                id={painting.id}
                imageUrl={painting.imageUrl}
                title={painting.title}
                artist={painting.artist}
                label={painting.label}
              />
            ))}
          </div>

          {favorites.length > ITEMS_PER_PAGE && (
            <Pagination
              total={Math.ceil(favorites.length / ITEMS_PER_PAGE)}
              value={currentPage}
              onChange={(page: number) => setCurrentPage(page)}
            />
          )}
        </>
      ) : (
        <h1 className={styles.empty}>No favorites yet!</h1>
      )}
    </div>
  );
};

export default Favorites;
