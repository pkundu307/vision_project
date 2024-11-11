"use client"
import React from 'react';

type Course = {
  id: number;
  name: string;
  trainer: string;
  timing: string;
};

const courses: Course[] = [
  { id: 1, name: 'Course 1', trainer: 'Trainer 1', timing: '9:00 PM' },
  { id: 2, name: 'Course 2', trainer: 'Trainer 2', timing: '7:00 PM' },
  { id: 3, name: 'Course 3', trainer: 'Trainer 3', timing: '7:00 PM' },
  { id: 4, name: 'Course 4', trainer: 'Trainer 4', timing: '7:00 PM' },
  { id: 5, name: 'Course 5', trainer: 'Trainer 5', timing: '7:00 PM' },
  { id: 6, name: 'Course 6', trainer: 'Trainer 6', timing: '7:00 PM' },
  { id: 7, name: 'Course 7', trainer: 'Trainer 7', timing: '7:00 PM' },

];

const MyCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  return (
    <>
    <br />
    <br /><br /><br />
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-backgroud rounded-md">
      {/* Sidebar: Course List */}
      <div className="flex flex-col bg-white shadow-md p-4  rounded-md w-full md:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-yellow-900">My Courses</h2>
        <div className="flex flex-col gap-2">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className={`p-4 text-left border rounded-md ${
                selectedCourse?.id === course.id ? 'bg-gray-200' : 'bg-white'
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      {selectedCourse && (
        <div className="flex flex-col bg-white shadow-md p-4 rounded-md w-full md:w-2/3">
          <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
          <div className="flex items-center gap-4 my-4">
            <div className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center text-white">
              {/* Placeholder for trainer avatar */}
              <span className="text-2xl font-semibold">{selectedCourse.trainer[0]}</span>
            </div>
            <div>
              <p className="text-lg font-medium">{selectedCourse.trainer}</p>
              <p className="text-gray-500">Class timing: {selectedCourse.timing}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-500 text-white p-2 rounded-md">Notes</button>
            <button className="flex-1 bg-blue-500 text-white p-2 rounded-md">Assignments</button>
          </div>
          <button className="mt-4 w-full bg-green-500 text-white p-3 rounded-md">
            Join Now
          </button>
        </div>
      )}
    </div>
    </>

  );
};

export default MyCourses;
