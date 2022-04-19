import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6254a05719bc53e23480d678.mockapi.io',
  }),
  tagTypes: ['Contact'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts/contacts',
      providesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: idContact => ({
        url: `/contacts/contacts/${idContact}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: initialContact => ({
        url: `/contacts/contacts`,
        method: 'POST',
        body: initialContact,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} = contactsApi;
