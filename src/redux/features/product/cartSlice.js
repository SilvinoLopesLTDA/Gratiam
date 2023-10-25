import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";

const initialState = {
  cart: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Adicionar um item ao carrinho
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, thunkAPI) => {
    try {
      const response = await productService.addToCart(id);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Obter itens do carrinho
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getCartItems();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Limpar o carrinho
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      return await productService.clearCart();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remover item do carrinho
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, thunkAPI) => {
    try {
      return await productService.removeCartItem(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remover unidade de item do carrinho
export const removeUnityItem = createAsyncThunk(
  "cart/removeUnityItem",
  async (id, thunkAPI) => {
    try {
      return await productService.removeUnityItem(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Finalizar o carrinho (checkout)
export const checkout = createAsyncThunk(
  "cart/checkout",
  async (formData, thunkAPI) => {
    try {
      return await productService.checkout(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addUnityItemSuccess: (state, action) => {
      const { itemId } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product._id === itemId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    addUnityItemFailure: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cart = action.payload;
        toast.success("Item adicionado ao carrinho com sucesso!");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Carrinho limpo com sucesso!");
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Item removido do carrinho com sucesso!");
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(removeUnityItem.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(removeUnityItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Unidade do item removida do carrinho com sucesso!");
      })
      .addCase(removeUnityItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Compra realizada com sucesso!");
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.cart.isLoading;
export const selectCartItems = (state) => state.cart.cart;

export default cartSlice.reducer;
