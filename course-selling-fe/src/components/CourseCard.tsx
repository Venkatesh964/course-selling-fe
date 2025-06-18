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
  //@ts-ignore
  const { wishList, setWishList } = useWishList();
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {courseData?.map((course: CourseDataProps) => (
        <div className="border border-slate-300 rounded-md">
          <img src={course.imageUrl} height={80} className="w-full" />
          <div className="px-2 flex flex-col gap-1">
            <div className="font-bold py-1 ">{course.title}</div>
            <div className="text-sm text-slate-500 ">{author}</div>
            <div>{course.description.slice(0, 62) + "..."}</div>
            <div className="font-semibold">{"$" + course.price.toString()}</div>
          </div>
          <div className="flex gap-2 px-2 py-2">
            <button className=" border border-slate-300 bg-violet-600 flex-1 py-1 rounded-md  cursor-pointer font-semibold">
              <span className="text-white "> Add to Cart</span>
            </button>
            <button
              className="border border-violet-400 rounded-full px-2 py-2 cursor-pointer hover:bg-violet-50"
              onClick={() => {
                console.log("wishlisting the items");
                setWishList((prev: any) => [...prev, course]);
              }}
            >
              <WishListIcon textColor="text-violet-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
