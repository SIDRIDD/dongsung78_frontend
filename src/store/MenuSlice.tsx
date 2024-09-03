import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    selectedMenuKey: string;
}

const initialState: MenuState = {
    selectedMenuKey: '',
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setSelectedMenuKey: (state, action: PayloadAction<string>) => {
            state.selectedMenuKey = action.payload;
        },
    },
});

export const { setSelectedMenuKey } = menuSlice.actions;

export default menuSlice.reducer;
