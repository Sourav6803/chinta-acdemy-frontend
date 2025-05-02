'use client'
import { useEffect, useState } from 'react'
import ProtectedAdminRoute from '../route/adminProtectedRoute'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchAllCourses } from '@/redux/action/course';
import { fetchAllGoals } from '@/redux/action/goals';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Goal {
  _id: string
  name: string
}

interface Course {
  _id: string
  name: string
  goalId: Goal
  goalName: string
}

interface Topic {
  _id: string
  name: string
  courseId: Course
  courseName: string
  goalName: string
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([])
//   const [courses, setCourses] = useState<Course[]>([])
//   const [goals, setGoals] = useState<Goal[]>([])
  const [newTopic, setNewTopic] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch();
  const { isLoading, courses, error } = useAppSelector((state:any) => state.course);
  const { goals } = useAppSelector((state: any) => state.goal);


  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchAllGoals())
  }, [dispatch])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/all-topics')
        setTopics(response?.data?.data)
      } catch (error: any) {
        console.error('Error fetching topics:', error)
        toast.error('Failed to load topics')
      }
    }
  
    fetchTopics()
  }, [])

  console.log('topics--->', topics)


const handleCreateTopic = async () => {
    if (!newTopic.trim() || !selectedCourse) {
      toast.error('Topic name and course are required');
      return;
    }
  
    setLoading(true);
  
    try {
      const course = courses.find((c: Course) => c._id === selectedCourse);
      const goal = goals.find((g: Goal) => g._id === course?.goalId);
  
      const payload = {
        name: newTopic.trim(),
        courseId: selectedCourse,
        goalId: course?.goalId,
      };
  
      const response = await axios.post('http://localhost:8000/api/admin/topic', payload, {withCredentials: true});
  
      const newTopicObj = {
        _id: response.data?.data?._id ?? Date.now().toString(),
        name: response.data?.data?.name ?? newTopic.trim(),
        courseId: selectedCourse,
        courseName: course?.name ?? 'Unknown Course',
        goalName: goal?.name ?? 'Unknown Goal',
      };
  
      setTopics(prev => [...prev, newTopicObj]);
      toast.success('Topic created successfully');
      setNewTopic('');
      setSelectedCourse('');
      setShowForm(false);
    } catch (error: any) {
      console.error('Error creating topic:', error);
      toast.error(error?.response?.data?.message || 'Failed to create topic');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ProtectedAdminRoute>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Topics</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showForm ? 'Cancel' : 'Create Topic'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white border p-4 rounded shadow mb-6">
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 font-medium">Topic Name</label>
              <input
                type="text"
                className="border p-2 w-full rounded"
                placeholder="Enter topic name"
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-medium">Select Course</label>
              <select
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="">-- Choose a Course --</option>
                {courses.map((course:Course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.goalId.name})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCreateTopic}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Creating...' : 'Create Topic'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topics.map(topic => (
            <div
              key={topic._id}
              className="bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">{topic.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Course: {topic?.courseId?.name}</p>
              {/* <p className="text-sm text-gray-500">Goal: {topic.goalName}</p> */}
            </div>
          ))}
        </div>
      </div>
    </ProtectedAdminRoute>
  )
}























// 'use client'
// import { useEffect, useState } from 'react'
// import ProtectedAdminRoute from '../route/adminProtectedRoute'


// interface Goal {
//   _id: string
//   name: string
// }

// interface Course {
//   _id: string
//   name: string
//   goalId: string
//   goalName: string
// }

// interface Topic {
//   _id: string
//   name: string
//   courseId: string
//   courseName: string
//   goalName: string
// }

// export default function TopicsPage() {
//   const [topics, setTopics] = useState<Topic[]>([])
//   const [courses, setCourses] = useState<Course[]>([])
//   const [goals, setGoals] = useState<Goal[]>([])
//   const [newTopic, setNewTopic] = useState('')
//   const [selectedCourse, setSelectedCourse] = useState('')
//   const [showForm, setShowForm] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     // Mock data (replace with real API calls)
//     const fetchedGoals: Goal[] = [
//       { _id: '1', name: 'Learn Coding' },
//       { _id: '2', name: 'AI Journey' },
//     ]

//     const fetchedCourses: Course[] = [
//       { _id: '11', name: 'Frontend Fun', goalId: '1', goalName: 'Learn Coding' },
//       { _id: '22', name: 'ML Basics', goalId: '2', goalName: 'AI Journey' },
//     ]

//     const fetchedTopics: Topic[] = [
//       {
//         _id: '101',
//         name: 'CSS Basics',
//         courseId: '11',
//         courseName: 'Frontend Fun',
//         goalName: 'Learn Coding',
//       },
//       {
//         _id: '102',
//         name: 'Intro to ML',
//         courseId: '22',
//         courseName: 'ML Basics',
//         goalName: 'AI Journey',
//       },
//     ]

//     setGoals(fetchedGoals)
//     setCourses(fetchedCourses)
//     setTopics(fetchedTopics)
//   }, [])

//   const handleCreateTopic = () => {
//     if (!newTopic.trim() || !selectedCourse) return
//     setLoading(true)

//     setTimeout(() => {
//       const course = courses.find(c => c._id === selectedCourse)
//       setTopics(prev => [
//         ...prev,
//         {
//           _id: Date.now().toString(),
//           name: newTopic,
//           courseId: selectedCourse,
//           courseName: course?.name ?? 'Unknown',
//           goalName:
//             goals.find(g => g._id === course?.goalId)?.name ?? 'Unknown Goal',
//         },
//       ])
//       setNewTopic('')
//       setSelectedCourse('')
//       setShowForm(false)
//       setLoading(false)
//     }, 500)
//   }

//   return (
//     <ProtectedAdminRoute>
//       <div className="p-4 max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">All Topics</h1>
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             {showForm ? 'Cancel' : 'Create Topic'}
//           </button>
//         </div>

//         {showForm && (
//           <div className="bg-white border p-4 rounded shadow mb-6">
//             <div className="mb-3">
//               <label className="block text-gray-700 mb-1 font-medium">Topic Name</label>
//               <input
//                 type="text"
//                 className="border p-2 w-full rounded"
//                 placeholder="Enter topic name"
//                 value={newTopic}
//                 onChange={e => setNewTopic(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1 font-medium">Select Course</label>
//               <select
//                 value={selectedCourse}
//                 onChange={e => setSelectedCourse(e.target.value)}
//                 className="border p-2 w-full rounded"
//               >
//                 <option value="">-- Choose a Course --</option>
//                 {courses.map(course => (
//                   <option key={course._id} value={course._id}>
//                     {course.name} ({course.goalName})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleCreateTopic}
//               disabled={loading}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               {loading ? 'Creating...' : 'Create Topic'}
//             </button>
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {topics.map(topic => (
//             <div
//               key={topic._id}
//               className="bg-white p-4 rounded shadow hover:shadow-md transition"
//             >
//               <h2 className="text-lg font-semibold text-gray-800">{topic.name}</h2>
//               <p className="text-sm text-gray-500 mt-1">Course: {topic.courseName}</p>
//               <p className="text-sm text-gray-500">Goal: {topic.goalName}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </ProtectedAdminRoute>
//   )
// }

