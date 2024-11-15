"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../GlobalRedux/store";
import { fetchUserDetails, loginUser, logoutUser, selectIsAuthenticated, selectUser } from "../GlobalRedux/Features/userSlice";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface RegisterFormInputs extends LoginFormInputs {
  name: string;
}

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  
  const dispatch: AppDispatch = useDispatch();


  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormInputs | RegisterFormInputs>();

  useEffect(() => {
    const updateTime = () => {
      // const now = new Date();
      const hours = "1"
      // String(now.getHours()).padStart(2, "0");
      const minutes ="1"
      //  String(now.getMinutes()).padStart(2, "0");
      const seconds = "1"
      // String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleForm = () => setIsLogin(!isLogin);

  

  const handleRegister = async (data: RegisterFormInputs) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setStatusMessage("Registration successful! Please check your email.");
        reset();
        setIsLogin(true);
      } else {
        setStatusMessage(responseData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Server error. Please try again later.");
    }
    setIsLogin(true);
  };

  const handleLogin = async (data: LoginFormInputs) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      reset();
      toggleModal();
    }
  };

  const handleLogout = () => dispatch(logoutUser());
  console.log(user.name )
  

  return (
    <>
      <nav className="z-50 fixed top-0 w-full shadow-lg shadow-slate-800">
        <Sidebar />
        <div className="bg-gray-800 text-white flex justify-between items-center px-5 py-2">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={35}
              height={35}
              className="object-contain rounded-md ml-20"
            />
          </div>
          <div className="text-center text-xs font-mono">{currentTime}</div>
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
               
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md"
                  onClick={handleLogout}
                >
                  Logout 
                </button>
              </div>
            ) : (
              <div>           
                  <button
                className="bg-slate-600 hover:bg-purple-400 text-white font-semibold py-1 px-3 rounded-md"
                onClick={toggleModal}
              >
                {isLogin ? "Login" : "Register"}
              </button>
              </div>
 
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-60">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">{isLogin ? "Login" : "Register"}</h2>
              <button
                className="text-red-500 shadow-xl shadow-violet-400 rounded-3xl p-2"
                onClick={toggleModal}
              >
                ✖️
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                  <input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full bg-black hover:bg-purple-300 text-white py-2 rounded-md shadow-purple-400 shadow-2xl">
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                  <input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full bg-black hover:bg-purple-300 text-white py-2 rounded-md">
                  Register
                </button>
              </form>
            )}

            {/* {error && (
              <div className="mt-4 text-center text-red-500">
                {error}
              </div>
            )} */}
                  {statusMessage && (
              <div className="mt-4 text-center text-red-500">
                {statusMessage}
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                className="text-blue-500"
                onClick={toggleForm}
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
