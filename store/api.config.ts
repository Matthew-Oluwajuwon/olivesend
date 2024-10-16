import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, baseQuery } from "./baseQueryWithReauth";

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
  tagTypes: ["getData"],
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
  }),
});

export const {
  useGetDataQuery,
  useLazyGetDataQuery,
  useMutateDataMutation,
  useGetMutateDataQuery,
} = apiConfig;

export const {
  useGetUnsecureDataQuery,
  useLazyGetUnsecureDataQuery,
  useMutateUnsecureDataMutation,
} = authConfig;
