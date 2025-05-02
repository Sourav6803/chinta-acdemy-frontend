
// 'use client'
// // components/Header.tsx
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useAppDispatch, useAppSelector } from "@/redux/hook";

// // import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';

// const Header = () => {
//   const router = useRouter()
  

//   const { isLoading, isAdmin, admin } = useSelector((state: any) => state.admin)

 

//   if (!isAdmin) return null



//   return (
//     <header className="bg-gray-800 text-white p-4 flex gap-4  items-center justify-between">
//       <div className='p-4 flex gap-4'>
//       <Link href="/admin/goals">Goals</Link>
//       <Link href="/admin/course">Courses</Link>
//       <Link href="/admin/topic">Topics</Link>
//       <Link href="/admin/assign">Assign</Link>
//       </div>
//       <div>
//         <Link href={'/login'} className='text-white '>Login</Link>
//       </div>
//     </header>
//   )
// }

// export default Header




'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
// import { logoutAdmin } from '@/redux/reducer/adminSlice'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Goals', href: '/admin/goals' },
  { label: 'Courses', href: '/admin/course' },
  { label: 'Topics', href: '/admin/topic' },
  { label: 'Assign', href: '/admin/assign' },
]

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()


  return (
    <>
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu (Mobile only) */}
              <button
                className="md:hidden focus:outline-none"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
              <div className="text-xl font-bold">Admin Panel</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm transition-colors hover:text-blue-400 ${
                    pathname === href ? 'text-blue-400 font-semibold' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <button
             
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Mobile only) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Content */}
          <div className="relative w-64 bg-gray-900 text-white p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <nav className="space-y-3">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`block text-sm transition-colors hover:text-blue-400 ${
                    pathname === href ? 'text-blue-400 font-semibold' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Header

