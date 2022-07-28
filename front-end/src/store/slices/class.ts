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
import classApi from 'services/api/classApi';
// import { upperCase } from 'lodash';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['classKecho'] = {
    classKecho: [
        // {
        //     id: 2,
        //     year: 'year',
        //     name: 'name',
        //     description: 'description',
        //     level: 'level',
        //     session: 'session',
        //     type: 'type'
        // }
    ],
    classKechoMeta: {},
    classKechoDetails: {},
    error: null
};

const slice = createSlice({
    name: 'classKecho',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CENTRE LIST

        getClassList(state, action) {
            const { data, meta } = action.payload;
            if (data && meta) {
                state.classKecho = data;
                state.classKechoMeta = meta;
            }
        },

        // GET CENTRE DETAILS

        getClassDetails(state, action) {
            state.classKechoDetails = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getClassKecho(pagination: PaginationOption) {
    return async () => {
        try {
            const response = await classApi.list(pagination);
            dispatch(slice.actions.getClassList(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getClassDetailById(id: string) {
    return async () => {
        try {
            const response = await classApi.getDetailsById(id);
            dispatch(slice.actions.getClassDetails(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
