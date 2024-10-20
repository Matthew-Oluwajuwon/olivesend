import { AppPayload } from "@/models/application/payload";
import { Transaction } from "@/models/application/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Transaction = {
    type: "SEND",
    page: 1,
    limit: 10
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionState: <K extends keyof Transaction>(
      state: Transaction,
      action: PayloadAction<AppPayload<Transaction, K>>
    ) => {
      const { key, value } = action.payload;

      state[key] = value;
    },
    setAllTransactionState: (_state, action: PayloadAction<Transaction>) => {
      return action.payload;
    },
  },
});

export const { setAllTransactionState, setTransactionState } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
