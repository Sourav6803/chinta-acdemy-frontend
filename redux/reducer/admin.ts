import { createAction, createReducer } from "@reduxjs/toolkit";

export const loadAdminRequest = createAction("LoadAdminRequest");
export const loadAdminSuccess = createAction<any>("LoadAdminSuccess"); // Replace `any` with actual Admin type
export const loadAdminFail = createAction<string>("LoadAdminFail");

interface AdminState {
  isLoading: boolean;
  isChecked: boolean;
  isAdmin: boolean;
  admin: any;
  error: string | null;
}

const initialState: AdminState = {
  isLoading: false,
  isChecked: false,
  isAdmin: false,
  admin: null,
  error: null,
};

export const adminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAdminRequest, (state) => {
      state.isLoading = true;
      state.isChecked = false;
    })
    .addCase(loadAdminSuccess, (state, action) => {
      state.isLoading = false;
      state.isAdmin = true;
      state.isChecked = true;
      state.admin = action.payload;
    })
    .addCase(loadAdminFail, (state, action) => {
      state.isLoading = false;
      state.isAdmin = false;
      state.isChecked = true;
      state.error = action.payload;
    });
});
