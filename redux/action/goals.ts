import axios from "axios";
import {
  loadAllGoalsRequest,
  loadAllGoalsSuccess,
  loadAllGoalsFail,
} from "../reducer/goal"; // adjust the path as needed
import { AppDispatch } from "../store"; // adjust based on your structure
// import { loadAllGoalsRequest } from "../reducer/goal";

const server = "https://chinta-academy-backend-2.onrender.com"; // or your actual server URL

export const fetchAllGoals = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadAllGoalsRequest());

    const { data } = await axios.get(`${server}/api/admin/goal`, {
      withCredentials: true,
    });

   

    dispatch(loadAllGoalsSuccess(data.data)); // assuming your response has `goals` key
  } catch (error: any) {
    dispatch(
      loadAllGoalsFail(error.response?.data?.message || "Failed to load goals")
    );
  }
};
