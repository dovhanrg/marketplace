import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './apiSlice';

interface ProductsState {
    items: Product[];
    total: number;
    skip: number;
    limit: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    total: 0,
    skip: 0,
    limit: 10,
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<{ products: Product[]; total: number; skip: number; limit: number }>) => {
            state.items = [...state.items, ...action.payload.products];
            state.total = action.payload.total;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        resetProducts: (state) => {
            state.items = [];
            state.skip = 0;
        },
    },
});

export const { setProducts, setLoading, setError, resetProducts } = productsSlice.actions;
export default productsSlice.reducer; 