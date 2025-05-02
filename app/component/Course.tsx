'use client'

import ProtectedAdminRoute from '../route/adminProtectedRoute'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchAllCourses } from '@/redux/action/course';
import { fetchAllGoals } from '@/redux/action/goals';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Course {
  _id: string
  name: string
  goalId: Goal
  // goalName: string
}

interface Goal {
  _id: string
  name: string
}



export const CoursesPage = () => {

  const [showForm, setShowForm] = useState(false)
  const [newCourse, setNewCourse] = useState('')
  const [selectedGoal, setSelectedGoal] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch();
  const {  courses } = useAppSelector((state:any) => state.course);
  const { goals } = useAppSelector((state: any) => state.goal);


  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchAllGoals())
  }, [dispatch]);

  const handleCreateCourse = async () => {
    if (!newCourse.trim() || !selectedGoal) return;
  
    setLoading(true);
  
    try {
      const response = await axios.post('https://chinta-academy-backend-2.onrender.com/api/admin/course', {
        name: newCourse.trim(),
        goalId: selectedGoal,
      }, {withCredentials:true});
  
      if (response.status === 201 || response.status === 200) {
        // Success – now refresh the course list manually
        toast.success("Course created successfully!");
        dispatch(fetchAllCourses());
        setNewCourse('');
        setSelectedGoal('');
        setShowForm(false);
      } else {
        console.error("Unexpected response:", response);
        alert("Failed to create course. Try again.");
      }
    } catch (err: any) {
      console.error("Error creating course:", err);
      toast.error(err?.response?.data?.message || "Course creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedAdminRoute>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Courses</h1>
          <button
            onClick={() => setShowForm(prev => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : 'Create Course'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white border p-4 rounded shadow mb-6">
            <div className="mb-3">
              <label className="block mb-1 text-gray-700 font-medium">Course Name</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Enter course name"
                value={newCourse}
                onChange={e => setNewCourse(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Select Goal</label>
              <select
                className="border p-2 rounded w-full"
                value={selectedGoal}
                onChange={e => setSelectedGoal(e.target.value)}
              >
                <option value="">-- Choose a Goal --</option>
                {goals.map((goal:any) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreateCourse}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.length > 0 && courses?.map((course:Course) => (
            <div
              key={course._id}
              className="bg-white border p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">{course.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Goal: {course?.goalId.name}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedAdminRoute>
  )
}
