import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {setLoading, setData, setError} = homeSlice.actions;
export default homeSlice.reducer;
