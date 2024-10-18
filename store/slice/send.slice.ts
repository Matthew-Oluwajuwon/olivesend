import { AppPayload } from "@/models/application/payload";
import { Send } from "@/models/application/state";
import { InitiateFundTransfer } from "@/models/client/request";
import { InitiatingPaymentResponse, TransactionReceipt } from "@/models/client/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Send = {
    initiateFundTransfer: new InitiateFundTransfer(),
    paymentInitiationResponse: new InitiatingPaymentResponse(),
    receipt: new TransactionReceipt()
};

const sendSlice = createSlice({
  name: "send",
  initialState,
  reducers: {
    setSendState: <K extends keyof Send>(
      state: Send,
      action: PayloadAction<AppPayload<Send, K>>
    ) => {
      const { key, value } = action.payload;

      state[key] = value;
    },
    setAllSendState: (_state, action: PayloadAction<Send>) => {
      return action.payload;
    },
  },
});

export const { setAllSendState, setSendState } = sendSlice.actions;
export const sendReducer = sendSlice.reducer;
