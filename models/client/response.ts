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
    token: string = ""
    refreshToken: string = ""
    isProfileCompleted: boolean = false
    isDocumentUploaded: boolean = false
    isPinCreated: boolean = false
  }
  