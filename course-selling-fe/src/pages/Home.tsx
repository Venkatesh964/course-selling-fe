import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Circle } from "../components/AppBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourseCard } from "../components/CourseCard";

export interface CourseDataProps {
  description: string;
  imageUrl: string;
  price: Number;
  title: string;
}

export const Home = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseDataProps[]>();
  let user = "Anonymous";
  let userTag = "AN";
  let author = "Anonymous";

  const [wishList, setWishList] = useState([]);
  const handleWishList = () => {
    setWishList([]);
    navigate("/wishlist");
  };

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

  return (
    <div>
      <AppBar handleWishList={handleWishList} />
      <section className="max-w-7xl mx-auto">
        <div className="flex gap-4 items-center py-4">
          <div className="flex items-center">
            <Circle person={userTag} width={8} height={8} />
          </div>

          <div className="font-semibold text-lg">Welcome back, {user}</div>
        </div>

        <div>
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
