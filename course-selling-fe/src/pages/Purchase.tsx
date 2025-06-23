import axios from "axios";
import React, { useEffect, useState } from "react";
import type { CourseDataProps } from "./Home";
import { AppBar } from "../components/AppBar";

export const Purchase = () => {
  const [purchases, setPurchases] = useState([]);

  const getPurchases = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/purchases",
      {
        withCredentials: true,
      }
    );
    console.log(response.data.coursesData);
    setPurchases(response.data.coursesData);
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div>
      <AppBar />
      <h1 className="font-bold text-4xl py-2 pl-4">Purchases</h1>
      <div className="grid grid-cols-4">
        {purchases?.map((course: CourseDataProps) => (
          <div className="border border-slate-300 rounded-md py-2  my-2 mx-2 px-2 col-span-1">
            <img src={course.imageUrl} height={40} width={200} />
            <div className="px-2 flex flex-col gap-1">
              <div className="font-bold py-1 ">{course.title}</div>
              <div className="text-sm text-slate-500 ">{"Nassar hussain"}</div>
              <div className="text-sm">
                {course.description.slice(0, 680) + "..."}
              </div>
            </div>
          </div>
        ))}
        {/* <div>{purchases.map((purchase)=><div></div>)}</div> */}
      </div>
    </div>
  );
};
