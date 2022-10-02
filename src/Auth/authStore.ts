import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { register, verifyRegistrationCode, login } from './authApi';
import {
  showErrorToastAction,
  showSuccessToastAction,
} from '@src/Toast/toastStore';
import { accessTokenStorage } from './authStorage';
import { t } from 'i18next';
import { store } from '@src/store';

export interface IAuthState {
  registerError: string | null;
  registerPending: boolean;
  verificationEmailSent: boolean;
  verifyRegistrationCodeError: string | null;
  verifyRegistrationCodePending: boolean;
  registered: boolean;
  loginError: string | null;
  loginPending: boolean;
  loginStatusChanged: boolean;
  logoutError: string | null;
  logoutPending: boolean;
  authTokenExpiriesIn: number | null;
  authTokenExpiredError: string | null;
  authTokenExpiredPending: boolean;
  authTokenExpired: boolean;
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
  loginStatusChanged: false,
  logoutError: null,
  logoutPending: false,
  authTokenExpiriesIn: null,
  authTokenExpiredError: null,
  authTokenExpiredPending: false,
  authTokenExpired: false,
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
      await accessTokenStorage.write(token);
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await accessTokenStorage.clearAll();
    } catch (error) {
      //ADD SOME TRANSLATIONS  LATER
      thunkApi.dispatch(
        showErrorToastAction({ message: t('common.somethingWentWrong') }),
      );
      return thunkApi.rejectWithValue('Logout error');
    }
  },
);

export const checkAuthTokenExpirationThunk = createAsyncThunk(
  'auth/checkTokenExpiration',
  async (_, thunkApi) => {
    try {
      const authTokenExpiriesIn = store.getState().auth.authTokenExpiriesIn;

      if (
        authTokenExpiriesIn !== null &&
        authTokenExpiriesIn > Math.floor(Date.now() / 1000)
      ) {
        return false;
      } else if (
        authTokenExpiriesIn !== null &&
        authTokenExpiriesIn < Math.floor(Date.now() / 1000)
      ) {
        thunkApi.dispatch(logoutThunk());
        return true;
      }
    } catch (error) {
      //ADD SOME TRANSLATIONS  LATER
      thunkApi.dispatch(
        showErrorToastAction({ message: t('common.somethingWentWrong') }),
      );
      return thunkApi.rejectWithValue('Check token expiration check error');
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
    builder.addCase(loginThunk.fulfilled, state => {
      state.loginPending = false;
      state.loginError = null;
      state.loginStatusChanged = !state.loginStatusChanged;
      state.authTokenExpiriesIn = Math.floor(Date.now() / 1000) + 1440 * 60;
    });

    builder.addCase(logoutThunk.pending, state => {
      state.logoutPending = true;
    });
    builder.addCase(logoutThunk.rejected, (state, { payload }) => {
      state.logoutPending = false;
      state.logoutError = payload as string;
    });
    builder.addCase(logoutThunk.fulfilled, state => {
      state.logoutPending = false;
      state.logoutError = null;
      state.loginStatusChanged = !state.loginStatusChanged;
      state.authTokenExpiriesIn = null;
    });

    builder.addCase(checkAuthTokenExpirationThunk.pending, state => {
      state.authTokenExpiredPending = true;
    });
    builder.addCase(
      checkAuthTokenExpirationThunk.rejected,
      (state, { payload }) => {
        state.authTokenExpiredPending = false;
        state.authTokenExpiredError = payload as string;
      },
    );
    builder.addCase(
      checkAuthTokenExpirationThunk.fulfilled,
      (state, { payload }) => {
        state.authTokenExpiredPending = false;
        state.authTokenExpiredError = null;
        state.authTokenExpired = payload;
      },
    );
  },
});

export default authStore.reducer;
