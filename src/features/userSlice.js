import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config, userConfig } from "../utils/axiosconfig";


// I replace it with localSotrage 
// export const getUSer = createAsyncThunk("user/get-user", async (thunkAPI) => {
//   try {
//     const response = await axios.get(`${base_url}user`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/api/login`, payload, config);
      return response.data;
    } catch (err) {
      // console.log(error.response);
      const response = err.response;
      if (response && response.status === 422) {
        thunkAPI.dispatch(setErrorMsg(response.data.message));
      }
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      throw err;
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/api/signup`, payload, config);
      return response.data;
    } catch (err) {
      const response = err.response;
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      throw err;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.post(`${base_url}/api/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    });

    if (response.status !== 200 && response.status !== 204) {
      // If the logout request is not successful, throw an error
      throw new Error("Logout request failed.");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  userInfo: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  errorMsg: "",
  // token: localStorage.getItem("ACCESS_TOKEN"),
  notification: "",
};
export const resetState = createAction("Reset_all");
export const restESL = createAction("Reset_Loading&Success&Error");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setTokenAction: (state, action) => {
    //   state.token = action.payload;
    // },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("action", action);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // .addCase(logout.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;
      // })
      // .addCase(logout.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      // })
      .addCase(resetState, () => initialState);
  },
});
export const { setErrorMsg } = userSlice.actions;
export default userSlice.reducer;
