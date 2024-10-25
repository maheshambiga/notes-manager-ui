import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials(state, action) {
      const { accessToken } = action.payload;

      return { token: accessToken };
    },
    logOut() {
      return { token: null };
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = state => state.auth.token;
