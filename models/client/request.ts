export class PasswordRequest {
  password: string = "";
}

export class VerifyEmail {
  email: string = "";
}

export class UpdateProfile {
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  phoneNumber: string = "";
  country: string = "";
  address: string = "";
  email: string = "";
}

export class Login {
  email: string = "";
  password: string = "";
  type: "PASSWORD" | "PIN" = "PASSWORD";
}

export class PinRequest {
  pin: string = "";
  confirmPin: string = "";
}

export class BeneficiaryRequest {
  accountName: string = "";
  accountNumber: string = "";
  bankName: string = "";
  bankProviderCode: string = "";
  countryShortName: string = "";
  deliveryMethod: string = "";
  walletAccountName: string = "";
  walletAccountNumber: string = "";
  walletType: string = "";
}

export class InitiateFundTransfer {
  beneficiaryId: number = 0;
  amount: number = 0;
  transferPurpose: string = "";
  fundSource: string = "";
  channel: string = "";
  totalAmount: number = 0;
  totalFees: number = 0;
}

export class InitiateAirtime {
  fundSource: string = "";
  transferPurpose: string = "";
  channel: string = "mobile";
  countryCode: string = "";
  amount: number = 0;
  billId: string = "";
  beneficiaryPhoneNumber: string = "";
  billProviderId: string = "";
  operatorId: string = "";
}
