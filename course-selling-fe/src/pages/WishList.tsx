import { AppBar } from "../components/AppBar";
import { useWishList } from "../context/WishList";
export const WishList = () => {
  //@ts-ignore
  const { wishList, setWishList } = useWishList();
  return (
    <div>
      <AppBar />
      <section className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold py-3">WishList</h1>
        <div className="grid grid-cols-4 gap-4">
          {wishList?.map((course: any) => (
            <div className="border border-slate-300 rounded-md col-span-1">
              <img src={course.imageUrl} height={40} className="w-full" />
              <div className="px-2 flex flex-col gap-1">
                <div className="font-bold py-1 ">{course.title}</div>
                <div className="text-sm text-slate-500 ">
                  {course.author || "Nassar hussain"}
                </div>
                {/* <div className="text-sm">
                       {course.description.slice(0, 62) + "..."}
                     </div> */}
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
