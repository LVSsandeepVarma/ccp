/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'YOUR_BASE_URL_HERE', // Add your base URL
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
        query: () => '/get-user-info',
    })
    // Define your endpoints here using builder
  }),
});

export const { useGetUserInfoQuery } = api; 

export default api;
