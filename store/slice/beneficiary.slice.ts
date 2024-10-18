import { AppPayload } from "@/models/application/payload";
import { Beneficiaries } from "@/models/application/state";
import { BeneficiaryRequest } from "@/models/client/request";
import { Beneficiary } from "@/models/client/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Beneficiaries = {
    banks: [],
    wallets: [],
    disabled: false,
    deliveryMethod: "WALLET",
    request: new BeneficiaryRequest(),
    record: new Beneficiary()
};

const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState,
  reducers: {
    setBeneficiaryState: <K extends keyof Beneficiaries>(
      state: Beneficiaries,
      action: PayloadAction<AppPayload<Beneficiaries, K>>
    ) => {
      const { key, value } = action.payload;

      state[key] = value;
    },
    setAllBeneficiaryState: (_state, action: PayloadAction<Beneficiaries>) => {
      return action.payload;
    },
  },
});

export const { setAllBeneficiaryState, setBeneficiaryState } = beneficiarySlice.actions;
export const beneficiaryReducer = beneficiarySlice.reducer;
