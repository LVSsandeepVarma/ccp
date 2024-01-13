/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bearerMiddleware } from "../middleware";

const onQueryStartedErrorToast = async(args, { queryFulfilled }) => {
  try {
    console.log("inside querystared")
    await queryFulfilled;
  } catch (error) {
    console.log(error?.error?.data?.message, "queryerror");
    if (error?.error?.data?.message == "Unauthenticated.") {
      localStorage.removeItem("staff_auth_token")
      window.location.href = "/session-expired";
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
        url: `/enquiries/by-page-type?type=${arg.type}&page=${arg.no}`,
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
    createCustomer: builder.mutation({
      query: ({ data }) => ({
        url: "/enquiries/convert-to-customer",
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
    commentLogs: builder.query({
      query: (args) => ({
        url: `/enquiries/view-enq?id=${args?.id}&position=${args?.position}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    getCustomers: builder.query({
      query: () => ({
        url: `/customers/get`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    customersPagination: builder.query({
      query: (no) => ({
        url: `/customers/get&page=${no}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    customerDetails: builder.query({
      query: (arg) => ({
        url: `/customers/view?id=${arg?.id}&type=${arg?.type}`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => ({
        url: "/customers/update-profile",
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
    currency: builder.query({
      query: () => ({
        url: `get-currencies`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUserInfoQuery, useLogoutMutation, useEnquiriesQuery, useAddEnquiryMutation, useLazyEnquiriesPaginationQuery, useEditEnquiryMutation, useCommentEnquiryMutation, useCommentLogsQuery, useCreateCustomerMutation, useGetCustomersQuery, useLazyCustomersPaginationQuery, useCustomerDetailsQuery, useUpdateProfileMutation, useCurrencyQuery } = api;
