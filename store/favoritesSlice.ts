import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    products: number[];
}

const initialState: FavoritesState = {
    products: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const index = state.products.indexOf(action.payload);
            if (index === -1) {
                state.products.push(action.payload);
            } else {
                state.products.splice(index, 1);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer; 