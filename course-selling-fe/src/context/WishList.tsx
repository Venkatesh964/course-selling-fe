import { createContext, useContext, useState } from "react";

//@ts-ignore
const WishListCon = createContext();

export const WishListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishList, setWishList] = useState([]);

  return (
    <WishListCon.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListCon.Provider>
  );
};

export const useWishList = () => {
  return useContext(WishListCon);
};
