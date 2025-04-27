import { apiUrl } from '@/constants/strings';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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

interface ProductsResponseWithAdapter {
    products: EntityState<Product, number>;
    total: number;
    skip: number;
    limit: number;
}

const productEntityAdapter = createEntityAdapter<Product>();
const productEntitySelectors = productEntityAdapter.getSelectors();

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
        getProducts: builder.query<ProductsResponseWithAdapter, { skip: number; limit: number }>({
            query: ({ skip, limit }) => `/products?skip=${skip}&limit=${limit}`,
            transformResponse: (responseData: ProductsResponse) => {
                return {
                    ...responseData,
                    products: productEntityAdapter.setMany(
                        productEntityAdapter.getInitialState(),
                        responseData.products
                    ),
                };
            },
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge(currentCacheData, responseData) {
                productEntityAdapter.addMany(
                    currentCacheData.products, productEntitySelectors.selectAll(responseData.products),
                );
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.skip !== previousArg?.skip;
            },
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
    useGetProductQuery,
} = apiSlice;

export {
    productEntityAdapter,
    productEntitySelectors
};
