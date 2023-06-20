import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/";

export const getCustomers = createAsyncThunk(
  "customers/get-customers",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}customer/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/delete-customer",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${base_url}customer/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");
export const restESL = createAction("Reset_Loading&Success&Error");

const customerSlice = createSlice({
  name: "customers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState)
      .addCase(restESL(), (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
      });
  },
});
export default customerSlice.reducer;
