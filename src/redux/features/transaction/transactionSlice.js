import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { toast } from "react-toastify";

const initialState = {
  transaction: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all Payments
export const getAllTransactions = createAsyncThunk(
  "transaction/getAll",
  async (_, thunkAPI) => {
    try {
      return await transactionService.getAllTransactions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a Single Payment
export const getTransactionById = createAsyncThunk(
  "transaction/getTransactionById",
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTransactionById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transaction = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(getTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transaction = action.payload;
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.transaction.isLoading;
export const selectTransactions = (state) => state.transaction;

export default transactionSlice.reducer;
