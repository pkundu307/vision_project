"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register forms
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage OTP sent
  const [otp, setOtp] = useState(""); // Store OTP input
  const [email, setEmail] = useState(""); // Store email input (to send OTP to)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime(); // Initial time update
    const timeInterval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timeInterval); // Cleanup on component unmount
  }, []);

  // Handle modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form switching between login and register
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handle OTP sending (simulate the action)
  const sendOtp = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    // Simulate sending OTP
    alert(`OTP sent to ${email}`);
    setIsOtpSent(true);
  };

  // Handle OTP verification
  const verifyOtp = () => {
    if (otp === "123456") {
      alert("OTP verified successfully!");
      // Proceed to complete the registration process
      setIsModalOpen(false); // Close modal after successful verification
    } else {
      alert("Invalid OTP.");
    }
  };

  return (
    <>
      <nav className="z-50 fixed top-0 w-full">
        <Sidebar />
        <div className="bg-gray-800 text-white flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo1.png" // Path to your logo in the public folder
              alt="Logo"
              width={30}
              height={30}
              className="object-contain rounded-md ml-20"
            />
          </div>

          {/* Center the time */}
          <div className="text-center text-xs font-mono">{currentTime}</div>

          {/* Right-side items */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md"
              onClick={toggleModal} // Open the modal
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">{isLogin ? "Login" : "Register"}</h2>
              <button
                className="text-red-500"
                onClick={toggleModal} // Close the modal
              >
                &times;
              </button>
            </div>

            {/* Toggle between Register and Login Forms */}
            {isLogin ? (
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                  Login
                </button>
              </form>
            ) : (
              <>
                {!isOtpSent ? (
                  <form>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                      <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                      onClick={sendOtp} // Send OTP
                    >
                      Register
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-4">
                      <label htmlFor="otp" className="block text-sm font-semibold">Enter OTP</label>
                      <input
                        type="text"
                        id="otp"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                      onClick={verifyOtp} // Verify OTP
                    >
                      Verify
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="mt-4 text-center">
              <button
                className="text-blue-500"
                onClick={toggleForm} // Switch between login and register
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
