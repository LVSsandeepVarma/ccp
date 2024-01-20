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
    baseUrl: "https://controller.connetz.shop/bdo-api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("staff_auth_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("accept", "Application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["customers", "enquiries", "customerInvoices"],
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
      providesTags: ["enquiries"],
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
      invalidatesTags: ["enquiries"],
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
      invalidatesTags: ["enquiries", "customers"],
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
      invalidatesTags: ["enquiries"],
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
      invalidatesTags: ["enquiries"],
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
      invalidatesTags: ["enquiries"],
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

      refetchOnFocus: true,
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
      providesTags: ["customers", "customerInvoices"],
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
      invalidatesTags: ["customers"],
      middleware: bearerMiddleware,
    }),
    updateProfileAddress: builder.mutation({
      query: ({ data }) => ({
        url: "/customers/update-address",
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
      invalidatesTags: ["customers"],
      middleware: bearerMiddleware,
    }),
    currency: builder.query({
      query: () => ({
        url: `get-currencies`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    products: builder.query({
      query: () => ({
        url: `/customers/products`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/customers/invoices/create",
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
      invalidatesTags: ["customerInvoices"],
      middleware: bearerMiddleware,
    }),
    enquirySearch: builder.query({
      query: (args) => ({
        url: `/enquiries/search?searchkey=${args?.searchkey}&type=${args?.type}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    customersSearch: builder.query({
      query: (args) => ({
        url: `/customers/search?searchkey=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    viewInvoice: builder.query({
      query: (args) => ({
        url: `/customers/invoices/view?id=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    zipInvoice: builder.query({
      query: (data) => ({
        url: `/customers/invoices/zip-invoice?invoice_ids=[${data?.invoice_ids}]`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    downloadInvoice: builder.mutation({
      query: (data) => ({
        url: "/customers/invoices/download",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    sendInvoice: builder.mutation({
      query: (data) => ({
        url: "/customers/invoices/send",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/customers/payments/create",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["customers"],
      middleware: bearerMiddleware,
    }),
    updatePayment: builder.mutation({
      query: (data) => ({
        url: "/customers/payments/update",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["customers"],
      middleware: bearerMiddleware,
    }),
    deletePayment: builder.mutation({
      query: (data) => ({
        url: "/customers/payments/delete",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      invalidatesTags: ["customers"],
      middleware: bearerMiddleware,
    }),
    viewPayments: builder.query({
      query: (data) => ({
        url: `/customers/payments/view?id=${data}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    paymentModes: builder.query({
      query: () => ({
        url: `/get-payment-modes`,
      }),
      onQueryStarted: onQueryStartedErrorToast,
    }),
    createProposal: builder.mutation({
      query: (data) => ({
        url: "/customers/proposals/create",
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
      invalidatesTags: ["customers","customerInvoices"],
      middleware: bearerMiddleware,
    }),
    sendProposal: builder.mutation({
      query: (data) => ({
        url: "/customers/proposals/send",
        method: "POST",
        body: data,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    viewProposal: builder.query({
      query: (args) => ({
        url: `/customers/proposals/view?id=${args}`,
        onSuccess: (res) => {
          console.log("success", res);
        },
        onError: (err) => {
          console.log(err);
        },
      }),
      middleware: bearerMiddleware,
    }),
    downloadProposal: builder.mutation({
      query: (data) => ({
        url: "/customers/proposals/download",
        method: "POST",
        body: data,
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

export const {
  useGetUserInfoQuery,
  useLogoutMutation,
  useEnquiriesQuery,
  useAddEnquiryMutation,
  useLazyEnquiriesPaginationQuery,
  useEditEnquiryMutation,
  useCommentEnquiryMutation,
  useCommentLogsQuery,
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useLazyCustomersPaginationQuery,
  useCustomerDetailsQuery,
  useUpdateProfileMutation,
  useUpdateProfileAddressMutation,
  useCurrencyQuery,
  useProductsQuery,
  useCreateInvoiceMutation,
  useSendInvoiceMutation,
  useLazyEnquirySearchQuery,
  useLazyCustomersSearchQuery,
  useViewInvoiceQuery,
  useLazyZipInvoiceQuery,
  useDownloadInvoiceMutation,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useLazyViewPaymentsQuery,
  useLazyPaymentModesQuery,
  useCreateProposalMutation,
  useSendProposalMutation,
  useViewProposalQuery,
  useDownloadProposalMutation,
} = api;
