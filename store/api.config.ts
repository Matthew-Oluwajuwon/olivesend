import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, baseQuery } from "./baseQueryWithReauth";
import { endpoints } from "./endpoints";
import { API, Transaction } from "@/models/client/response";

export const authConfig = createApi({
  reducerPath: "authConfig",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  }),
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    getUnsecureData: builder.query({
      query: (state: any) => ({
        url: state.getUrl,
        headers: state.headers || undefined,
      }),
    }),
    mutateUnsecureData: builder.mutation({
      query: (state: any) => ({
        url: state.postUrl,
        method: state.formMethod,
        body: state.request,
        headers: state.headers || undefined,
      }),
    }),
  }),
});

export const apiConfig = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: ["getData", "Transactions"],
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    getData: builder.query<any, { getUrl: string }>({
      query: (state) => ({
        url: state.getUrl,
      }),
      transformResponse: (response: any, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getMutateData: builder.query<any, { getUrl: string }>({
      query: (state) => ({
        url: state.getUrl,
      }),
      transformResponse: (response: any, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["getData"],
    }),
    mutateData: builder.mutation<any, any>({
      query: (state: any) => ({
        url: state.postUrl,
        method: state.formMethod,
        body: state.request,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "getData", id: arg.id }],
    }),
    getTransactions: builder.query<API<Transaction>, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `${endpoints.transaction.getTransactions}?page=${page}&limit=${limit}`,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-page:${queryArgs.page}-limit:${queryArgs.limit}`,
      merge: (currentCache, newItems, { arg: { page } }) => {
        if (page === 1) {
          // Replace the cache data when on the first page
          currentCache.data.transactions = [...newItems.data.transactions];
        } else {
          // Append to the existing cache when on other pages
          currentCache.data.transactions.push(...newItems.data.transactions);
        }
      },
      transformResponse: (response: API<Transaction>, meta, arg) => {
        // Return response with transactions and additional page info
        return {
          data: response.data,
          total: response.data.total,
          responseCode: response.responseCode,
          responseMessage: response.responseMessage,
          message: "",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.transactions?.map((transaction) => ({
                type: "Transactions" as const,
                id: transaction.id,
              })),
              "Transactions",
            ]
          : ["Transactions"],
    }),
  }),
});

export const {
  useGetDataQuery,
  useLazyGetDataQuery,
  useMutateDataMutation,
  useGetMutateDataQuery,
  useGetTransactionsQuery,
} = apiConfig;

export const {
  useGetUnsecureDataQuery,
  useLazyGetUnsecureDataQuery,
  useMutateUnsecureDataMutation,
} = authConfig;
