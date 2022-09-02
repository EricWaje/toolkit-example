import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [
        {
            id: '1',
            title: 'Post #1',
            body: 'This is the content',
            date: new Date().toISOString(),
            author: 'Eric',
            reactions: {
                good: 0,
                bad: 0,
            },
        },
        {
            id: '2',
            title: 'Post #2',
            body: 'This is the content',
            date: new Date().toISOString(),
            author: 'Eric',
            reactions: {
                good: 4,
                bad: 0,
            },
        },
        {
            id: '3',
            title: 'Post #3',
            body: 'This is the content',
            date: new Date().toISOString(),
            author: 'Eric',
            reactions: {
                good: 1,
                bad: 1,
            },
        },
    ],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
    try {
        const { data } = await axios(URL);
        return data;
    } catch (error) {
        return error;
    }
});

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, { payload }) => {
            return {
                ...state,
                posts: [...state.posts, { ...payload }],
            };
        },
        reactPost: (state, { payload }) => {
            const { name, post } = payload;
            const postReacted = state.posts.find((x) => x.id === post.id);
            if (postReacted) {
                postReacted.reactions[name]++;
            }
        },
        editPost: (state, { payload }) => {
            // const postEdited = state.posts.find((p) => p.id === payload.id);
            // console.log(postEdited);
            const postWithEditOne = state.posts.map((p) =>
                p.id === payload.id
                    ? {
                          ...p,
                          title: payload.title,
                          body: payload.body,
                          date: payload.date,
                          author: payload.author,
                      }
                    : p
            );
            state.posts = postWithEditOne;
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.posts = [];
            state.loading = true;
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            const formattedPosts = action.payload.map((post) => {
                return {
                    ...post,
                    reactions: {
                        good: 0,
                        bad: 0,
                    },
                    date: new Date().toISOString(),
                };
            });
            state.posts = formattedPosts;
            state.loading = false;
            state.error = null;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === Number(postId));

export const allPosts = (state) => state.posts;

export const { addPost, reactPost, editPost } = postsSlice.actions;

export default postsSlice.reducer;
