"use client";

import { useEffect, useMemo, useState } from "react";
import ProtectedAdminRoute from "../route/adminProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllCourses } from "@/redux/action/course";
import { fetchAllGoals } from "@/redux/action/goals";
import axios from "axios";
import toast from "react-hot-toast";

interface Goal {
  _id: string;
  name: string;
}

interface Course {
  _id: string;
  name: string;
  goalId: string;
  goalName: string;
}

interface Topic {
  _id: string;
  name: string;
  courseId: string;
  courseName: string;
  goalName: string;
}

interface Assignment {
  _id: string;
  goalName: string;
  courseName: string;
  topicName: string;
  userId: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
}

export default function AssignPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state: any) => state.course);
  const { goals } = useAppSelector((state: any) => state.goal);

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchAllGoals());
  }, [dispatch]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/all-topics"
        );
        setTopics(response?.data?.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to load topics");
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/users"
        );
        setUsers(response?.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast.error("Failed to load user");
      }
    };
    fetchUsers();
  }, []);

  //   console.log("goals-->", goals)
  console.log("courses-->", courses);
  console.log("topics-->", topics);
  console.log("selected goal-->", selectedGoal);
  console.log("selected course-->", selectedCourse);
  console.log("user->", users);

  const filteredCourses = useMemo(() => {
    return courses.filter((c: Course) => c.goalId._id === selectedGoal);
  }, [courses, selectedGoal]);

  const filteredTopics = useMemo(() => {
    return topics.filter((t: Topic) => t.courseId?._id === selectedCourse);
  }, [topics, selectedCourse]);


const handleAssign = async () => {
    if (!selectedGoal || !selectedCourse || !selectedTopic || !userId.trim()) return;
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:8000/api/admin/assign', {
        userId,
        goalId: selectedGoal,
        courseId: selectedCourse,
        topicId: selectedTopic,
      }, {withCredentials: true});
  
      const topic = topics.find(t => t._id === selectedTopic);
  
      // Optionally update local state to reflect the assignment
      setAssignments(prev => [
        ...prev,
        {
          _id: response?.data?.assignmentId || Date.now().toString(), // assuming backend returns assignmentId
          goalName: topic?.goalName ?? 'Unknown Goal',
          courseName: topic?.courseName ?? 'Unknown Course',
          topicName: topic?.name ?? 'Unknown Topic',
          userId,
        },
      ]);
  
      toast.success('Topic assigned successfully!');
    } catch (error) {
      console.error('Error assigning topic:', error);
      toast.error('Failed to assign topic');
    } finally {
      setSelectedGoal('');
      setSelectedCourse('');
      setSelectedTopic('');
      setUserId('');
      setLoading(false);
    }
  };
  
  return (
    <ProtectedAdminRoute>
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Assign Topic to User
        </h1>

        <div className="bg-white p-4 rounded shadow space-y-4">
          {/* Goal */}
          <div>
            <label className="block mb-1 font-medium">Select Goal</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedGoal}
              onChange={(e) => {
                setSelectedGoal(e.target.value);
                setSelectedCourse("");
                setSelectedTopic("");
              }}
            >
              <option value="">-- Choose Goal --</option>
              {goals.map((goal: Goal) => (
                <option key={goal._id} value={goal._id}>
                  {goal.name}
                </option>
              ))}
            </select>
            {selectedGoal && filteredCourses.length === 0 && (
              <p className="text-sm text-red-500 mt-1">
                No courses found for this goal.
              </p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className="block mb-1 font-medium">Select Course</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedTopic("");
              }}
              disabled={!selectedGoal}
            >
              <option value="">-- Choose Course --</option>
              {filteredCourses.map((course: Course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {selectedCourse && filteredTopics.length === 0 && (
              <p className="text-sm text-red-500 mt-1">
                No topics found for this course.
              </p>
            )}
          </div>

          {/* Topic */}
          <div>
            <label className="block mb-1 font-medium">Select Topic</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              disabled={!selectedCourse}
            >
              <option value="">-- Choose Topic --</option>
              {filteredTopics.map((topic: Topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          {/* User */}
          
          <div>
            <label className="block mb-1 font-medium">Select User</label>
            <select
              className="w-full border p-2 rounded"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">-- Choose User --</option>
              {users.map((user: User) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Assigning..." : "Assign Topic"}
          </button>
        </div>

        {/* Assignment list */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Assignments
          </h2>
          <ul className="space-y-2">
            {assignments.map((ass) => (
              <li
                key={ass._id}
                className="bg-white p-3 rounded border shadow-sm"
              >
                
                <p className="text-sm text-gray-700">
                
                  <span className="font-semibold">{ass.topicName}</span> →
                  <span className="text-gray-600">
                    {" "}
                    {ass.courseName} / {ass.goalName}
                  </span>{" "}
                  → Assigned to:{" "}
                  <span className="text-blue-600">{ass.userId}</span>
                </p>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
