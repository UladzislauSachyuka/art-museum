import { ReactComponent as AddToFavoriteIcon } from "@assets/icons/add-to-favorite-icon.svg";
import { ReactComponent as InFavoriteIcon } from "@assets/icons/in-favorite-icon.svg";
import { Painting } from "@types";
import { useEffect, useState } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./PaintingCard.module.css";

const PaintingCard: React.FC<Painting> = memo(
  ({ id, imageUrl, title, artist, label }) => {
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

    const imageProps = {
      src: imageUrl,
      alt: title,
      className: styles.paintingImage,
      onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = fallbackImagePath;
      },
      onClick: handleImageClick,
    };

    return (
      <div className={styles.paintingCard}>
        <img {...imageProps} />
        <div className={styles.paintingInfo}>
          <span className={styles.paintingTitle}>{title}</span>
          <p className={styles.paintingArtist}>{artist}</p>
          <span className={styles.paintingLabel}>{label}</span>
        </div>
        <div className={styles.icon} onClick={handleFavoriteClick}>
          {isFavorite ? <InFavoriteIcon /> : <AddToFavoriteIcon />}
        </div>
      </div>
    );
  }
);

PaintingCard.displayName = "PaintingCard";

export default PaintingCard;
