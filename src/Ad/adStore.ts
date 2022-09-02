import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { showErrorToastAction } from '@src/Toast/toastStore';
import { getServices } from './adApi';
import { AdDto } from './ad.dto';

export interface IAddState {
  servicesPending: boolean;
  servicesError: string | null;
  services: AdDto.ServiceDetails[] | null;
  adPending: boolean;
  adError: string | null;
  ad: AdDto.AdDetails | null;
}

const initialState: IAddState = {
  servicesPending: false,
  servicesError: null,
  services: null,
  adPending: false,
  adError: null,
  ad: null,
};

interface IErrorStatus extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const fetchServicesThunk = createAsyncThunk(
  'services/fetch',
  async (_, thunkApi) => {
    try {
      const services = await getServices();
      return services;
    } catch (e) {
      const error = e as IErrorStatus;
      const message = error?.response?.data?.message;
      //ADD SOME TRANSLATIONS LATER
      thunkApi.dispatch(showErrorToastAction({ message }));
      return thunkApi.rejectWithValue(message);
    }
  },
);

const adStore = createSlice({
  name: 'ad',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchServicesThunk.pending, state => {
      state.servicesPending = true;
    });
    builder.addCase(fetchServicesThunk.rejected, (state, { payload }) => {
      state.servicesPending = false;
      state.servicesError = payload as string;
    });
    builder.addCase(fetchServicesThunk.fulfilled, (state, { payload }) => {
      state.servicesPending = false;
      state.servicesError = null;
      state.services = payload;
    });
  },
});

export default adStore.reducer;
