"use client";

import Header from "./component/Header";
import { CoursesPage } from "./component/Course";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loadAdmin } from "@/redux/action/admin";
import { useSelector } from "react-redux";

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, isAdmin, admin } = useSelector(
    (state: any) => state.admin
  );

  useEffect(() => {
    dispatch(loadAdmin());
  }, [dispatch]);
  
  console.log("addd->>", isAdmin);

  return (
    <div>
      <Header />
      <CoursesPage />
    </div>
  );
}
