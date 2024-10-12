import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { themeReducer } from "./slice/theme";

const reducer = combineReducers({
  theme: themeReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat();
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
