import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { register } from './authApi';
import {
  showErrorToastAction,
  showSuccessToastAction,
} from '@src/Toast/toastStore';

export interface IAuthState {
  accessToken: string | null;
  verfifiacationEmailSent: boolean;
  error: string | null;
  pending: boolean;
}

const initialState: IAuthState = {
  accessToken: null,
  verfifiacationEmailSent: false,
  error: null,
  pending: false,
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (args: Parameters<typeof register>[0], thunkApi) => {
    try {
      const message = await register(args);
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showSuccessToastAction(message));
    } catch (error) {
      const message = error.response.data.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerThunk.pending, state => {
      state.pending = true;
    });
    builder.addCase(registerThunk.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = payload as string;
    });
    builder.addCase(registerThunk.fulfilled, state => {
      state.pending = false;
      state.error = null;
      state.verfifiacationEmailSent = true;
    });
  },
});

export default authStore.reducer;
