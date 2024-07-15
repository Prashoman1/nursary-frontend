import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes:["Category"],
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `/category/categories`,
        method: "GET",
      }),
      providesTags:["Category"]
    }),
    addCategory: builder.mutation({
      query:(category)=>{
        console.log("redus api category",category);
        
        return{
          url:`/category/categories`,
          method:"POST",
          body:category
        }
      },
      invalidatesTags:["Category"]
    }),

    updateCategory:builder.mutation({
      query:(category)=>{
        const id = category.id;
        const categoryInfo = {
          categoryName:category.categoryName
        };
        // console.log("categoryInfo id",categoryInfo,":",id);
        
        
        return{
          url:`/category/categories/${id}`,
          method:"PUT",
          body:categoryInfo
        }
      },
      invalidatesTags:["Category"]
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["Category"]
    })
  }),
});

export const { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = baseApi;
