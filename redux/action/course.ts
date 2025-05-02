import axios from 'axios';
import {
  loadAllCoursesRequest,
  loadAllCoursesSuccess,
  loadAllCoursesFail,
} from '../reducer/course'; // Adjust path
import { AppDispatch } from '../store';

const server = "https://chinta-academy-backend-2.onrender.com";

export const fetchAllCourses = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadAllCoursesRequest());
    const { data } = await axios.get(`${server}/api/admin/all-courses`);
    
    dispatch(loadAllCoursesSuccess(data)); // adjust based on actual API
  } catch (error: any) {
    dispatch(loadAllCoursesFail(error.response?.data?.message || error.message));
  }
};


