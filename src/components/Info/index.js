import React from "react";
import styles from "./Info.module.scss";
import { Link } from "react-router-dom";

const Info = ({ cartClose, topImageUrl, title, subtitle, btnImage }) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoBlock}>
        <img src={topImageUrl} alt="Корзина пуста" />
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <Link to="/">
          <img
            onClick={cartClose}
            className={styles.infoBtn}
            src={btnImage}
            alt="Вернуться назад"
          />
        </Link>
      </div>
    </div>
  );
};

export default Info;
