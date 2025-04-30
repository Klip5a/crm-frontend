import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { clientApi } from "@entities/client";
import clientModalReducer from "@features/clients/model/modalSlice";

const crmRootReducer = combineReducers({
  [clientApi.reducerPath]: clientApi.reducer,
  clientModal: clientModalReducer,
});

export const crmStore = configureStore({
  reducer: crmRootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(clientApi.middleware),
});

export type CrmRootState = ReturnType<typeof crmStore.getState>;
export type CrmAppDispatch = typeof crmStore.dispatch;
