"use client";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
  <div className="relative z-30">

<button
  onClick={toggleSidebar}
  className="fixed top-0 left-4 p-2 bg-background shadow-slate-600 text-white rounded-lg focus:outline-none transform transition-transform duration-300 ease-in-out hover:scale-105"
>
  {isOpen ? "" : "☰"}
</button>

<div
  className={`fixed top-0 left-0 h-full w-64 bg-purple-400 from-purple-700 to-purple-50 text-white transition-transform duration-300 ease-in-out transform ${
    isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"
  } border-r-4 border-l-gradient-to-r from-purple-700 to-purple-400`} // Add gradient right border here
>
  <br />
  <br />
  <br />
  <div className="flex flex-col p-4 space-y-6 bg-purple-500 rounded-lg">
    <h2 className="text-lg font-semibold">
      SURE TRUST
      <button
        onClick={toggleSidebar}
        className="fixed top-20 ml-32 left-4 p-2 bg-background text-white rounded-lg shadow-lg focus:outline-none transform transition-transform duration-300 ease-in-out hover:scale-105"
      >
        {isOpen ? "❌" : ""}
      </button>
    </h2>

    <p
      
      className="hover:underline hover:text-blue-300 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-sm p-3"
    >
      <Link href={"/"} className="visited:text-white rounded-md" onClick={()=>setIsOpen(false)}>
      Dashboard
      </Link>
    </p>
   
    <p
      className="hover:underline hover:text-blue-300 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-sm p-3"
    >
      <Link href={"/mycourse/5"} className="visited:text-white" onClick={()=>setIsOpen(false)}> Courses</Link>

    </p>
   
    <p
      onClick={()=>setIsOpen(false)}
      className="hover:underline hover:text-blue-300 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-sm p-3"
    >
      Trainers
    </p>
   
    <p
      onClick={()=>setIsOpen(false)}
      className="hover:underline hover:text-blue-300 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-sm p-3"
    >
      Students
    </p>
  </div>
</div>
</div>
    </>
  );
};

export default Sidebar;
