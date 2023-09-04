import productService from "./productService";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-product",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { products } = getState().product;
      return await productService.updateProduct(product , products.id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const showProduct = createAsyncThunk(
  "product/show-product",
  async (id, thunkAPI) => {
    try {
      return await productService.showProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  updatePage: false,
};
export const resetState = createAction("Reset_all");
export const restESL = createAction("Reset_Loading&Success&Error");

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
      updatePageState : (state , action) =>{
        state.updatePage = true
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(showProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(showProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState)
      .addCase(restESL(), (state)=> {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false; 
        state.updatePage = false;
      });
  },
});
export const { updatePageState } = productSlice.actions;
export default productSlice.reducer; 
