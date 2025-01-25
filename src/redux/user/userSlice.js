import { createSlice } from '@reduxjs/toolkit'
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage.js'

const initialState = {
    isAuthenticated: loadFromLocalStorage('isAuthenticated', false),
    user: loadFromLocalStorage('user', null),
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            saveToLocalStorage({
                user: action.payload,
                isAuthenticated: true,
            });
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            saveToLocalStorage({
                user: null,
                isAuthenticated: false,
            });
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;