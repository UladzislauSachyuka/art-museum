import { useState, useEffect } from "react";
import { ReactComponent as AddToFavoriteIcon } from "@assets/icons/add-to-favorite-icon.svg";
import { ReactComponent as InFavoriteIcon } from "@assets/icons/in-favorite-icon.svg";
import styles from "./PaintingCard.module.css";

interface PaintingCardProps {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  label: string;
}

const PaintingCard: React.FC<PaintingCardProps> = ({
  id,
  imageUrl,
  title,
  artist,
  label,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);

  const handleFavoriteClick = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((favoriteId: number) => favoriteId !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.paintingCard}>
      <img src={imageUrl} alt={title} className={styles.paintingImage} />
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
