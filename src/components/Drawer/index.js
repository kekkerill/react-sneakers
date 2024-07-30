import styles from "./Drawer.module.scss";
import { AppContext } from "../../App";
import { useContext, useState } from "react";
import Info from "../Info";
import axios from "axios";

function Drawer({ cartClose, onRemove, setCartItems }) {
  const { cartItems } = useContext(AppContext);
  const { totalPrice } = useContext(AppContext);
  const [isOrdered, setIsOrderd] = useState(false);

  async function confirmOrder() {
    try {
      await axios.post("http://localhost:3001/orders", { items: cartItems });
      cartItems.map((item) =>
        axios.delete(`http://localhost:3001/cart/${item.id}`)
      );
      setCartItems([]);
      setIsOrderd(true);
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("An error occurred while confirming your order. Please try again.");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <div className={styles.cartTop}>
          <h1 className={styles.cartTitle}>Корзина</h1>
          <img
            className="cu-p"
            src="img/btn-remove.svg"
            alt=""
            width={40}
            height={40}
            onClick={cartClose}
          />
        </div>
        {isOrdered ? (
          <Info
            topImageUrl="img/orderConfirmed.svg"
            title="Заказ оформлен!"
            subtitle="Ваш заказ скоро будет передан курьерской доставке"
            btnImage="img/emptyCartBtn.svg"
            cartClose={cartClose}
          />
        ) : cartItems.length > 0 ? (
          <div className={styles.filled}>
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.clientId} className={styles.cartItem}>
                  <img
                    width={70}
                    height={70}
                    src={item.imgUrl}
                    alt="Кроссовока"
                    className="mr-20"
                  />
                  <div className={styles.cartItemInfo}>
                    <p>{item.title}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => {
                      onRemove(item.id);
                    }}
                    src="img/btn-remove.svg"
                    width={32}
                    height={32}
                    alt="Удалить"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartSum}>
              <p>Итого:</p>
              <div></div>
              <p>{totalPrice} руб.</p>
            </div>
            <div className={styles.cartTax}>
              <p>Налог 5%:</p>
              <div></div>
              <p>{totalPrice / 20} руб.</p>
            </div>
            <div className={styles.cartSubmitBtn}>
              <img
                onClick={() => confirmOrder()}
                src="img/submit-btn.svg"
                alt="Оформить заказ"
              />
            </div>
          </div>
        ) : (
          <Info
            topImageUrl="img/emptyCart.png"
            title="Корзина пустая"
            subtitle="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            btnImage="img/emptyCartBtn.svg"
            cartClose={cartClose}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
