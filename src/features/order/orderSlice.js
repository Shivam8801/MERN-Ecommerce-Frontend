import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null
};

export const createOrderAsync = createAsyncThunk(
  'counter/createOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder: (state) => {
      state.currentOrder = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      });
  },
});

export const { resetOrder } = orderSlice.actions;


export const selectCurrentOrder = (state) => state.order.currentOrder;


export default orderSlice.reducer;
