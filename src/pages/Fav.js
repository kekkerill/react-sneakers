import Card from "../components/Card";
import { useContext } from "react";
import { AppContext } from "../App";
import Info from "../components/Info";
function Fav({ onAddCart, onRemoveFav }) {
  const { favItems } = useContext(AppContext);
  const { isLoaded } = useContext(AppContext);
  return favItems.length === 0 ? (
    <Info
      topImageUrl="img/emptyFav.png"
      title="Закладок нет :("
      subtitle="Вы ничего не добавили в закладки"
      btnImage="img/emptyCartBtn.svg"
    />
  ) : (
    <div className="content p-40">
      <div className="content-top">
        <h1>Закладки</h1>
      </div>
      <div className="cards">
        {favItems.map((obj, index) => (
          <Card
            key={index}
            title={obj.title}
            price={obj.price}
            imgUrl={obj.imgUrl}
            favorited={true}
            isLoaded={isLoaded}
            onRemoveFav={() => {
              onRemoveFav(obj);
            }}
            onPlus={() => {
              onAddCart(obj);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Fav;
