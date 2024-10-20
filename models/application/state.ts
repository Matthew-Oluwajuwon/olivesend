import { BeneficiaryRequest, InitiateFundTransfer, PasswordRequest, PinRequest, VerifyEmail } from "../client/request";
import { Bank, Beneficiary, InitiatingPaymentResponse, LoginResponse, TransactionReceipt, Wallet } from "../client/response";

export type DocType = "NATIONAL_ID_CARD" | "INTERNATIONAL_PASSPORT" | "DRIVER_LICENSE" | undefined;
export type TabOptionType = "SEND" | "AIRTIME";

export interface Auth {
  hasNumber: boolean;
  isLowerCase: boolean;
  isPasswordLength: boolean;
  isUpperCase: boolean;
  isSpecialChar: boolean;
  hasValue: boolean;
  passwordRequest: PasswordRequest;
  verifyEmailRequest: VerifyEmail;
  imageBase64: string;
  mimeType: string;
  token: string;
  loginResponse: LoginResponse;
  loginType: "PASSWORD" | "PIN";
  documentType: DocType;
  pinRequest: PinRequest;
  showSuccessOnboarding: boolean;
  isAuthenticated: boolean;
}

export interface Beneficiaries {
  banks: Array<Bank>;
  wallets: Array<Wallet>;
  disabled: boolean;
  deliveryMethod: "WALLET" | "BANK";
  request: BeneficiaryRequest;
  record: Beneficiary;
}

export interface Send {
  initiateFundTransfer: InitiateFundTransfer;
  paymentInitiationResponse: InitiatingPaymentResponse;
  receipt: TransactionReceipt
}

export interface Transaction {
  type: "SEND" | "AIRTIME";
  page: number;
  limit: number;
}