import React from "react";
import { useWishList } from "../context/WishList";

export const WishList = () => {
  //@ts-ignore
  const { wishList, setWishList } = useWishList();
  return (
    <div>
      <h1>WishList</h1>
      <div>
        {wishList.map((item: any) => (
          <div>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  );
};

function WishListCard() {
  return <div></div>;
}
