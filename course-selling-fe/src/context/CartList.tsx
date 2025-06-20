import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

//@ts-ignore
const cartContext = createContext();

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState([]);

  const getCartItems = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/cart", {
      withCredentials: true,
    });
    console.log(response);
  };
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};
