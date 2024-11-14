"use client";
import React from "react";

type Course = {
  id: number;
  name: string;
  trainer: string;
  timing: string;
  students: string[];
};

const courses: Course[] = [
  {
    id: 1,
    name: "Course 1",
    trainer: "Trainer 1",
    timing: "9:00 PM",
    students: ["a", "b"],
  },
  {
    id: 2,
    name: "Course 2",
    trainer: "Trainer 2",
    timing: "7:00 PM",
    students: ["a", "b"],
  },
  {
    id: 3,
    name: "Course 3",
    trainer: "Trainer 3",
    timing: "7:00 PM",
    students: ["a", "b"],
  },
  {
    id: 4,
    name: "Course 4",
    trainer: "Trainer 4",
    timing: "7:00 PM",
    students: ["a", "b"],
  },
  {
    id: 5,
    name: "Course 5",
    trainer: "Trainer 5",
    timing: "7:00 PM",
    students: ["a", "b"],
  },
  {
    id: 6,
    name: "Course 6",
    trainer: "Trainer 6",
    timing: "7:00 PM",
    students: ["a", "b"],
  },
  {
    id: 7,
    name: "Course 7",
    trainer: "Trainer 7",
    timing: "7:00 PM",
    students: ["a", "b"],
  },
];

const MyCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-backgroud rounded-md z-0">
        {/* Sidebar: Course List */}
        <div className="flex flex-col bg-white shadow-md p-4  rounded-md w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">
            My Courses
          </h2>
          <div className="flex flex-col gap-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`p-4 text-left border rounded-md ${
                  selectedCourse?.id === course.id ? "bg-gray-200" : "bg-white"
                }`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        {selectedCourse && (
          <div className="flex flex-col bg-white shadow-lg p-6 rounded-lg w-full md:w-2/3 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
              {selectedCourse.name}
            </h2>

            {/* Trainer Info */}
            <div className="flex flex-col items-center gap-4 my-6">
              <div className="w-20 h-20 rounded-full bg-red-400 flex items-center justify-center text-white text-2xl font-semibold">
                {/* Trainer Initials as placeholder */}
                <span>{selectedCourse.trainer[0]}</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">{selectedCourse.trainer}</p>
                <p className="text-gray-500">
                  Class Timing: {selectedCourse.timing}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
                Notes
              </button>
              <button className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
                Assignments
              </button>
            </div>

            <button className="mt-4 w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300">
              Join Now
            </button>

            {/* Student List */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Students in this Course:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {selectedCourse.students.map((student, index) => (
                  <li key={index} className="text-gray-800">
                    {student}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;
