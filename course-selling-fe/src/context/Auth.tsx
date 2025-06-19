import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//@ts-ignore
const AuthContext = createContext();

interface formDataProps {
  email: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const userData = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      localStorage.setItem("user", JSON.stringify(userData.data.user));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });
      navigate("/signin");
      setFormData({ email: "", password: "" });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ formData, setFormData, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
