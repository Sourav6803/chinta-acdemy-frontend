import { configureStore } from '@reduxjs/toolkit'

import {adminReducer} from "./reducer/admin"
import {coursesReducer} from "./reducer/course"
import {goalsReducer} from "./reducer/goal"

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        goal: goalsReducer,
        course: coursesReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch