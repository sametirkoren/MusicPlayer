import {createSlice} from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: true,
    },
    reducers: {
        ShowLoading: (state) => {
            state.loading = true;
        },
        HideLoading: (state) => {
          state.loading = false;
        }
    }
});

export const { ShowLoading, HideLoading } = alertsSlice.actions;