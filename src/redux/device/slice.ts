import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDevices } from "./asyncActions";
import { Device, DeviceSliceState, Status } from "./types";

const initialState: DeviceSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Device[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = deviceSlice.actions;

export default deviceSlice.reducer;
