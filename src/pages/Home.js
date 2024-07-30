import { useContext } from "react";
import Card from "../components/Card";
import { AppContext } from "../App";
function Home({
  onRemoveFav,
  searchValue,
  onChangeSearch,
  setSearchValue,
  onAddCart,
  onAddFav,
}) {
  const { favItems } = useContext(AppContext);
  const { items } = useContext(AppContext);
  const { isLoaded } = useContext(AppContext);
  const isFav = (item) =>
    favItems.some((favItem) => favItem.title === item.title);
  return (
    <div className="content p-40">
      <div className="content-top">
        <h1>
          {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}
        </h1>

        <div className="searchBlock">
          <img src="img/search.svg" alt="search" />
          <input
            onChange={onChangeSearch}
            value={searchValue}
            placeholder="Поиск"
          />
          {searchValue && (
            <img
              className="cu-p"
              onClick={() => {
                setSearchValue("");
              }}
              src="img/btn-remove.svg"
              alt="clear"
            />
          )}
        </div>
      </div>
      <div className="cards">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj, index) => (
            <Card
              key={index}
              title={obj.title}
              price={obj.price}
              imgUrl={obj.imgUrl}
              favorited={isFav(obj)}
              onRemoveFav={onRemoveFav}
              onPlus={() => {
                onAddCart(obj);
              }}
              onFav={() => {
                onAddFav(obj);
              }}
              isLoaded={isLoaded}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
