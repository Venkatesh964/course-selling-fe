import { createContext, useContext, useState } from "react";

//@ts-ignore
const cartContext = createContext();

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};
