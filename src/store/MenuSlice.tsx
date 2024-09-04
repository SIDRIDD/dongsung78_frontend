import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    selectedMenuKey: string;
    selectedItemId: number;
}

const initialState: MenuState = {
    selectedMenuKey: '',
    selectedItemId: 1,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setSelectedMenuKey: (state, action: PayloadAction<string>) => {
            state.selectedMenuKey = action.payload;
        },
        setSelectedItemId: (state, action: PayloadAction<number>) => {
            state.selectedItemId = action.payload;
        },
    },
});

export const { setSelectedMenuKey, setSelectedItemId } = menuSlice.actions;

export default menuSlice.reducer;
