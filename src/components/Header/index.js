import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { useContext } from "react";
function Header(props) {
  const { totalPrice } = useContext(AppContext);
  return (
    <header>
      <div className={styles.header_left}>
        <Link to="/">
          <img src="/img/logo.png" width={40} height={40} alt="logo" />
          <div className="headerText">
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>
      <ul className={styles.header_right}>
        <li className="cu-p" onClick={props.cartOpen}>
          <img src="/img/cart.svg" width={18} height={18} alt="cart" />
          <span className={styles.cart_price}>{totalPrice} руб.</span>
        </li>

        <Link to="/favs">
          <li>
            <img src="/img/favs.svg" width={18} height={18} alt="favs" />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to="/orders">
          <li>
            <img src="/img/user.svg" width={18} height={18} alt="profile"></img>
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}
export default Header;
