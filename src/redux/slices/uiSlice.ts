import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  // Placeholder UI flags (e.g., modal visibility) can be added later
  dummy: boolean;
}

const initialState: UIState = {
  dummy: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDummy(state, action) {
      state.dummy = action.payload;
    },
  },
});

export const { setDummy } = uiSlice.actions;
export default uiSlice.reducer;
