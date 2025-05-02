


import axios from "axios";
import { AppDispatch } from "../store"; // Update this path based on your setup
import {
  loadAdminRequest,
  loadAdminSuccess,
  loadAdminFail,
} from "../reducer/admin"; // Actions defined using createAction

const server = "https://chinta-academy-backend-2.onrender.com";

export const loadAdmin = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadAdminRequest());

    const { data } = await axios.get(`${server}/api/admin/getAdmin`, {
      withCredentials: true,
    });

    console.log("Admin data:", data); 

    dispatch(loadAdminSuccess(data?.admin));
  } catch (error: any) {
    dispatch(loadAdminFail(error.response?.data?.message || "Failed to load admin"));
  }
};




