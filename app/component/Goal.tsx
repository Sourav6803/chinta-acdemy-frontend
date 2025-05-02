'use client'
import { useEffect, useState } from 'react'
import ProtectedAdminRoute from '../route/adminProtectedRoute'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchAllGoals } from '@/redux/action/goals';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Goal {
  _id: string
  name: string
}

export default function GoalsPage() {
  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState('')
  const [loading, setLoading] = useState(false)
  const { goals } = useAppSelector((state: any) => state.goal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllGoals())
  }, [dispatch]);

  const handleCreateGoal = async () => {
    const trimmedGoal = newGoal.trim()
    if (!trimmedGoal || trimmedGoal.length < 3) {
      toast.error('Goal name must be at least 3 characters')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post('https://chinta-academy-backend-2.onrender.com/api/admin/goal', { name: trimmedGoal }, {withCredentials: true})
      if (response.status === 201 || response.status === 200) {
        toast.success('Goal created successfully')
        dispatch(fetchAllGoals())
        setNewGoal('')
        setShowForm(false)
      } else {
        toast.error('Failed to create goal')
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="px-4 py-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Goals</h1>
          <button
            onClick={() => setShowForm(prev => !prev)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {showForm ? 'Cancel' : 'Create Goal'}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg shadow p-5 mb-6 transition-all">
            <input
              type="text"
              placeholder="Enter goal name"
              className="border border-gray-300 p-2 w-full rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newGoal}
              onChange={e => setNewGoal(e.target.value)}
            />
            <button
              onClick={handleCreateGoal}
              disabled={loading || !newGoal.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Goal'}
            </button>
          </div>
        )}

        {/* Goals Grid */}
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {goals.map((goal: any) => (
              <div
                key={goal._id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200"
              >
                <p className="font-medium text-gray-800">{goal.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No goals created yet.
          </div>
        )}
      </div>
    </ProtectedAdminRoute>
  )
}


















