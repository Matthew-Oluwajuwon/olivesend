import { AppPayload } from "@/models/application/payload";
import { Auth } from "@/models/application/state";
import { PasswordRequest, VerifyEmail } from "@/models/client/request";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Auth = {
  hasNumber: false,
  isLowerCase: false,
  isPasswordLength: false,
  isUpperCase: false,
  isSpecialChar: false,
  hasValue: false,
  passwordRequest: new PasswordRequest(),
  imageBase64: "",
  mimeType: "",
  verifyEmailRequest: new VerifyEmail(),
  token: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: <K extends keyof Auth>(
      state: Auth,
      action: PayloadAction<AppPayload<Auth, K>>
    ) => {
      const { key, value } = action.payload;

      state[key] = value;
    },
    setAllAuthState: (_state, action: PayloadAction<Auth>) => {
      return action.payload;
    },
  },
});

export const { setAllAuthState, setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
