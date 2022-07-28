// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import centreApi from 'services/api/centreApi';
// import { DEFAULT_PAGINATION } from 'config';
import { PaginationOption } from 'types/query/pagination';
// import axiosAuthClient from 'utils/axios/axiosAuthClient';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['centreKecho'] = {
    centreKecho: [],
    centreKechoMeta: {},
    centreKechoDetails: {},
    error: null
};

const slice = createSlice({
    name: 'centreKecho',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CENTRE LIST

        getCentreList(state, action) {
            const { data, meta } = action.payload;
            if (data && meta) {
                state.centreKecho = data;
                state.centreKechoMeta = meta;
            }
        },

        // GET CENTRE DETAILS

        getCentreDetails(state, action) {
            state.centreKechoDetails = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCentreKecho(pagination: PaginationOption) {
    return async () => {
        try {
            const response = await centreApi.listCentre(pagination);
            dispatch(slice.actions.getCentreList(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCentreDetailById(id: string) {
    return async () => {
        try {
            const response = await centreApi.getDetailsById(id);
            dispatch(slice.actions.getCentreDetails(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
