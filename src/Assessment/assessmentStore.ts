import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRoles, getTypesOfEmployment } from './assessmentApi';
// import { setAlert } from 'app/components/Alert/alertStore';
// import { signOutThunk } from '../Auth/authStore';

export interface Payload {
  id: string;
  name: string;
}

export interface RoleState {
  roles: Payload[];
  rolesPending: boolean;
  rolesError: string;
}

export interface typesOfEmploymentState {
  typesOfEmployment: Payload[];
  typesOfEmploymentPending: boolean;
  typesOfEmploymentError: string;
}

const initialState: RoleState & typesOfEmploymentState = {
  roles: [],
  rolesPending: false,
  rolesError: '',
  typesOfEmployment: [],
  typesOfEmploymentPending: false,
  typesOfEmploymentError: '',
};

export const fetchRolesThunk = createAsyncThunk(
  'roles/fetch',
  async (_, thunkApi) => {
    try {
      const response = await getRoles();
      const roles = response.data.roles;
      if (roles.length === 0) {
        // thunkApi.dispatch(
        // setAlert({ message: 'Something went wrong', status: 'error' }),
        // );
        return thunkApi.rejectWithValue('Something went wrong');
      }
      return roles;
    } catch (error) {
      const message = error.response.data.message;
      // thunkApi.dispatch(setAlert({ message, status: 'error' }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const fetchTypesOfEmploymentThunk = createAsyncThunk(
  'typesofemployment/fetch',
  async (_, thunkApi) => {
    try {
      const response = await getTypesOfEmployment();
      const typesOfEmployment = response.data.typeemployments;
      if (typesOfEmployment.length === 0) {
        // thunkApi.dispatch(
        // setAlert({ message: 'Something went wrong', status: 'error' }),
        // );
        return thunkApi.rejectWithValue('Something went wrong');
      }
      return typesOfEmployment;
    } catch (error) {
      const message = error.response.data.message;
      // thunkApi.dispatch(setAlert({ message, status: 'error' }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

const assessmentStore = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRolesThunk.pending, state => {
      state.rolesPending = true;
      state.rolesError = '';
    });
    builder.addCase(fetchRolesThunk.rejected, (state, { payload }) => {
      state.rolesPending = false;
      state.rolesError = payload as string;
    });
    builder.addCase(fetchRolesThunk.fulfilled, (state, { payload }) => {
      state.rolesPending = false;
      state.rolesError = '';
      state.roles = payload;
    });
    builder.addCase(fetchTypesOfEmploymentThunk.pending, state => {
      state.typesOfEmploymentPending = true;
      state.typesOfEmploymentError = '';
    });
    builder.addCase(
      fetchTypesOfEmploymentThunk.rejected,
      (state, { payload }) => {
        state.typesOfEmploymentPending = false;
        state.typesOfEmploymentError = payload as string;
      },
    );
    builder.addCase(
      fetchTypesOfEmploymentThunk.fulfilled,
      (state, { payload }) => {
        state.typesOfEmploymentPending = false;
        state.typesOfEmploymentError = '';
        state.typesOfEmployment = payload;
      },
    );
    //   builder.addCase(signOutThunk.fulfilled, () => ({ ...initialState }));
  },
});

export default assessmentStore.reducer;
