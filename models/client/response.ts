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
