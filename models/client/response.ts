export class API<T> {
  responseCode: string = "";
  responseMessage: string = "";
  message: string = "";
  data: T = {} as T;
}

export class Countries {
  id: number = 0;
  name: string = "";
  countryCode: string = "";
  countryFlag: string = "";
  countryPhoneLength: number = 0;
  shortCode: string = "";
  currency: string = "";
  currencySymbol: string = "";
}

export class LoginResponse {
  token: string = "";
  refreshToken: string = "";
  isProfileCompleted: boolean = false;
  isDocumentUploaded: boolean = false;
  isPinCreated: boolean = false;
}

export class UserInfo {
  id: number = 0;
  userId: number = 0;
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  middleName: string = "";
  phoneNumber: string = "";
  address: string = "";
  country: string = "";
  pins: string = "";
  identityType: any;
  documentType: string = "";
  enabledBiometrics: boolean = false;
  declineReason: any;
  createdAt: string = "";
  updatedAt: string = "";
  tier: Tier = new Tier();
}

export class Tier {
  name: string = "";
  limit: number = 0;
  singleTransactionLimit: number = 0;
}

export class TransactingCountries {
  code: string = "";
  countryPhoneLength: number = 0;
  currencyShortName: string = "";
  currencySymbol: string = "";
  flag: string = "";
  name: string = "";
  shortName: string = "";
}

export class Transaction {
  transactions: TransactionDTOS[] = new Array<TransactionDTOS>();
  total: number = 0;
  currentPage: number = 0;
  pages: number = 0;
}

export class TransactionDTOS {
  id: number = 0;
  userId: number = 0;
  bankName: any;
  accountNumber: any;
  accountName: any;
  amount: string = "";
  channel: string = "";
  countryId: any;
  deliveryMethod: string = "";
  walletAccountName: any;
  walletAccountNumber: any;
  email: any;
  reference: string = "";
  status: string = "";
  totalAmount: string = "";
  fundSource: any;
  transferPurpose: string = "";
  walletType: any;
  settled: boolean = false;
  billID: string = "";
  beneficiaryPhoneNumber: string = "";
  billProviderId: string = "";
  operatorId: string = "";
  operatorProductId: string = "";
  fxQuotationId: any;
  beneficiaryBankBranchCode: any;
  beneficiaryId: any;
  createdAt: string = "";
  updatedAt: string = "";
  country: any;
}

export class Beneficiary {
  accountName: string = "";
  accountNumber: string = "";
  bankName: string = "";
  bankProviderCode: string = "";
  countryId: number = 0;
  createdAt: string = "";
  deliveryMethod: string = "";
  email: any;
  id: number = 0;
  updatedAt: string = "";
  userId: number = 0;
  walletAccountName: any;
  walletAccountNumber: any;
  walletType: any;
  country: Country = new Country();
}

export class Country {
  countryCode: string = "";
  countryFlag: string = "";
  countryPhoneLength: number = 0;
  currency: string = "";
  currencySymbol: string = "";
  id: number = 0;
  name: string = "";
  shortCode: string = "";
  shortName: string = "";
}

export class Bank {
  bankCode: string = "";
  bankName: string = "";
  providerCode: string = "";
}

export class Wallet {
  providerCode: string = "";
  walletName: string = "";
}

export class CorridorRate {
  feeCap: number = 0;
  feePercentage: number = 0;
  rate: number = 0;
}
