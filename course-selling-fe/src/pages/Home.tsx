import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Circle } from "../components/AppBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourseCard } from "../components/CourseCard";

export interface CourseDataProps {
  _id: string;
  description: string;
  imageUrl: string;
  price: Number;
  title: string;
}

export const Home = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseDataProps[]>();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const courseData = await axios.get(
        "http://localhost:3000/api/v1/user/bulk",
        {
          // headers: {
          //   Authorization: `Bearer ` + localStorage.getItem("token"),
          // },
          withCredentials: true,
        }
      );
      setCourseData(courseData.data.courses.slice(3));
    } catch (e) {
      console.log(e);
    }
  };

  const jsonObj = JSON.parse(
    localStorage.getItem("user") ?? '{firstName:"A", lastName:`N`}'
  );
  const firstName = jsonObj.firstName;
  const lastName = jsonObj.lastName;
  const userTag = firstName[0] + lastName[0];
  const author = "Nassar hussian";
  return (
    <div>
      <AppBar />
      <section className="max-w-7xl mx-auto">
        <div className="flex gap-4 items-center py-4">
          <div className="flex items-center">
            <Circle person={userTag} width={"3rem"} height={"3rem"} />
          </div>

          <div className="font-bold text-2xl">
            Welcome back, {firstName + ` ` + lastName}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-3xl py-2">What to learn next</h2>
          <h3 className="font-bold text-xl py-2"> Recommended for you</h3>
          <CourseCard courseData={courseData} author={author} />
          {/* {courseData?.map((course) => (
            <div>
              <div>{course.title}</div>
              <div>{course.description}</div>
              <div>{course.price.toString()}</div>
              <img src={course.imageUrl} height={100} width={100} />
            </div>
          ))} */}
        </div>
      </section>
    </div>
  );
};
