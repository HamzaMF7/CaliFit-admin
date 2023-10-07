import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/baseUrl";

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}/api/orders`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/update-order",
  async ({ id, statusValue }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}/api/order/${id}`,
        { status: statusValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const showOrder = createAsyncThunk(
  "order/show-order",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${base_url}/api/order/${id}`
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "order/delete-order",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${base_url}/api/order/${id}`, {
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

// export const orderNotification = createAsyncThunk(
//   "order/order-notification", 
//   (_, thunkAPI) => {
//     const { orders } = thunkAPI.getState().order;
//     console.log("orders:",orders);
//     const notificationOrder = orders.map((item) => ({
//       id: item.id,
//       date: item.date,
//       amount: item.total_price,
//     }));
//     console.log("redux notification order :",notificationOrder);
//     return notificationOrder.reverse();
//   }
// );


const initialState = {
  orders: [],
  notificationOrder: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  recentOrder: false,
};
export const resetState = createAction("Reset_all");
export const restESL = createAction("Reset_Loading&Success&Error");

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    isRecentOrders: (state) => {
      state.recentOrder = true;
    },
    isOrders: (state) => {
      state.recentOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(showOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(showOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
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

export const { isRecentOrders, isOrders } = orderSlice.actions;
export default orderSlice.reducer;
