import { useEffect } from "react";

import { useWishList } from "../context/WishList";
import type { CourseDataProps } from "../pages/Home";
import { wishList } from "../utils/wishlist";
import { WishListIcon } from "./AppBar";

export const CourseCard = ({
  courseData,
  author,
}: {
  courseData: CourseDataProps[] | undefined;
  author: string;
}) => {
  useEffect(() => {
    // setCart(courseData?.slice(0, 3));
  }, []);

  const handleAddCart = async (courseId: string) => {
    try {
      console.log("here in add cart request");
      const response = await fetch("http://localhost:3000/api/v1/user/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
        }),
      });
      const cartItem = await response.json();
      console.log(cartItem);
    } catch (e) {
      console.log(`Failed to add the item to cart`, e);
    }
  };

  const handleWishlist = async (courseId: string) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/wishlist",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
          }),
        }
      );
      const wishlistItem = await response.json();
      console.log(wishlistItem);
    } catch (e) {
      console.log(`Failed to add the item to cart`, e);
    }
  };
  return (
    <div className="grid grid-cols-5 gap-4 ">
      {courseData?.map((course: CourseDataProps) => (
        <div className="border border-slate-300 rounded-md">
          <img src={course.imageUrl} height={40} className="w-full" />
          <div className="px-2 flex flex-col gap-1">
            <div className="font-bold py-1 ">{course.title}</div>
            <div className="text-sm text-slate-500 ">{author}</div>
            {/* <div className="text-sm">
              {course.description.slice(0, 62) + "..."}
            </div> */}
            <div className="font-semibold">{"$" + course.price.toString()}</div>
          </div>
          <div className="flex gap-2 px-2 py-2">
            <button
              className=" border border-slate-300 bg-violet-600 flex-1 py-1 rounded-md  cursor-pointer font-semibold"
              onClick={() => handleAddCart(course._id)}
            >
              <span className="text-white "> Add to Cart</span>
            </button>
            <button
              className="border border-violet-400 rounded-full px-2 py-2 cursor-pointer hover:bg-violet-50"
              onClick={() => handleWishlist(course._id)}
            >
              <WishListIcon textColor="text-violet-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
