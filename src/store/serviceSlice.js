import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedService: '',
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setSelectedService } = serviceSlice.actions;

export const selectSelectedService = (state) => state.service.selectedService;

export default serviceSlice.reducer;