"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(1000);
  const [totalTrainers, setTotalTrainers] = useState(50);
  const [activeCourses, setActiveCourses] = useState(200);

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl">
        
        {/* Card 1: Student Enrollment Graph Placeholder */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 shadow-gray-500 hover:shadow-purple-400">
          <h3 className="text-lg font-semibold p-4 border-b border-gray-700">Student Enrollment</h3>
          <div className="p-4 flex items-center justify-center h-40">
            {/* Placeholder for D3 Chart */}
            <div className="text-gray-400">Graph Placeholder</div>
          </div>
        </div>

        {/* Card 2: Total Students */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 shadow-gray-500 hover:shadow-purple-400">
          <h3 className="text-lg font-semibold p-4 border-b border-gray-700">Total Students</h3>
          <p className="text-4xl font-bold text-center p-6">{totalStudents}</p>
        </div>

        {/* Card 3: Total Trainers */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 shadow-gray-500 hover:shadow-purple-400">
          <h3 className="text-lg font-semibold p-4 border-b border-gray-700">Total Trainers</h3>
          <p className="text-4xl font-bold text-center p-6">{totalTrainers}</p>
        </div>

        {/* Card 4: All Courses with custom shadow */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 shadow-gray-500 hover:shadow-purple-400">
          <Link href={"/allcourse"}>
          <h3 className="text-lg font-semibold p-4 border-b border-gray-700">All Courses </h3>
     
        
          <p className="text-4xl font-bold text-center p-6">{activeCourses}↗</p>
          </Link>
        </div>

        {/* Empty Placeholder Cards */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hidden sm:block"></div>
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Dashboard;
