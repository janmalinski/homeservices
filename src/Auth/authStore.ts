import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { register, verifyRegistrationCode, login } from './authApi';
import {
  showErrorToastAction,
  showSuccessToastAction,
} from '@src/Toast/toastStore';
import { accessTokenStorage } from './authStorage';

export interface IAuthState {
  registerError: string | null;
  registerPending: boolean;
  verificationEmailSent: boolean;
  verifyRegistrationCodeError: string | null;
  verifyRegistrationCodePending: boolean;
  registered: boolean;
  loginError: string | null;
  loginPending: boolean;
  accessTokenPending: boolean;
  accessTokenError: string | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  registerError: null,
  registerPending: false,
  verificationEmailSent: false,
  verifyRegistrationCodeError: null,
  verifyRegistrationCodePending: false,
  registered: false,
  loginError: null,
  loginPending: false,
  accessTokenPending: false,
  accessTokenError: null,
  accessToken: null,
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (args: Parameters<typeof register>[0], thunkApi) => {
    try {
      const message = await register(args);
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showSuccessToastAction(message));
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const verifyRegistrationCodeThunk = createAsyncThunk(
  'auth/verifyRegistrationCode',
  async (code: Parameters<typeof verifyRegistrationCode>[0], thunkApi) => {
    try {
      const message = await verifyRegistrationCode(code);
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showSuccessToastAction(message));
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (args: Parameters<typeof login>[0], thunkApi) => {
    try {
      const token = await login(args);
      accessTokenStorage.write(token);
      return token;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const authorizeFromSavedTokenThunk = createAsyncThunk(
  'auth/authorizeFromSavedToken',
  (_, thunkApi) => {
    try {
      const accessToken = accessTokenStorage.read();
      return accessToken;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerThunk.pending, state => {
      state.registerPending = true;
    });
    builder.addCase(registerThunk.rejected, (state, { payload }) => {
      state.registerPending = false;
      state.registerError = payload as string;
    });
    builder.addCase(registerThunk.fulfilled, state => {
      state.registerPending = false;
      state.registerError = null;
      state.verificationEmailSent = true;
    });

    builder.addCase(verifyRegistrationCodeThunk.pending, state => {
      state.verifyRegistrationCodePending = true;
    });
    builder.addCase(
      verifyRegistrationCodeThunk.rejected,
      (state, { payload }) => {
        state.verifyRegistrationCodePending = false;
        state.verifyRegistrationCodeError = payload as string;
      },
    );
    builder.addCase(verifyRegistrationCodeThunk.fulfilled, state => {
      state.verifyRegistrationCodePending = false;
      state.verifyRegistrationCodeError = null;
      state.registered = true;
    });

    builder.addCase(loginThunk.pending, state => {
      state.loginPending = true;
    });
    builder.addCase(loginThunk.rejected, (state, { payload }) => {
      state.loginPending = false;
      state.loginError = payload as string;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.loginPending = false;
      state.loginError = null;
      state.accessToken = payload;
    });

    builder.addCase(authorizeFromSavedTokenThunk.pending, state => {
      state.accessTokenPending = true;
    });
    builder.addCase(
      authorizeFromSavedTokenThunk.rejected,
      (state, { payload }) => {
        state.accessTokenPending = false;
        state.accessTokenError = payload as string;
      },
    );
    builder.addCase(
      authorizeFromSavedTokenThunk.fulfilled,
      (state, { payload }) => {
        state.accessTokenPending = false;
        state.accessTokenError = null;
        state.accessToken = payload as string;
      },
    );
  },
});

export default authStore.reducer;
