import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (payload: { name: string, email: string, password: string }) => {
                return {
                    url: '/auth/signup',
                    method: 'post',
                    body : payload
                }
            }
        }),
        login: builder.mutation({
            query: (payload: { email: string, password: string }) => {
                return {
                    url: '/auth/login',
                    method: 'post',
                    body: payload
                }
            }
        }),
        me: builder.query({
            query: (token: string) => ({
                url: "/auth/me",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })
})

export const { useSignupMutation, useLoginMutation, useMeQuery } = authApi;