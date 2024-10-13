import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "components/Loader";
import { ReactComponent as AddToFavoriteIcon } from "@assets/icons/add-to-favorite-icon.svg";
import { ReactComponent as InFavoriteIcon } from "@assets/icons/in-favorite-icon.svg";
import styles from "./PaintingDetails.module.css";

interface Painting {
  id: number;
  title: string;
  artist_display: string;
  artist_title: string;
  image_id: string;
  years: string;
  dimensions: string;
  credit_line: string;
  place_of_origin: string;
  is_on_view: boolean;
}

const defaultPainting: Painting = {
  id: 0,
  title: "Unknown",
  artist_display: "",
  artist_title: "Unknown",
  image_id: "",
  years: "Unknown",
  dimensions: "Unknown",
  credit_line: "Unknown",
  place_of_origin: "Unknown",
  is_on_view: false,
};

const PaintingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [painting, setPainting] = useState<Painting>(defaultPainting);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const fallbackImagePath = "/default_image.jpg";

  const fetchPaintingDetails = async () => {
    try {
      const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}?`);
      setPainting(response.data.data);
    } catch (error) {
      console.error("Error fetching painting details:", error);
    }
    setLoading(false);
  };

  const checkIfFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(Number(id)));
    }
  };

  useEffect(() => {
    fetchPaintingDetails();
    checkIfFavorite();

    const handleStorageChange = () => {
      checkIfFavorite();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [id]);

  const handleFavoriteClick = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((favoriteId: number) => favoriteId !== Number(id));
    } else {
      favorites.push(Number(id));
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div className={styles.loaderOverlay}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img
              src={`https://www.artic.edu/iiif/2/${painting.image_id}/full/400,/0/default.jpg`}
              alt={painting.title}
              className={styles.image}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = fallbackImagePath;
              }}
            />
            <div className={styles.icon} onClick={handleFavoriteClick}>
              {isFavorite ? <InFavoriteIcon /> : <AddToFavoriteIcon />}
            </div>
          </div>
          <div className={styles.descriptionContainer}>
            <div>
              <h1 className={styles.title}>{painting.title}</h1>
              <p className={styles.artist}>{painting.artist_title}</p>
              <p className={styles.point}>{painting.artist_display}</p>
            </div>
            <div>
              <h1 className={styles.title}>Overview</h1>
              <p className={styles.point}>
                <span className={styles.element}>Dimensions: </span>
                {painting.dimensions}
              </p>
              <p className={styles.point}>
                <span className={styles.element}>Credit Line: </span>
                {painting.credit_line}
              </p>
              <p className={styles.point}>
                <span className={styles.element}>Place of Origin: </span>
                {painting.place_of_origin || "Unknown"}
              </p>
              <p className={styles.point}>{painting.is_on_view ? "Public" : "Private"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaintingDetails;
