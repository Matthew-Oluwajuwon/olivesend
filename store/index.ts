import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth.slice";
import { apiConfig, authConfig } from "./api.config";

const reducer = combineReducers({
  auth: authReducer,
  [authConfig.reducerPath]: authConfig.reducer,
  [apiConfig.reducerPath]: apiConfig.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authConfig.middleware, apiConfig.middleware);
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
