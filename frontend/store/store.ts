// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/userApi";
import { blogsApi } from "@/services/blogsApi";





const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,





  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      blogsApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production", // ✅ enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
