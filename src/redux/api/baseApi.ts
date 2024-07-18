import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes:["Category","Product"],
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
    }),
    getProduct : builder.query({
      query:()=>({
        url:`/product/products`,
        method:"GET"
      }),
      providesTags:["Product"]
    }),
    addProduct:builder.mutation({
      query:(product)=>{
        return{
          url:`/product/products`,
          method:"POST",
          body:product
        }
      },
      invalidatesTags:["Product"]
    }),
  }),
});

export const { useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetProductQuery, useAddProductMutation } = baseApi;
