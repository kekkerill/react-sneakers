import { useState, useEffect } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

function Card({
  title,
  price,
  imgUrl,
  onPlus,
  onFav,
  favorited = false,
  onRemoveFav,
  isLoaded,
}) {
  const [isPlus, setIsPlus] = useState(false);
  const [isFav, setIsFav] = useState(favorited);

  useEffect(() => {
    setIsFav(favorited);
  }, [favorited]);

  function onClickFav() {
    const item = { title, price, imgUrl };
    if (isFav) {
      onRemoveFav(item);
    } else {
      onFav(item);
    }
    setIsFav(!isFav);
  }

  function onClickPlus() {
    if (!isPlus) {
      onPlus({ title, price, imgUrl });
    }
    setIsPlus(!isPlus);
    setTimeout(() => {
      setIsPlus(isPlus);
    }, 300);
  }

  return isLoaded ? (
    <div className={styles.card}>
      <div className={styles.fav} onClick={onClickFav}>
        <img
          className={styles.heartImg}
          src={isFav ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
          alt="like"
        />
      </div>
      <img height={112} width={133} src={imgUrl} alt="Кроссовки" />
      <p>{title}</p>
      <div className={styles.cardBottom}>
        <div className={styles.cardBottomLeft}>
          <span>Цена:</span>
          <p>{price} руб.</p>
        </div>
        <button className={styles.plus} onClick={onClickPlus}>
          <img
            src={isPlus ? "img/btn-unchecked.svg" : "img/btn-checked.svg"}
            alt="Добавить"
          />
        </button>
      </div>
    </div>
  ) : (
    <ContentLoader
      speed={2}
      width={250}
      height={340}
      viewBox="0 0 250 340"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="250" height="150" />
      <rect x="0" y="160" rx="10" ry="10" width="250" height="20" />
      <rect x="0" y="190" rx="10" ry="10" width="150" height="20" />
      <rect x="0" y="220" rx="10" ry="10" width="80" height="40" />
    </ContentLoader>
  );
}

export default Card;
