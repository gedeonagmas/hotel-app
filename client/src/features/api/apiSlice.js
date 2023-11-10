import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hotel-app-server.vercel.app/hotel/app/v1",
  }),
  tagTypes: [
    "profile-info",
    "my-data",
    "factory",
    "get-all-user",
    "transactions",
    "hotels",
    "hotels-users-transactions",
    "all-groups",
    "all-users",
    "users",
    "rate",
    "rate-multiple",
  ],
  endpoints: (builder) => ({
    //signup
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-user"],
    }),

    //login
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "get-all-users",
        "profile-info",
        "get-all-user",
        "my-data",
      ],
    }),

    //forget password
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/forgetPassword",
        method: "POST",
        body: data,
      }),
    }),

    //reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/resetPassword?resetToken=${data.resetToken}`,
        method: "POST",
        body: data,
      }),
    }),

    //read profile info
    readProfileInfo: builder.query({
      query: () => ({
        url: "/readProfileInfo",
        method: "GET",
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      providesTags: ["profile-info"],
    }),

    readMyData: builder.query({
      query: (arg) => ({
        url: `/readMyData?id=${arg.id}`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      providesTags: ["my-data"],
    }),

    updateProfileInfo: builder.mutation({
      query: (data) => ({
        url: `/updateProfileInfo?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["profile-info"],
    }),

    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: `/updateProfilePicture?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["profile-info"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/changePassword?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["profile-info"],
    }),

    //create gallery
    createHotels: builder.mutation({
      query: (data) => ({
        url: `/hotels`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
          // "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["hotels"],
    }),

    //read gallery
    updateFactory: builder.mutation({
      query: (data) => ({
        url:
          data.type === "hotels"
            ? `/hotels?id=${data.id}`
            : data.type === "users"
            ? `/users?id=${data.id}`
            : null,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: [
        "factory",
        "hotels",
        "users",
        "hotels-users-transactions",
      ],
    }),

    //read trainer
    readHotels: builder.query({
      query: (arg) => ({
        url:
          arg.type === "single"
            ? `/hotels?_id[eq]=${arg.id}`
            : `/hotels?sort=-totalRating`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      providesTags: ["hotels"],
    }),

    //get all users
    getAllUser: builder.query({
      query: () => ({
        url: "/getAllUsers",
        method: "GET",
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      providesTags: ["get-all-user"],
    }),

    //create transaction
    createTransactions: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["transactions", "hotels-users-transactions"],
    }),

    //read transaction
    readTransactions: builder.query({
      query: () => ({
        url: "/transactions",
        method: "GET",
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      providesTags: ["transactions"],
    }),

    //delete transaction
    deleteTransactions: builder.mutation({
      query: (data) => ({
        url: `/transactions?id=${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["transactions", "hotels-users-transactions"],
    }),

    //create rate
    createRate: builder.mutation({
      query: (data) => ({
        url: `/rate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["hotels", "rate", "rate-multiple"],
    }),

    //create rate
    readRate: builder.query({
      query: (arg) => ({
        url: `/rate?id=${arg.id}`,
        method: "GET",
      }),
      providesTags: ["rate", "rate-multiple"],
    }),

    //read rate multiple
    readMultipleRate: builder.query({
      query: () => ({
        url: `/rateMultiple`,
        method: "GET",
      }),
      providesTags: ["rate-multiple"],
    }),

    //delete rate
    deleteRate: builder.mutation({
      query: (data) => ({
        url: `/rate?id=${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["rate", "hotels", "rate-multiple"],
    }),

    //send email
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/sendEmail",
        method: "POST",
        body: data,
      }),
      providesTags: ["send-email"],
    }),

    //read class-users-transaction
    readHotelsUsersTransactions: builder.query({
      query: (arg) => ({
        url: `/hotels-users-transactions`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("hotel-jwt-data-gedeon"),
        },
      }),
      providesTags: ["hotels-users-transactions", "hotels"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useReadProfileInfoQuery,
  useReadMyDataQuery,
  useUpdateProfileInfoMutation,
  useUpdateProfilePictureMutation,
  useChangePasswordMutation,

  useUpdateFactoryMutation,
  useGetAllUserQuery,
  useSendEmailMutation,
  useCreateHotelsMutation,
  useReadHotelsQuery,
  useReadHotelsUsersTransactionsQuery,

  useCreateTransactionsMutation,
  useReadTransactionsQuery,
  useDeleteTransactionsMutation,

  useCreateRateMutation,
  useReadRateQuery,
  useReadMultipleRateQuery,
  useDeleteRateMutation,
} = apiSlice;
