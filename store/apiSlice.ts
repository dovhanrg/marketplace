import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '@/constants/strings';

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    image: string;
    lastName: string;
    refreshToken: string;
    username: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
}

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ['Product', 'Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        getProducts: builder.query<ProductsResponse, { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/products?skip=${skip}&limit=${limit}`,
            providesTags: ['Product'],
        }),
        getProduct: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetProductsQuery,
    useGetProductQuery
} = apiSlice; 