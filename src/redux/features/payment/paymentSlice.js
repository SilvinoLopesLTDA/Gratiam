import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "./paymentService";
import { toast } from "react-toastify";
import moment from "moment";

const initialState = {
  payments: null,
  payment: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Payment
export const createPayment = createAsyncThunk(
  "payments/create",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      return await paymentService.createPayment(formData);
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

// Get all Payments
export const getPayments = createAsyncThunk(
  "payments/getAll",
  async (_, thunkAPI) => {
    try {
      return await paymentService.getPayments();
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

// Delete a Payment
export const deletePayment = createAsyncThunk(
  "payments/delete",
  async (id, thunkAPI) => {
    try {
      return await paymentService.deletePayment(id);
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
export const getPayment = createAsyncThunk(
  "payments/getPayment",
  async (id, thunkAPI) => {
    try {
      return await paymentService.getPayment(id);
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

// Update Payment
export const updatePayment = createAsyncThunk(
  "payments/updatePayment",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await paymentService.updatePayment(id, formData);
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

export const checkExpiredPayments = createAsyncThunk(
  "payments/checkExpiredPayments",
  async (_, thunkAPI) => {
    try {
      const payments = await paymentService.getPayments();

      const expiredPayments = payments.filter((payment) => {
        const expirationDates = [];

        if (Array.isArray(payment.expirateDate)) {
          expirationDates.push(
            ...payment.expirateDate.map((date) => moment(date, "YYYY-MM-DD"))
          );
        } else if (payment.expirateDate) {
          expirationDates.push(moment(payment.expirateDate, "YYYY-MM-DD"));
        }

        const twoDaysBeforeExpiration = moment().add(2, "days");

        return expirationDates.some((expirationDate) =>
          expirationDate.isSameOrBefore(twoDaysBeforeExpiration, "day")
        );
      });

      expiredPayments.forEach((payment) => {
        const expirateDate = payment.expirateDate;
        const formattedDate = moment(expirateDate).format("DD/MM/YYYY");
        toast.warning(
          `O pagamento '${payment.name}' está prestes a expirar: '${formattedDate}'!`,
          {
            autoClose: 15000,
          }
        );
      });

      return expiredPayments;
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentInfo: (state, action) => {
      const { name, description, image, completed } = action.payload;

      const allowedExtensions = ["png", "jpg", "jpeg"];
      const fileExtension = image.name.split(".").pop();

      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("O tipo da imagem inserida é inválido, tente novamente.");
        return;
      }

      state.payments = {
        ...state.payments,
        name,
        description,
        image,
        completed,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.payment.push(action.payload);
        toast.success("Pagamento Adicionado com Sucesso!");
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(getPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.payment = action.payload;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePayment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Pagamento deletado com sucesso!");
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(getPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.payment = action.payload;
      })
      .addCase(getPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Pagamento Atualizado com sucesso!");
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(checkExpiredPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkExpiredPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.expiredPayments = action.payload;
      })
      .addCase(checkExpiredPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setPaymentInfo } = paymentSlice.actions;

export const selectIsLoading = (state) => state.payment.isLoading;
export const selectPayments = (state) => state.payment.payment;

export default paymentSlice.reducer;
