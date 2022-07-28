// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
// import centreApi from 'utils/api/centreApi';
// import { DEFAULT_PAGINATION } from 'config';
import { PaginationOption } from 'types/query/pagination';
// import axiosAuthClient from 'utils/axios/axiosAuthClient';
import staffApi from 'services/api/staffApi';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['staffKecho'] = {
    staffKecho: [
        // {
        //     id: 2,
        //     role: 'role',
        //     name: 'name',
        //     email: 'email',
        //     diploma: 'diploma'
        // }
    ],
    staffKechoDetails: {},
    staffKechoMeta: {},
    error: null
};

const slice = createSlice({
    name: 'staffKecho',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CENTRE LIST

        getStaffList(state, action) {
            const { data, meta } = action.payload;
            if (data && meta) {
                state.staffKecho = data;
                state.staffKechoMeta = meta;
            }
        },

        // GET CENTRE DETAILS

        getStaffDetails(state, action) {
            state.staffKechoDetails = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getStaffKecho(pagination: PaginationOption) {
    return async () => {
        try {
            const response = await staffApi.list(pagination);
            dispatch(slice.actions.getStaffList(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getStaffDetailById(id: string) {
    return async () => {
        try {
            const response = await staffApi.getDetailsById(id);
            dispatch(slice.actions.getStaffDetails(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
