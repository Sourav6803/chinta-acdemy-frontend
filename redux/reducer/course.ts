import { createAction, createReducer } from "@reduxjs/toolkit";

interface Course {
    _id: string
    name: string
    goalId: string
    goalName: string
  }

// Action creators
export const loadAllCoursesRequest = createAction("allCoursesRequest");
export const loadAllCoursesSuccess = createAction<Course[]>("allCoursesSuccess"); // Replace `any` with a proper Course type
export const loadAllCoursesFail = createAction<string>("allCoursesFail");



// State interface
interface CoursesState {
  isLoading: boolean;
  courses: Course[]; // Replace with Course[] if you have a Course type
  error: string | null;
}

// Initial state
const initialState: CoursesState = {
  isLoading: false,
  courses: [],
  error: null,
};

// Reducer
export const coursesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAllCoursesRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loadAllCoursesSuccess, (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    })
    .addCase(loadAllCoursesFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});

