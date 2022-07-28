// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { PaginationOption } from 'types/query/pagination';
import { UserApi } from 'services/api';

// ----------------------------------------------------------------------

const initialState: any = {
    error: null,
    userKecho: [],
    userKechoMeta: {}
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        //  GET USERS KECHO
        getUsersKechoSuccess(state, action) {
            state.userKecho = action.payload.data;
            state.userKechoMeta = action.payload.meta;
        },
        // GET CURRENT USER ID
        getCurrentUser(state, action) {
            state.currentUser = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

export function getUsersListKecho(pagination: PaginationOption) {
    return async () => {
        try {
            const response = await UserApi.listUser(pagination);
            dispatch(slice.actions.getUsersKechoSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function setCurrentUser() {
    return async () => {
        try {
            const response = await UserApi.currentUser();
            dispatch(slice.actions.getCurrentUser(response.data.data.user));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
