// 'use client'

// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/navigation'
// import { ReactNode, useEffect } from 'react'

// // Define the RootState based on your Redux setup
// interface RootState {
//   admin: {
//     isLoading: boolean;
//     isAdmin: boolean;
//     admin: any; 
//   };
// }

// interface ProtectedAdminRouteProps {
//   children: ReactNode;
// }

// const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
//   const router = useRouter()

//   const { isLoading, isAdmin, admin } = useSelector((state: RootState) => state.admin)

//   // console.log("is loading", isLoading)
//    console.log("is admin", isAdmin)
//   console.log("admin", admin)


//   useEffect(() => {
//     if (!isLoading && !isAdmin) {
//       router.replace('/login')
//     }
//   }, [isLoading, isAdmin, router])

//   if (isLoading) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         {/* <Loader /> */}
//         <p>Loading...</p>
//       </div>
//     )
//   }

//   return <>{children}</>
// }

// export default ProtectedAdminRoute




'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

// Define RootState based on your Redux store
interface RootState {
  admin: {
    isLoading: boolean;
    isChecked: boolean;
    isAdmin: boolean;
    admin: any;
  };
}

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const router = useRouter();

  const { isChecked, isAdmin } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    // Only redirect once check is completed
    if (isChecked && !isAdmin) {
      router.replace('/login');
    }
  }, [isChecked, isAdmin, router]);

  // Show loader while admin check is still running
  if (!isChecked) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;

