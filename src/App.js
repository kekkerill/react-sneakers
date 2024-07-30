import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Fav from "./pages/Fav";
import { v4 as uuidv4 } from "uuid";
import Orders from "./pages/Orders";

export const AppContext = createContext({});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCart, setIsCart] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddFav = async (item) => {
    const exists = favItems.some((favItem) => favItem.id === item.id);
    if (exists) return;

    const newItem = { ...item, id: uuidv4() };
    const { data } = await axios.post("http://localhost:3001/favs", newItem);
    setFavItems((prev) => [...prev, data]);
  };

  const onRemoveFav = async (item) => {
    const favItem = favItems.find((favItem) => favItem.id === item.id);
    if (!favItem) return;

    await axios.delete(`http://localhost:3001/favs/${favItem.id}`);
    setFavItems((prev) => prev.filter((fav) => fav.id !== favItem.id));
  };

  const onAddCart = async (item) => {
    const newItem = { ...item, id: uuidv4() };
    const { data } = await axios.post("http://localhost:3001/cart", newItem);
    setCartItems((prev) => [...prev, data]);
  };

  const onRemoveCart = async (id) => {
    await axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    async function fetchItmes() {
      const items = await axios.get("http://localhost:3001/items");
      const cart = await axios.get("http://localhost:3001/cart");
      const favs = await axios.get("http://localhost:3001/favs");
      const fetchOrders = await axios.get("http://localhost:3001/orders");

      setItems(items.data);
      setCartItems(cart.data);
      setFavItems(favs.data);
      setOrders(fetchOrders.data);

      setIsLoaded(true);
    }
    fetchItmes();
  }, []);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <AppContext.Provider
      value={{ items, cartItems, favItems, orders, isLoaded, totalPrice }}
    >
      <div className="wrapper">
        {isCart && (
          <Drawer
            onRemove={onRemoveCart}
            cartClose={() => {
              setIsCart(false);
            }}
            setCartItems={setCartItems}
          />
        )}
        <Header
          cartOpen={() => {
            setIsCart(true);
          }}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                searchValue={searchValue}
                onChangeSearch={onChangeSearch}
                setSearchValue={setSearchValue}
                onAddCart={onAddCart}
                onAddFav={onAddFav}
                onRemoveFav={onRemoveFav}
              />
            }
          />
          <Route
            path="/favs"
            exact
            element={<Fav onRemoveFav={onRemoveFav} onAddCart={onAddCart} />}
          />
          <Route
            path="/orders"
            exact
            element={
              <Orders
                onRemoveFav={onRemoveFav}
                onAddCart={onAddCart}
                onAddFav={onAddFav}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
