import { useState, type ChangeEvent } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Auth";

interface formDataProps {
  email: string;
  password: string;
}
export const Signin = () => {
  //@ts-ignore
  const { formData, setFormData, handleLogin } = useAuth();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="">
        <form
          onSubmit={handleLogin}
          className="min-w-96 border border-slate-300 px-8 py-6 rounded-md shadow-md"
        >
          <div className="flex flex-col gap-1 py-1">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              id="email"
              className="border border-stone-300 rounded-sm px-1.5 py-1 text-sm outline-none shadow-sm"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev: any) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <label htmlFor="password">Password</label>

            <Input
              type="password"
              id="password"
              name="password"
              className="border border-stone-300 rounded-sm px-1.5 py-1 text-sm outline-none shadow-sm"
              placeholder="..........."
              value={formData.password}
              onChange={(e) =>
                setFormData((prev: any) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>

          <div className="py-2">
            <Button type="submit" onClick={handleLogin} value="Signin" />
          </div>
        </form>
      </div>
    </div>
  );
};
