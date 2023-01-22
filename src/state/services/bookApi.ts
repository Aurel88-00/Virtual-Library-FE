import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${localStorage.getItem('authorization')}`)

        return headers;
    }
})

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchBooks: builder.query({
            query: () => "/books",
            providesTags: ['Books']
        }),
        fetchBookById: builder.query({
            query: (id: string) => `/books/${id}`
        }),
        createBook: builder.mutation({
            query: (payload: { name: string, author: string, year: number, description: string }) => ({
                url: "/books",
                method: "post",
                body: payload
            }),
            invalidatesTags: ["Books"]
        }),
        updateBookById: builder.mutation({
            query: (payload: { id: string, body: { name: string, author: string, year: number, description: string } }) => ({
                url: `/books/${payload.id}`,
                method: "put",
                body: payload.body
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBookById: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "delete"
            }),
            invalidatesTags: ['Books']
        }),
    })
})

export const { useFetchBookByIdQuery, useFetchBooksQuery, useCreateBookMutation, useUpdateBookByIdMutation, useDeleteBookByIdMutation } = bookApi;