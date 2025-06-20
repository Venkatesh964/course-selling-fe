import { useEffect, useState } from "react";
import { AppBar, WishListIcon } from "../components/AppBar";
import { useWishList } from "../context/WishList";
export const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [flag, setFlag] = useState(false);

  const getWishListItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/wishlist",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const wishlistData = await response.json();
      console.log(`wishlist items`, wishlistData);
      setWishList(wishlistData.coursesData);
    } catch (e) {
      console.log(`wishlist items`, e);
    }
  };

  useEffect(() => {
    getWishListItems();
  }, [flag]);

  const handleDeleteWishlist = async (courseId: string) => {
    try {
      console.log("in delete method of wishlist");
      const response = await fetch(
        "http://localhost:3000/api/v1/user/wishlist",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
          }),
        }
      );
      const deletedItem = await response.json();
      setFlag(!flag);
      console.log(deletedItem);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <AppBar />
      <section className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold py-3">WishList</h1>
        <div className="grid grid-cols-4 gap-4">
          {wishList?.map((course: any) => (
            <div className="border border-slate-300 rounded-md col-span-1 relative">
              <div
                className="absolute right-1 top-1 cursor-pointer"
                onClick={() => handleDeleteWishlist(course._id)}
              >
                <WishListIcon textColor={"white"} />
              </div>
              <img src={course.imageUrl} height={40} className="w-full" />
              <div className="px-2 flex flex-col gap-1">
                <div className="font-bold py-1 ">{course.title}</div>
                <div className="text-sm text-slate-500 ">
                  {course.author || "Nassar hussain"}
                </div>
                <div className="font-semibold">
                  {"$" + course.price.toString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
