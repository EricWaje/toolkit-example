import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users: [],
    loading: true,
    error: null,
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    try {
        const { data } = await axios(URL);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            (state.users = []), (state.loading = true), (state.error = null);
        },
        [getUsers.fulfilled]: (state, action) => {
            (state.users = action.payload),
                (state.loading = false),
                (state.error = null);
        },
        [getUsers.rejected]: (state) => {
            (state.users = []), (state.loading = false), (state.error = true);
        },
    },
});

export const allUsers = (state) => state.users;

export const {} = usersSlice.actions;

export default usersSlice.reducer;
