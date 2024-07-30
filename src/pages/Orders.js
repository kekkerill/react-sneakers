import { useContext } from "react";
import { AppContext } from "../App";
import Info from "../components/Info";
import Card from "../components/Card";

const Orders = ({ onRemoveFav, onAddCart, onAddFav }) => {
  const { orders, favItems, isLoaded } = useContext(AppContext);
  const isFav = (item) =>
    favItems.some((favItem) => favItem.title === item.title);
  return orders.length > 0 ? (
    <div className="content p-40">
      <div className="content-top">
        <h1>Мои заказы</h1>
      </div>
      <div className="cards">
        {orders.map((order) => (
          <div key={order.id}>
            {order.items.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                isLoaded={isLoaded}
                favorited={isFav(item)}
                onRemoveFav={onRemoveFav}
                onPlus={() => {
                  onAddCart(item);
                }}
                onFav={() => {
                  onAddFav(item);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Info
      topImageUrl="img/emptyOrders.png"
      title="У вас нет заказов"
      subtitle="Вы нищеброд? Оформите хотя бы один заказ."
      btnImage="img/emptyCartBtn.svg"
    />
  );
};

export default Orders;
