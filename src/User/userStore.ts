import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { showErrorToastAction } from '@src/Toast/toastStore';
import { getUser } from './userApi';
import { UserDto } from './user.dto';

export interface IUserState {
  pending: boolean;
  user: UserDto.userDetails | null;
  error: string | null;
}

const initialState: IUserState = {
  pending: false,
  user: null,
  error: null,
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async (_, thunkApi) => {
    try {
      const user = await getUser();
      return user;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserThunk.pending, state => {
      state.pending = true;
    });
    builder.addCase(fetchUserThunk.rejected, (state, { payload }) => {
      state.pending = false;
      state.error = payload as string;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.error = null;
      state.user = payload;
    });
  },
});

export default userStore.reducer;
