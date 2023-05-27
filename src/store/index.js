import { configureStore } from '@reduxjs/toolkit'
import ApiReducer from '../store/storeslices'
export const store = configureStore({
  reducer: {
    apidata: ApiReducer,
  },
})