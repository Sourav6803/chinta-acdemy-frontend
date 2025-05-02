'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/redux/hook'
import { loadAdmin } from '@/redux/action/admin'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://chinta-academy-backend-2.onrender.com/api/admin/login', {
        email,
        password
      }, {
        withCredentials: true
      })

      if (res.status === 200) {
        dispatch(loadAdmin())
        toast.success('Login successful!')
        router.push('/admin/goals')
      }
    } catch (error) {
      toast.error('Login failed!')
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/583718438/photo/indian-boy-or-kid-studying-on-study-table.jpg?s=1024x1024&w=is&k=20&c=WTtlbwAtdx_8cH-v_TJ2uHCfK23B4UZsJXotsC2Xehw=')" }}
    >
      <div className="w-full max-w-sm bg-white/10 border border-white/30 backdrop-blur-md rounded-xl px-6 py-8 shadow-2xl text-white">
        <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">Admin Login</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-300 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-200 font-semibold text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
