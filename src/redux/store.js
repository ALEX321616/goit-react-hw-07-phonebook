import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from 'components/ApiService/ContactApi';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
