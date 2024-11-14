"use client"
import React from 'react';

const AllCourses = () => {
  // Dummy array of course objects
  const courses = [
    { name: "Generative AI" },
    { name: "Full Stack Development" },
    { name: "Data Science" },
    { name: "Machine Learning" },
    { name: "Cybersecurity" },
    { name: "Web Development" },
    { name: "Mobile App Development" },
    { name: "Cloud Computing" },
    { name: "Blockchain" },
    { name: "Data Engineering" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
   
      <div className="w-full max-w-3xl mb-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 shadow-gray-500 hover:shadow-purple-400 p-8 flex items-center justify-center text-2xl font-bold">
          <span className="text-4xl mr-4">+</span>
          <span>Add New Course</span>
        </div>
      </div>

 <h2 className="text-3xl font-semibold text-center mb-8 text-white shadow-sm shadow-purple-400 rounded-lg p-8">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 shadow-gray-500 hover:shadow-purple-400 p-6 text-center"
          >
            <h3 className="text-xl font-semibold">{course.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
