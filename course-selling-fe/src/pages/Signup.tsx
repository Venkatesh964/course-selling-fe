import { useState, type ChangeEvent } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface formDataProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export const Signup = () => {
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const userData = await response.json();
      navigate("/", { state: { user: userData.user } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="min-w-96 border border-stone-300  px-8 py-6 rounded-md shadow-md"
        >
          <div className="flex flex-col gap-1 py-1">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="border border-stone-300 rounded-sm px-1.5 py-1 text-sm outline-none shadow-sm"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label htmlFor="password">Password</label>

            <Input
              type="password"
              className="border border-stone-300 rounded-sm px-1.5 py-1 text-sm outline-none shadow-sm"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              className="border border-stone-300 rounded-sm px-1.5 py-1 text-sm outline-none shadow-sm"
              id="firstName"
              name="firstName"
              placeholder="Firstname"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label htmlFor="lastName">Last Name</label>
            <Input
              type="text"
              id="lastName"
              className="border border-stone-300 rounded-sm px-1.5 py-1 text-sm outline-none shadow-sm"
              name="lastName"
              placeholder="Lastname"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="py-4">
            <Button type="submit" onClick={handleSubmit} value="Signup" />
          </div>
        </form>
      </div>
    </div>
  );
};
