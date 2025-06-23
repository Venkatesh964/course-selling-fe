import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { CourseDataProps } from "../pages/Home";

//@ts-ignore
const cartContext = createContext();

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [courseData, setCourseData] = useState<CourseDataProps[]>();

  const getCourses = async () => {
    try {
      const courseData = await axios.get(
        "http://localhost:3000/api/v1/user/bulk",
        {
          withCredentials: true,
        }
      );
      setCourseData(courseData.data.courses.slice(3));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <cartContext.Provider value={{ courseData, setCourseData }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCourse = () => {
  return useContext(cartContext);
};
