/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bearerMiddleware } from "../middleware";

const onQueryStartedErrorToast = async(args, { queryFulfilled }) => {
  try {
    console.log("inside querystared")
    await queryFulfilled;
  } catch (error) {
    console.log(error, "queryerror")
    if (error?.error?.status == 401) {
      window.location.href="/session-expired"
    }
    // handle error here, dispatch toast message
  }
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://controller.callcentreproject.com/bdo-api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("staff_auth_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("accept", "Application/json");
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => "/get-user-info",
      providesTags: ["get-user-info"],
      onQueryStarted: onQueryStartedErrorToast,
      staleTime: 3 * 60 * 1000,
      middleware: bearerMiddleware,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    enquiries: builder.query({
      query: (type) => ({
        url: `/enquiries/by-page-type?type=${type}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    enquiriesPagination: builder.query({
      query: (arg) => ({
        url: `/enquiries/by-page-type?type=${arg}&page=${
          arg}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    addEnquiry: builder.mutation({
      query: ({ data }) => ({
        url: "/enquiries/add-enq",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    editEnquiry: builder.mutation({
      query: ({ data }) => ({
        url: "/enquiries/update-and-move",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    commentEnquiry: builder.mutation({
      query: ({ data }) => ({
        url: "/enquiries/move-enq",
        method: "POST",
        body: data,
        formData: true,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUserInfoQuery, useLogoutMutation, useEnquiriesQuery, useAddEnquiryMutation, useLazyEnquiriesPaginationQuery, useEditEnquiryMutation, useCommentEnquiryMutation } = api;
