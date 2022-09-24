import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { showErrorToastAction } from '@src/Toast/toastStore';
import { getUser, uploadUserAvatar } from './userApi';
import { UserDto } from './user.dto';

export interface IUserState {
  userPending: boolean;
  errorUser: string | null;
  user: UserDto.userDetails | null;
  avatarPending: boolean;
  avatarError: string | null;
  avatar: string | null;
}

const initialState: IUserState = {
  userPending: false,
  errorUser: null,
  user: null,
  avatarPending: false,
  avatarError: null,
  avatar: null,
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
      const errorUser = e as IErrorStatus;
      const message = errorUser?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const uploadUserAvatarThunk = createAsyncThunk(
  'user/uploadAvatar',
  async (avatarUrl: Parameters<typeof uploadUserAvatar>[0], thunkApi) => {
    try {
      const data = await uploadUserAvatar(avatarUrl);
      return data.avatarURL;
    } catch (e) {
      const errorUser = e as IErrorStatus;
      const message = errorUser?.response?.data?.message;
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
      state.userPending = true;
    });
    builder.addCase(fetchUserThunk.rejected, (state, { payload }) => {
      state.userPending = false;
      state.errorUser = payload as string;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, { payload }) => {
      state.userPending = false;
      state.errorUser = null;
      state.user = payload;
    });

    builder.addCase(uploadUserAvatarThunk.pending, state => {
      state.avatarPending = true;
    });
    builder.addCase(uploadUserAvatarThunk.rejected, (state, { payload }) => {
      state.avatarPending = false;
      state.avatarError = payload as string;
    });
    builder.addCase(uploadUserAvatarThunk.fulfilled, (state, { payload }) => {
      state.avatarPending = false;
      state.avatarError = null;
      state.avatar = payload;
    });
  },
});

export default userStore.reducer;
