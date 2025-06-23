import { useState, type ChangeEvent } from "react";
import { Input } from "./Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { useCourse } from "../context/CartList";

export const AppBar = () => {
  const [searchCourse, setSearchCourse] = useState("");
  //@ts-ignore
  const { courseData, setCourseData } = useCourse();
  const navigate = useNavigate();

  //@ts-ignore
  const { handleLogout } = useAuth();
  const handleCourseSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCourse(e.target.value);
    // if (!e.target.value) return;
    const response = await axios.get(
      `http://localhost:3000/api/v1/course/${e.target.value}`,
      {
        withCredentials: true,
      }
    );
    // setCourseData(response.data.response);
    console.log(response);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  function handleWishList(): void {
    navigate("/wishlist");
  }

  const jsonObj = JSON.parse(
    localStorage.getItem("user") ?? '{firstName:"A", lastName:`N`}'
  );
  const name = jsonObj.firstName[0] + jsonObj.lastName[0];
  return (
    <div className="border-b border-slate-300">
      <div className="flex justify-between py-3 px-4">
        <div className="flex gap-8 items-center">
          <Link to="/">
            <div className="text-2xl font-bold">Udemy</div>
          </Link>
          <div className="min-w-[18rem] max-w-[60rem]">
            <Input
              placeholder="Search Courses"
              className="border border-stone-400 rounded-full px-2 py-1.5 text-sm outline-none w-full"
              type="text"
              id="search"
              name="search"
              value={searchCourse}
              onChange={handleCourseSearch}
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            className="cursor-pointer hover:bg-gray-300 px-2 py-1 rounded-md"
            onClick={() => navigate("/purchases")}
          >
            My Purchases
          </div>
          <div
            className="cursor-pointer hover:bg-violet-200"
            onClick={handleWishList}
          >
            <WishListIcon textColor={""} />
          </div>
          <div
            className="cursor-pointer  hover:bg-violet-200"
            onClick={handleCart}
          >
            <Cart />
          </div>
          <div className="cursor-pointer relative">
            <Circle person={name} width={"2rem"} height={"2rem"} />
            <div className="absolute border border-slate-300 w-20 right-0 mt-2">
              <button
                className="cursor-pointer bg-slate-300 w-full"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Circle({
  person,
  width,
  height,
}: {
  person: string;
  width: string;
  height: string;
}) {
  return (
    <div
      className={`flex justify-center items-center rounded-full border border-slate-300 font-semibold text-white bg-black`}
      style={{ width: width, height: height }}
    >
      {person}
    </div>
  );
}

export function WishListIcon({ textColor }: { textColor: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className={`size-6  ${textColor}`}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function Cart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  );
}
