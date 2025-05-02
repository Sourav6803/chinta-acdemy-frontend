import { createAction, createReducer } from "@reduxjs/toolkit";

// Define Goal interface
export interface Goal {
  _id: string;
  name: string;
}

// Action creators with proper typing
export const loadAllGoalsRequest = createAction("allGoalsRequest");
export const loadAllGoalsSuccess = createAction<Goal[]>("allGoalsSuccess");
export const loadAllGoalsFail = createAction<string>("allGoalsFail");

// Define state interface
interface GoalsState {
  isLoading: boolean;
  goals: Goal[];
  error: string | null;
}

// Initial state
const initialState: GoalsState = {
  isLoading: false,
  goals: [],
  error: null,
};

// Reducer
export const goalsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAllGoalsRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loadAllGoalsSuccess, (state, action) => {
      state.isLoading = false;
      state.goals = action.payload;
    })
    .addCase(loadAllGoalsFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
