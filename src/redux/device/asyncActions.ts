import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Device, SearchDeviceParams } from "./types";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";

export const fetchDevices = createAsyncThunk<Device[], SearchDeviceParams>(
  "device/fetchDevicesStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    console.log(params, 4444);
    const { data } = await axios.get<Device[]>(
      `https://64c696680a25021fde91ce0b.mockapi.io/items`,
      {
        params: pickBy(
          {
            page: currentPage,
            limit: 8,
            category,
            sortBy,
            order,
            search,
          },
          identity
        ),
      }
    );

    return data;
  }
);
