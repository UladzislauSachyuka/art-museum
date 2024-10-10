import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddToFavoriteIcon } from "@assets/icons/add-to-favorite-icon.svg";
import { ReactComponent as InFavoriteIcon } from "@assets/icons/in-favorite-icon.svg";
import styles from "./PaintingCard.module.css";

interface Painting {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  label: string;
}

const PaintingCard: React.FC<Painting> = ({ id, imageUrl, title, artist, label }) => {
  const fallbackImagePath = "/default_image.jpg";
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const isPaintingInFavorites = favorites.some(
        (favorite: { id: number }) => favorite.id === id
      );
      setIsFavorite(isPaintingInFavorites);
    }
  }, [id]);

  // const handleFavoriteClick = () => {
  //   const storedFavorites = localStorage.getItem("favorites");
  //   let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  //   if (isFavorite) {
  //     favorites = favorites.filter((favoriteId: number) => favoriteId !== id);
  //   } else {
  //     favorites.push(id);
  //   }

  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  //   setIsFavorite(!isFavorite);
  // };

  const handleFavoriteClick = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((favorite: Painting) => favorite.id !== id);
    } else {
      const newFavorite = { id, imageUrl, title, artist, label };
      favorites.push(newFavorite);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handleImageClick = () => {
    navigate(`/painting/${id}`);
  };

  return (
    <div className={styles.paintingCard}>
      <img
        src={imageUrl}
        alt={title}
        className={styles.paintingImage}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = fallbackImagePath;
        }}
        onClick={handleImageClick}
      />
      <div className={styles.paintingInfo}>
        <h4 className={styles.paintingTitle}>{title}</h4>
        <p className={styles.paintingArtist}>{artist}</p>
        <span className={styles.paintingLabel}>{label}</span>
      </div>
      <div className={styles.icon} onClick={handleFavoriteClick}>
        {isFavorite ? <InFavoriteIcon /> : <AddToFavoriteIcon />}
      </div>
    </div>
  );
};

export default PaintingCard;
