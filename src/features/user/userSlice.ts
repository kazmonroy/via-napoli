import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getAddress } from '../../services/apiGeocoding';

interface User {
  username: string;
  status: string;
  position: { latitude: number; longitude: number } | null;
  address: string;
  error: string;
}

const initialState: User = {
  username: '',
  status: 'idle',
  position: null,
  address: '',
  error: '',
};

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        (state.status = 'idle'),
          (state.address = action.payload.address),
          (state.position = action.payload.position);
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address, please make sure to fill it out!';
      }),
});

export const getUsername = (state: RootState) => state.user.username;

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
