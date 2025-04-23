import { configureStore } from "@reduxjs/toolkit";

import clientModalReducer from "@features/clients/model/slice/modalSlice";

export const store = configureStore({
  reducer: { clientModal: clientModalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
